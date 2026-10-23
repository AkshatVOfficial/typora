import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Bold,
  Code,
  Heading1,
  Heading2,
  ImagePlus,
  Info,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  UploadCloud,
  Undo2,
} from "lucide-react";
import postService from "../../../appwrite/post";

const TITLE_MAX = 120;
const DESCRIPTION_MAX = 300;
const MAX_IMAGE_SIZE = 40 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const WORD_PATTERN = /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu;

const countWords = (text = "") => text.match(WORD_PATTERN)?.length ?? 0;
const countCharacters = (text = "") => [...text.replace(/\n/g, "")].length;
const slugify = (value = "") =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const TOOLBAR_GROUPS = [
  [
    {
      key: "bold",
      label: "Bold",
      icon: Bold,
      run: (chain) => chain.toggleBold(),
      active: (editor) => editor.isActive("bold"),
    },
    {
      key: "italic",
      label: "Italic",
      icon: Italic,
      run: (chain) => chain.toggleItalic(),
      active: (editor) => editor.isActive("italic"),
    },
    {
      key: "strike",
      label: "Strikethrough",
      icon: Strikethrough,
      run: (chain) => chain.toggleStrike(),
      active: (editor) => editor.isActive("strike"),
    },
  ],
  [
    {
      key: "h1",
      label: "Heading 1",
      icon: Heading1,
      run: (chain) => chain.toggleHeading({ level: 1 }),
      active: (editor) => editor.isActive("heading", { level: 1 }),
    },
    {
      key: "h2",
      label: "Heading 2",
      icon: Heading2,
      run: (chain) => chain.toggleHeading({ level: 2 }),
      active: (editor) => editor.isActive("heading", { level: 2 }),
    },
    {
      key: "blockquote",
      label: "Blockquote",
      icon: Quote,
      run: (chain) => chain.toggleBlockquote(),
      active: (editor) => editor.isActive("blockquote"),
    },
    {
      key: "codeBlock",
      label: "Code block",
      icon: Code,
      run: (chain) => chain.toggleCodeBlock(),
      active: (editor) => editor.isActive("codeBlock"),
    },
  ],
  [
    {
      key: "bulletList",
      label: "Bullet list",
      icon: List,
      run: (chain) => chain.toggleBulletList(),
      active: (editor) => editor.isActive("bulletList"),
    },
    {
      key: "orderedList",
      label: "Numbered list",
      icon: ListOrdered,
      run: (chain) => chain.toggleOrderedList(),
      active: (editor) => editor.isActive("orderedList"),
    },
  ],
];
const ALL_TOOLS = TOOLBAR_GROUPS.flat();
const EDITOR_CLASS = [
  "min-h-[420px] outline-none text-base leading-8 text-text-primary sm:text-lg",
  "[&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-bold",
  "[&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-semibold",
  "[&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-secondary",
  "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-surface-secondary [&_pre]:p-4 [&_code]:font-mono [&_hr]:my-8 [&_hr]:border-border",
].join(" ");

function selectEditorState({ editor }) {
  if (!editor) return null;
  const text = editor.getText({ blockSeparator: "\n" });
  return {
    words: countWords(text),
    characters: countCharacters(text),
    isEmpty: editor.isEmpty,
    canUndo: editor.can().undo(),
    canRedo: editor.can().redo(),
    ...Object.fromEntries(
      ALL_TOOLS.map((tool) => [tool.key, tool.active(editor)]),
    ),
  };
}

function shallowEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (!a || !b) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  return (
    keysA.length === keysB.length &&
    keysA.every((key) => Object.is(a[key], b[key]))
  );
}

