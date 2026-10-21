import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  BookOpen,
  Sparkles,
} from "lucide-react";
import DOMPurify from "dompurify";

import postService from "../../appwrite/post";

function PostDetails() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userID = await postService.getCurrentUserID();
        setCurrentUserID(userID);
      } catch {
        setCurrentUserID(null);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    let active = true;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await postService.getPost(postId);

        if (active) {
          setPost(response);
        }
      } catch (err) {
        console.error("Error fetching post:", err);

        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (postId) {
      fetchPost();
    }

    return () => {
      active = false;
    };
  }, [postId]);

  const editPost = () => {
    navigate(`/post/${postId}/edit`, {
      state: {
        post: {
          $id: post.$id,
          title: post.title,
          slug: post.slug,
          description: post.description,
          content: post.content,
          featuredImage: post.featuredImage,
          status: post.status,
          userID: post.userID,
        },
      },
    });
  };

  const deletePost = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setActionError("");

      await postService.deletePost(postId);

      if (post.featuredImage) {
        try {
          await postService.deleteFile(post.featuredImage);
        } catch (fileError) {
          console.error("Post deleted, but image cleanup failed:", fileError);
        }
      }

      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
      setActionError(
        "We couldn't delete this story. Please check your permissions and try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="mb-10 h-4 w-28 rounded bg-surface-secondary" />
          <div className="mb-5 h-4 w-32 rounded bg-surface-secondary" />
          <div className="mb-4 h-12 max-w-2xl rounded-lg bg-surface-secondary sm:h-16" />
          <div className="mb-3 h-4 max-w-xl rounded bg-surface-secondary" />
          <div className="mt-10 aspect-[16/9] rounded-3xl bg-surface-secondary" />
          <div className="mt-10 space-y-4">
            <div className="h-4 rounded bg-surface-secondary" />
            <div className="h-4 w-11/12 rounded bg-surface-secondary" />
            <div className="h-4 w-9/12 rounded bg-surface-secondary" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-6 text-center">
        <div className="max-w-md">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <BookOpen size={26} />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Story not found</h1>

          <p className="mt-3 leading-7 text-text-secondary">
            This story may have been removed, or you may not have permission to
            view it.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-white transition hover:bg-primary-hover"
          >
            <ArrowLeft size={17} />
            Back to home
          </button>
        </div>
      </main>
    );
  }

  const isOwner = currentUserID === post.userID;

  const safeContent = DOMPurify.sanitize(post.content || "");

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Top navigation */}
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8 lg:px-12">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-primary"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-xl font-bold tracking-tight"
          >
            Typora<span className="text-primary">.</span>
          </button>

          <div className="w-14 sm:w-20" />
        </div>
      </header>

      {/* Article */}
      <article className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-8 sm:pt-16 lg:px-12">
        {/* Article heading */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              <Sparkles size={13} />
              Typora Journal
            </span>

            {post.status === false && (
              <span className="rounded-full border border-warning/30 bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning">
                Draft
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-text-secondary sm:text-xl sm:leading-9">
              {post.description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-border">
            {isOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={editPost}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm font-medium transition hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  onClick={deletePost}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 rounded-xl border border-error/20 px-3.5 py-2.5 text-sm font-medium text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={15} />
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>

          {actionError && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-error"
            >
              {actionError}
            </p>
          )}
        </div>

        {/* Featured image */}
        {post.featuredImage && (
          <figure className="mt-9 overflow-hidden rounded-2xl border border-border/50 bg-surface-secondary shadow-sm sm:mt-12 sm:rounded-3xl">
            <img
              src={postService.previewFile(post.featuredImage)}
              alt={post.title}
              className="max-h-[600px] w-full object-cover"
            />
          </figure>
        )}

        {/* Article body */}
        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <div
            className="break-words text-base leading-8 text-text-secondary sm:text-lg sm:leading-9 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-text-primary [&_h1]:mb-5 [&_h1]:mt-10 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:leading-tight [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_hr]:my-8 [&_hr]:border-border [&_img]:my-8 [&_img]:rounded-2xl [&_li]:my-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-6 [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-surface-secondary [&_pre]:p-5 [&_pre]:text-sm [&_strong]:font-semibold [&_strong]:text-text-primary [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />
        </div>

        {/* Article footer */}
        <footer className="mx-auto mt-14 max-w-3xl border-t border-border pt-8 sm:mt-20">
          <div className="flex flex-col justify-between gap-5 rounded-2xl bg-surface-secondary/70 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                Keep exploring
              </p>
              <h2 className="mt-2 text-xl font-bold">
                More ideas are waiting.
              </h2>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Head back to Typora and discover your next read.
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover"
            >
              Explore stories
              <ArrowLeft className="rotate-180" size={16} />
            </button>
          </div>
        </footer>
      </article>
    </main>
  );
}

export default PostDetails;
