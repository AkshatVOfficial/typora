import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Feather, BookOpen, ArrowRight, Sparkles, PenLine } from "lucide-react";
import { useSelector } from "react-redux";
import postService from "../../appwrite/post";

import PostCard from "../../components/ui/postcard/PostCard";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getPosts();

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
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-8 sm:mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
              The Typora Journal
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              Ideas worth exploring.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
              Thoughts, stories, and perspectives for the curious mind.
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
      <main className="min-h-[70vh] overflow-x-clip bg-background text-text-primary">
        <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col px-4 sm:px-8 lg:px-12">
          {/* Small editorial header */}
          <div className="flex items-center justify-between border-b border-border py-5 sm:py-6">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <BookOpen size={16} className="text-primary" />
              <span>Discover stories</span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />A space
              for ideas
            </span>
          </div>

          {/* Empty state */}
          <section className="flex flex-1 items-center justify-center py-14 sm:py-20">
            <div className="w-full max-w-xl text-center">
              {/* Decorative icon composition */}
              <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center sm:mb-10 sm:h-32 sm:w-32">
                <div className="absolute inset-0 rotate-6 rounded-[2rem] border border-border bg-surface-secondary" />

                <div className="absolute inset-2 -rotate-3 rounded-[1.7rem] border border-border bg-surface" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary shadow-sm sm:h-[4.5rem] sm:w-[4.5rem]">
                  <Feather size={34} strokeWidth={1.4} className="-rotate-12" />
                </div>

                <div className="absolute -right-1 top-2 flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface text-primary shadow-sm">
                  <Sparkles size={15} />
                </div>

                <div className="absolute -bottom-1 -left-2 h-3 w-3 rounded-full bg-primary/50" />
              </div>

              {/* Editorial label */}
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-primary/50" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
                  The beginning of something
                </span>
                <span className="h-px w-8 bg-primary/50" />
              </div>

              <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Every great story
                <br />
                starts with <span className="text-primary">one idea.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-text-secondary sm:mt-6 sm:text-base sm:leading-8">
                It's a little quiet around here. No stories have been published
                just yet, but there's plenty of room for something wonderful.
              </p>

              {/* Empty state indicator */}
              <div className="mx-auto mt-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-text-muted sm:mt-8 sm:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-30" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Waiting for the first story
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                {authStatus ? (
                  <Link
                    to="/add-post"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
                  >
                    <PenLine size={17} />
                    Write the first story
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link
                    to="/getin/signup"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
                  >
                    <Feather size={17} />
                    Start your story
                    <ArrowRight size={16} />
                  </Link>
                )}

                <Link
                  to="/about"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-surface-secondary"
                >
                  Discover Typora
                </Link>
              </div>

              {/* Bottom note */}
              <div className="mt-12 border-t border-border pt-6 sm:mt-16 sm:pt-8">
                <p className="text-xs leading-6 text-text-muted sm:text-sm">
                  Good ideas deserve a place to live.
                  <span className="mx-2 text-primary">✳</span>
                  Yours could be the first.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  // const postcards = [
  //   {
  //     id: 1,
  //     title: "Exploring Hidden Gems in the Himalayas",
  //     description:
  //       "Discover beautiful mountain landscapes, hidden villages, and unforgettable adventures.",
  //     image:
  //       "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  //     date: "Oct 21, 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Building Better Web Experiences",
  //     description:
  //       "Learn how thoughtful design and React can help you build better user interfaces.",
  //     image:
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  //     date: "Oct 18, 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Building Better Web Experiences",
  //     description:
  //       "Learn how thoughtful design and React can help you build better user interfaces.",
  //     image:
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  //     date: "Oct 18, 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Building Better Web Experiences",
  //     description:
  //       "Learn how thoughtful design and React can help you build better user interfaces.",
  //     image:
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  //     date: "Oct 18, 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Building Better Web Experiences",
  //     description:
  //       "Learn how thoughtful design and React can help you build better user interfaces.",
  //     image:
  //       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  //     date: "Oct 18, 2026",
  //   },
  // ];

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Journal heading */}
        <header className="mb-8 sm:mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
            The Typora Journal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Ideas worth exploring.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            Thoughts, stories, and perspectives for the curious mind.
          </p>
        </header>

        {/* Post cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {posts.map((post) => (
            <div key={post.$id} className="min-w-0">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
