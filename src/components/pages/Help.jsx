import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  ChevronDown,
  BookOpen,
  UserRound,
  PenLine,
  ShieldCheck,
  CircleHelp,
  MessageCircle,
  ArrowRight,
  X,
} from "lucide-react";

const categories = [
  { name: "All questions", icon: CircleHelp },
  { name: "Getting started", icon: BookOpen },
  { name: "Your account", icon: UserRound },
  { name: "Writing & posts", icon: PenLine },
  { name: "Privacy & safety", icon: ShieldCheck },
];

const faqs = [
  {
    id: 1,
    category: "Getting started",
    question: "What is Typora?",
    answer:
      "Typora is a blogging platform designed for sharing ideas, discovering stories, and expressing yourself through writing. It aims to provide a clean and comfortable space for readers and writers.",
  },
  {
    id: 2,
    category: "Getting started",
    question: "Do I need an account to read posts?",
    answer:
      "That depends on how you configure your public posts and routes. Typora can allow visitors to read posts without signing in, while reserving posting and account features for registered users.",
  },
  {
    id: 3,
    category: "Getting started",
    question: "How do I create an account?",
    answer:
      "Open the Sign up page, enter the requested information, and submit the form. Follow any verification steps your account setup requires.",
  },
  {
    id: 4,
    category: "Your account",
    question: "How do I sign in?",
    answer:
      "Open the Sign in page and enter your registered credentials. If you are already signed in, you should be able to continue using your account without creating another session.",
  },
  {
    id: 5,
    category: "Your account",
    question: "What if I forget my password?",
    answer:
      "Use the password recovery option if it is available in your sign-in flow. If password recovery has not yet been implemented, contact the Typora administrator for assistance.",
  },
  {
    id: 6,
    category: "Your account",
    question: "How do I sign out?",
    answer:
      "Use the sign-out option in your account or profile menu. A proper sign-out should end your active authentication session and update the application's authentication state.",
  },
  {
    id: 7,
    category: "Writing & posts",
    question: "How do I write a post?",
    answer:
      "Open the writing page and enter your title, description, and article content. Use the editor toolbar to format your text. Saving drafts and publishing require the corresponding features to be connected in Typora.",
  },
  {
    id: 8,
    category: "Writing & posts",
    question: "Can I add a featured image?",
    answer:
      "The writing interface supports selecting a featured image and previewing it before upload. Permanent storage requires the image to be uploaded to the configured storage service.",
  },
  {
    id: 9,
    category: "Writing & posts",
    question: "What is the difference between a draft and a published post?",
    answer:
      "A draft is intended to remain private to its author. A published post is intended to be available to readers. The application must enforce these visibility rules through its backend and database permissions, not just a frontend toggle.",
  },
  {
    id: 10,
    category: "Writing & posts",
    question: "Can I edit a post after publishing?",
    answer:
      "Post editing depends on the features available in your account. A complete implementation should let authors update their own posts and control whether the updated content remains published or returns to draft status.",
  },
  {
    id: 11,
    category: "Privacy & safety",
    question: "Who can see my drafts?",
    answer:
      "Drafts should be accessible only to their author and authorized administrators. This requires appropriate server-side access controls and Appwrite permissions.",
  },
  {
    id: 12,
    category: "Privacy & safety",
    question: "How does Typora protect my account?",
    answer:
      "Account security depends on the authentication configuration, secure session handling, database permissions, and how personal information is stored. Review the Privacy Policy for the actual practices implemented by Typora.",
  },
  {
    id: 13,
    category: "Privacy & safety",
    question: "How can I report a problem?",
    answer:
      "Visit the Contact page and describe the issue. Avoid including passwords, authentication tokens, or other sensitive information in your message.",
  },
];

function Help() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All questions");
  const [openFaq, setOpenFaq] = useState(1);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All questions" || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  function handleCategoryChange(category) {
    setActiveCategory(category);
    setOpenFaq(null);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    setOpenFaq(null);
  }

  return (
    <>
      <main className="min-h-screen bg-background text-text-primary">
        {/* Header */}
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <Link
              to="/"
              aria-label="Typora home"
              className="font-serif text-2xl tracking-tight"
            >
              Typora<span className="font-bold text-primary">.</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-primary"
            >
              Contact support
              <ArrowRight size={16} />
            </Link>
          </div>
        </header>

        {/* Hero */}
        <section className="border-b border-border bg-surface-secondary/40">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-24">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
              <CircleHelp size={24} strokeWidth={1.7} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Typora help center
            </p>

            <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">
              How can we help?
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              Find answers to common questions about your account, writing
              stories, and using Typora.
            </p>

            <div className="relative mx-auto mt-9 max-w-2xl">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search questions, topics, or keywords..."
                aria-label="Search frequently asked questions"
                className="w-full rounded-xl border border-border bg-surface py-4 pl-12 pr-12 text-sm text-text-primary shadow-sm outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-text-muted hover:bg-surface-secondary hover:text-text-primary"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* FAQ content */}
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[240px_1fr] lg:gap-16 lg:px-12 lg:py-20">
          {/* Categories */}
          <aside>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
              Browse by topic
            </h2>

            <nav
              aria-label="FAQ categories"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => handleCategoryChange(category.name)}
                    aria-pressed={isActive}
                    className={`inline-flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                      isActive
                        ? "bg-primary-soft font-medium text-primary"
                        : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
                    }`}
                  >
                    <Icon size={17} />
                    {category.name}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Questions */}
          <div>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl">
                  {activeCategory}
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  {filteredFaqs.length}{" "}
                  {filteredFaqs.length === 1 ? "question" : "questions"} found
                </p>
              </div>
            </div>

            {filteredFaqs.length > 0 ? (
              <div className="divide-y divide-border border-y border-border">
                {filteredFaqs.map((faq) => {
                  const isOpen = openFaq === faq.id;
                  const panelId = `faq-answer-${faq.id}`;

                  return (
                    <article key={faq.id}>
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                          className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                        >
                          <span className="font-medium leading-7 text-text-primary transition hover:text-primary sm:text-base">
                            {faq.question}
                          </span>

                          <ChevronDown
                            size={19}
                            className={`shrink-0 text-text-muted transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>
                      </h3>

                      {isOpen && (
                        <div
                          id={panelId}
                          className="max-w-3xl pb-6 pr-6 text-sm leading-7 text-text-secondary sm:text-base"
                        >
                          {faq.answer}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-12">
                <Search size={28} className="mx-auto text-text-muted" />

                <h3 className="mt-4 font-serif text-xl">No answers found</h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Try a different search term or browse another category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All questions");
                    setOpenFaq(1);
                  }}
                  className="mt-5 text-sm font-medium text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-secondary/50 p-7 sm:p-10 lg:p-12">
            <div className="relative z-10 flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-sm font-medium text-primary">
                  <MessageCircle size={17} />
                  Still need help?
                </div>

                <h2 className="mt-4 font-serif text-2xl tracking-tight sm:text-3xl">
                  We're here to listen.
                </h2>

                <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                  If you couldn't find the answer you were looking for, send us
                  a message and explain what you need help with.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Contact us
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Help;
