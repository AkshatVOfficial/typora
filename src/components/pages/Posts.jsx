import { Link } from "react-router";
import {
  BookOpen,
  Feather,
  ArrowRight,
  Sparkles,
  PenLine,
  Search,
  LibraryBig,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import postService from "../../appwrite/post";
import PostCard from "../../components/ui/postcard/PostCard";

function Posts() {
  const [activeTab, setActiveTab] = useState("published");
  const authStatus = useSelector((state) => state.auth.status);
  const { userData } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      // Wait until we have a user ID
      if (!userData?.$id) {
        setPosts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const response = await postService.getUserPosts(userData.$id);
        setPosts(response.rows);

        if (response) {
          setPosts(response.rows.toReversed());
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData?.$id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-8 sm:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
              Explore Typora
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Stories for the curious.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Discover fresh perspectives, thoughtful ideas, and stories worth
              your time.
            </p>
          </header>
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-[3/2] w-full animate-pulse rounded-2xl border border-border bg-surface-secondary"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        <main className="min-h-[70vh] min-w-0 overflow-x-clip bg-background text-text-primary">
          <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col px-4 sm:px-8 lg:px-12">
            {/* Page header */}
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-5 sm:py-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <LibraryBig size={17} className="text-primary" />
                  <span>Explore Typora</span>
                </div>
                <p className="mt-1 text-xs text-text-muted">
                  Stories, ideas, and perspectives
                </p>
              </div>

              {authStatus && (
                <Link
                  to="/add-post"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
                >
                  <PenLine size={15} />
                  Write a story
                </Link>
              )}
            </header>

            {/* Empty posts state */}
            <section className="flex flex-1 items-center justify-center py-14 sm:py-20">
              <div className="w-full max-w-xl text-center">
                {/* Illustration */}
                <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center sm:mb-10 sm:h-32 sm:w-32">
                  <div className="absolute inset-0 rotate-6 rounded-[2rem] border border-border bg-surface-secondary" />

                  <div className="absolute inset-2 -rotate-3 rounded-[1.7rem] border border-border bg-surface" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-sm sm:h-[4.5rem] sm:w-[4.5rem]">
                    <BookOpen size={34} strokeWidth={1.4} />
                  </div>

                  <div className="absolute -right-1 top-2 flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-primary shadow-sm">
                    <Sparkles size={15} />
                  </div>

                  <div className="absolute -bottom-1 -left-2 flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary shadow-sm">
                    <Search size={15} />
                  </div>
                </div>

                {/* Label */}
                <div className="mb-5 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-primary/50" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
                    Your reading journey
                  </span>
                  <span className="h-px w-8 bg-primary/50" />
                </div>

                <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
                  A quiet library,
                  <br />
                  <span className="text-primary">for now.</span>
                </h1>

                <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-text-secondary sm:mt-6 sm:text-base sm:leading-8">
                  No stories have made their way here yet. Check back soon, or
                  be the one who gives this little library its first page.
                </p>

                {/* Status */}
                <div className="mx-auto mt-7 inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-text-muted sm:mt-8 sm:text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>Nothing published just yet</span>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                  {authStatus ? (
                    <Link
                      to="/add-post"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
                    >
                      <Feather size={17} />
                      Publish the first story
                      <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link
                      to="/getin/signup"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
                    >
                      <Feather size={17} />
                      Join the community
                      <ArrowRight size={16} />
                    </Link>
                  )}

                  <Link
                    to="/about"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
                  >
                    About Typora
                  </Link>
                </div>

                {/* Bottom note */}
                <div className="mt-12 border-t border-border pt-6 sm:mt-16 sm:pt-8">
                  <p className="text-xs leading-6 text-text-muted sm:text-sm">
                    Every library starts with a single page.
                    <span className="mx-2 text-primary">✳</span>
                    Every writer starts somewhere.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  }

  const visiblePosts = posts.filter((post) =>
    activeTab === "published" ? post.status === true : post.status === false,
  );

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Journal heading */}
        <header className="mb-8 sm:mb-10">
          {/* Post status tabs */}
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div
              className="inline-flex rounded-xl border border-border bg-surface p-1"
              role="group"
              aria-label="Filter posts by status"
            >
              <button
                type="button"
                onClick={() => setActiveTab("published")}
                aria-pressed={activeTab === "published"}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === "published"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                }`}
              >
                Published
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("drafts")}
                aria-pressed={activeTab === "drafts"}
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === "drafts"
                    ? "bg-primary text-white shadow-sm"
                    : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                }`}
              >
                Drafts
              </button>
            </div>
 
            <p className="text-sm text-text-muted">
              {activeTab === "published"
                ? "Stories ready for readers"
                : "Your unpublished stories"}
            </p>
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
            Explore Typora
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Stories for the curious.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Discover fresh perspectives, thoughtful ideas, and stories worth
            your time.
          </p>
        </header>

        {/* Post cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {visiblePosts.map((post) => (
            <div key={post.$id} className="min-w-0">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Posts;