function ToolbarButton({
  label,
  icon: Icon,
  onClick,
  active = false,
  toggle = false,
  disabled = false,
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={toggle ? active : undefined}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-30 ${active ? "bg-primary-soft text-primary" : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"}`}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}

function Write({ post }) {
  const navigate = useNavigate();
  const imageInputRef = useRef(null);
  const imageSectionRef = useRef(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      status: post?.status ?? false,
    },
  });

  const titleField = register("title", {
    validate: (value) => value.trim() !== "" || "Please enter a title.",
    maxLength: {
      value: TITLE_MAX,
      message: `Keep the title under ${TITLE_MAX} characters.`,
    },
  });
  const descriptionField = register("description", {
    validate: (value) => value.trim() !== "" || "Please enter a description.",
    maxLength: {
      value: DESCRIPTION_MAX,
      message: `Keep the description under ${DESCRIPTION_MAX} characters.`,
    },
  });
  const status = watch("status") ?? false;
  const title = watch("title") || "";
  const description = watch("description") || "";

  const editor = useEditor({
    extensions: [StarterKit],
    content: post?.content || "",
    immediatelyRender: false,
    editorProps: {
      attributes: { class: EDITOR_CLASS, "aria-label": "Story body" },
    },
  });

  useEffect(() => {
    if (editor && post) editor.commands.setContent(post.content || "");
  }, [editor, post?.$id]);

  const editorState = useEditorState({
    editor,
    selector: selectEditorState,
    equalityFn: shallowEqual,
  });
  const {
    words = 0,
    characters = 0,
    isEmpty = true,
    canUndo = false,
    canRedo = false,
  } = editorState ?? {};

  useEffect(() => {
    return () => {
      if (featuredImage?.previewUrl)
        URL.revokeObjectURL(featuredImage.previewUrl);
    };
  }, [featuredImage]);

  function scrollToImageError(message) {
    setImageError(message);
    requestAnimationFrame(() => {
      imageSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      // Focus the visible upload control, not the hidden file input.
      imageSectionRef.current
        ?.querySelector("button[data-image-upload]")
        ?.focus({ preventScroll: true });
    });
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    // Clear the native input so the same file can be selected again.
    event.target.value = "";
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      scrollToImageError("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      scrollToImageError("Image size must not exceed 40 MB.");
      return;
    }

    setImageError("");
    setFeaturedImage({ file, previewUrl: URL.createObjectURL(file) });
  }

  function handleRemoveImage() {
    setFeaturedImage(null);
    setImageError("");
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  async function submit(data) {
    setSubmitError("");
    setImageError("");
    if (!editor) return;

    // Validate image here so an invalid hidden file input never prevents this scroll.
    if (!featuredImage?.file && !post?.featuredImage) {
      scrollToImageError("Choose a featured image.");
      return;
    }

    let uploadedFile = null;
    try {
      if (featuredImage?.file)
        uploadedFile = await postService.uploadFile(featuredImage.file);

      const postData = {
        title: data.title.trim(),
        slug: slugify(data.title),
        description: data.description.trim(),
        content: editor.getHTML(),
        status: Boolean(data.status),
        featuredImage: uploadedFile?.$id || post?.featuredImage || "",
      };

      const savedPost = post?.$id
        ? await postService.updatePost(post.$id, postData)
        : await postService.createPost(postData);

      // A cleanup failure should not turn a successful save into a failed save.
      if (
        post?.featuredImage &&
        uploadedFile?.$id &&
        post.featuredImage !== uploadedFile.$id
      ) {
        try {
          await postService.deleteFile(post.featuredImage);
        } catch (cleanupError) {
          console.error("Old image cleanup failed:", cleanupError);
        }
      }

      navigate(`/post/${savedPost.$id}`);
    } catch (error) {
      // Remove a newly uploaded file if the post itself could not be saved.
      if (uploadedFile?.$id) {
        try {
          await postService.deleteFile(uploadedFile.$id);
        } catch (cleanupError) {
          console.error("Uploaded image cleanup failed:", cleanupError);
        }
      }
      console.error("Post submission failed:", error);
      setSubmitError("Could not save your story. Please try again.");
    }
  }

  function handleInvalidSubmit(formErrors) {
    // React Hook Form focuses the first invalid registered field automatically.
    // Explicitly set focus as a fallback for browsers/custom styling.
    if (formErrors.title) setFocus("title");
    else if (formErrors.description) setFocus("description");
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-md text-sm text-text-secondary transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft size={18} aria-hidden="true" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="text-center">
            <p className="font-serif text-xl">
              Typora<span className="font-bold text-primary">.</span>
            </p>
            <p className="text-xs text-text-muted">Your writing space</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Info size={15} aria-hidden="true" />
            <span className="hidden sm:inline">
              {post?.$id ? "Editing" : "Not saved yet"}
            </span>
          </div>
        </div>
      </header>

      <form
        onSubmit={handleSubmit(submit, handleInvalidSubmit)}
        noValidate
        className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-16"
      >
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {post?.$id ? "Edit story" : "New story"}
          </p>
          <input
            {...titleField}
            ref={(element) => {
              titleField.ref(element);
              titleInputRef.current = element;
            }}
            id="story-title"
            type="text"
            maxLength={TITLE_MAX}
            placeholder="Give your story a title..."
            aria-label="Story title"
            aria-invalid={Boolean(errors.title)}
            aria-describedby="story-title-error"
            className="w-full border-0 bg-transparent font-serif text-3xl font-medium leading-tight tracking-tight text-text-primary outline-none placeholder:text-text-muted sm:text-5xl"
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-xs">
            <p id="story-title-error" className="min-h-4 text-error">
              {errors.title?.message}
            </p>
            <p className="text-text-muted">
              {title.length}/{TITLE_MAX}
            </p>
          </div>
          <textarea
            {...descriptionField}
            ref={(element) => {
              descriptionField.ref(element);
              descriptionInputRef.current = element;
            }}
            rows={2}
            maxLength={DESCRIPTION_MAX}
            placeholder="Write a short description for your story..."
            aria-label="Story description"
            aria-invalid={Boolean(errors.description)}
            aria-describedby="story-description-error"
            className="mt-3 w-full resize-none border-0 bg-transparent text-base leading-7 text-text-secondary outline-none placeholder:text-text-muted"
          />
          <div className="mt-1 flex items-center justify-between gap-3 text-xs">
            <p id="story-description-error" className="min-h-4 text-error">
              {errors.description?.message}
            </p>
            <p className="text-text-muted">
              {description.length}/{DESCRIPTION_MAX}
            </p>
          </div>
        </div>

        <section
          ref={imageSectionRef}
          className="mb-8 space-y-3"
          aria-labelledby="featured-image-heading"
        >
          <div>
            <h2
              id="featured-image-heading"
              className="text-sm font-semibold text-text-primary"
            >
              Featured image
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              Choose an image to introduce your story.
            </p>
          </div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            aria-label="Upload featured image"
            aria-invalid={Boolean(imageError)}
            aria-describedby="featured-image-error"
            className="hidden"
          />
          <p
            id="featured-image-error"
            role={imageError ? "alert" : undefined}
            className="min-h-4 text-xs text-error"
          >
            {imageError}
          </p>

          {featuredImage ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="relative">
                <img
                  src={featuredImage.previewUrl}
                  alt="New featured image preview"
                  className="h-56 w-full object-cover sm:h-80"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm">
                  New image
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-text-primary">
                    {featuredImage.file.name}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {(featuredImage.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    data-image-upload
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-medium text-text-primary hover:bg-surface-secondary"
                  >
                    <ImagePlus size={16} />
                    Choose another
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface-secondary"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            </div>
          ) : post?.featuredImage ? (
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div className="relative">
                <img
                  src={postService.previewFile(post.featuredImage)}
                  alt={`Featured image for ${post.title || "your story"}`}
                  className="h-56 w-full object-cover sm:h-80"
                />
                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold text-text-primary shadow-sm">
                  Current image
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    Featured image
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    This image will be kept unless you replace it.
                  </p>
                </div>
                <button
                  data-image-upload
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-text-primary transition hover:border-primary/50 hover:bg-primary-soft hover:text-primary"
                >
                  <ImagePlus size={16} />
                  Replace image
                </button>
              </div>
            </div>
          ) : (
            <button
              data-image-upload
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className={`group flex min-h-52 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed ${imageError ? "border-error" : "border-border"} bg-surface px-5 py-8 text-center transition hover:border-primary/60 hover:bg-primary-soft/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary transition group-hover:scale-105">
                <UploadCloud size={27} />
              </span>
              <span className="text-sm font-semibold text-text-primary">
                Upload a featured image
              </span>
              <span className="mt-2 text-xs text-text-muted">
                JPG, PNG or WebP · Maximum 40 MB
              </span>
            </button>
          )}
        </section>

        <div
          role="toolbar"
          aria-label="Formatting"
          className="sticky top-[73px] z-10 mb-8 flex flex-wrap items-center gap-1 rounded-xl border border-border bg-surface p-2"
        >
          {TOOLBAR_GROUPS.map((group, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-1">
              {groupIndex > 0 && (
                <div className="mx-1 hidden h-6 w-px bg-border sm:block" />
              )}
              {group.map((tool) => (
                <ToolbarButton
                  key={tool.key}
                  label={tool.label}
                  icon={tool.icon}
                  toggle
                  active={Boolean(editorState?.[tool.key])}
                  disabled={!editor}
                  onClick={() =>
                    editor && tool.run(editor.chain().focus()).run()
                  }
                />
              ))}
            </div>
          ))}
          <div className="mx-1 hidden h-6 w-px bg-border sm:block" />
          <ToolbarButton
            label="Undo"
            icon={Undo2}
            disabled={!editor || !canUndo}
            onClick={() => editor?.chain().focus().undo().run()}
          />
          <ToolbarButton
            label="Redo"
            icon={Redo2}
            disabled={!editor || !canRedo}
            onClick={() => editor?.chain().focus().redo().run()}
          />
        </div>

        <section
          aria-label="Story editor"
          className="relative min-h-[480px] rounded-2xl border border-border bg-surface p-6 transition focus-within:border-primary sm:p-10"
        >
          {editor && isEmpty && (
            <p
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-5 text-base text-text-muted sm:left-8 sm:top-8 sm:text-lg"
            >
              Start writing your story here...
            </p>
          )}
          {editor && <EditorContent editor={editor} />}
        </section>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-sm text-text-muted">
          <p>
            {words} {words === 1 ? "word" : "words"}
          </p>
          <p>
            {characters} {characters === 1 ? "character" : "characters"}
          </p>
        </div>

        <div className="mt-10 w-full">
          <section className="w-full rounded-2xl border border-border bg-surface p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-base font-semibold text-text-primary">
                Ready to share your story?
              </h2>
              <p className="mt-1 text-sm leading-6 text-text-secondary">
                Choose whether to keep your story private or make it available
                to everyone.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                aria-pressed={!status}
                onClick={() => setValue("status", false, { shouldDirty: true })}
                className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${!status ? "border-primary bg-primary-soft/60 ring-1 ring-primary/20" : "border-border bg-background hover:border-primary/40"}`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-text-primary">
                    Save as draft
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${!status ? "border-primary bg-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-surface" : "border-text-muted"}`}
                  />
                </span>
                <span className="mt-2 block text-sm leading-6 text-text-secondary">
                  Keep working on your story privately.
                </span>
              </button>
              <button
                type="button"
                aria-pressed={status}
                onClick={() => setValue("status", true, { shouldDirty: true })}
                className={`rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${status ? "border-primary bg-primary-soft/60 ring-1 ring-primary/20" : "border-border bg-background hover:border-primary/40"}`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-text-primary">
                    Publish post
                  </span>
                  <span
                    className={`h-4 w-4 rounded-full border-2 ${status ? "border-primary bg-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-surface" : "border-text-muted"}`}
                  />
                </span>
                <span className="mt-2 block text-sm leading-6 text-text-secondary">
                  Make your story visible to readers.
                </span>
              </button>
            </div>
            {submitError && (
              <p
                role="alert"
                className="mt-4 rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
              >
                {submitError}
              </p>
            )}
            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl px-5 py-3 text-sm font-semibold text-text-secondary transition hover:bg-surface-secondary hover:text-text-primary"
              >
                Cancel
              </button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowPreview((visible) => !visible)}
                  className="rounded-xl border border-border px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-surface-secondary"
                >
                  {showPreview ? "Hide preview" : "Preview data"}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !editor}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving your story..."
                    : post?.$id
                      ? status
                        ? "Save & publish"
                        : "Save draft"
                      : status
                        ? "Publish story"
                        : "Save draft"}
                </button>
              </div>
            </div>
          </section>
        </div>

        {showPreview && (
          <pre className="mt-6 w-full overflow-x-auto rounded-xl border border-border bg-surface-secondary p-4 text-xs leading-5 text-text-secondary">
            {JSON.stringify(
              {
                title: title.trim(),
                description: description.trim(),
                body: editor?.getHTML() ?? "",
                status,
                featuredImage:
                  featuredImage?.file?.name ?? post?.featuredImage ?? null,
              },
              null,
              2,
            )}
          </pre>
        )}
      </form>
    </main>
  );
}

export default Write;
