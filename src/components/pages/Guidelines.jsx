import { useState } from "react";
import { Link } from "react-router";
import {
  Heart,
  ShieldCheck,
  MessageCircle,
  BookOpen,
  Ban,
  Flag,
  LockKeyhole,
  Scale,
  CheckCircle2,
  ChevronRight,
  ArrowUpRight,
  HandHeart,
} from "lucide-react";

const principles = [
  {
    icon: Heart,
    title: "Be kind and respectful",
    description:
      "Treat every writer and reader with respect. Disagree with ideas thoughtfully without attacking the person behind them.",
  },
  {
    icon: BookOpen,
    title: "Give credit to creators",
    description:
      "Share your own work or work you have permission to use. Credit original creators and respect copyright and other intellectual-property rights.",
  },
  {
    icon: ShieldCheck,
    title: "Keep the community safe",
    description:
      "Do not harass, threaten, intimidate, or target people based on who they are. Everyone deserves to participate without abuse.",
  },
  {
    icon: MessageCircle,
    title: "Make conversations meaningful",
    description:
      "Offer constructive feedback, stay relevant to the discussion, and contribute ideas that help others learn or see a different perspective.",
  },
];

const rules = [
  {
    id: "harassment",
    number: "01",
    title: "Harassment and hate",
    description:
      "Do not bully, threaten, stalk, intimidate, or encourage violence against other people. Hate-based attacks and targeted abuse are not welcome.",
    icon: Ban,
  },
  {
    id: "privacy",
    number: "02",
    title: "Respect privacy",
    description:
      "Never publish another person's private or identifying information without permission. Do not share private conversations, credentials, or confidential material without authorization.",
    icon: LockKeyhole,
  },
  {
    id: "originality",
    number: "03",
    title: "Originality and attribution",
    description:
      "Do not plagiarize, falsely claim another person's work as your own, or knowingly violate intellectual-property rights. When you use others' work, obtain the necessary permissions and give appropriate credit.",
    icon: BookOpen,
  },
  {
    id: "misinformation",
    number: "04",
    title: "Honesty and authenticity",
    description:
      "Do not impersonate others, manipulate discussions through deceptive accounts, or intentionally misrepresent material facts in ways that cause harm.",
    icon: Scale,
  },
  {
    id: "spam",
    number: "05",
    title: "Spam and platform abuse",
    description:
      "Avoid repetitive promotional posts, deceptive links, scams, automated abuse, and attempts to disrupt the platform or bypass its security controls.",
    icon: Flag,
  },
  {
    id: "harmful-content",
    number: "06",
    title: "Illegal or harmful content",
    description:
      "Do not use Typora to facilitate unlawful activity, threaten harm, distribute malicious software, or encourage dangerous acts that could put people at risk.",
    icon: ShieldCheck,
  },
];

const actions = [
  {
    title: "Review",
    description:
      "Reported content or behavior may be reviewed when the platform has the tools and information needed to investigate.",
  },
  {
    title: "Take action",
    description:
      "Depending on the circumstances, action may include removing content, restricting features, or suspending an account, subject to applicable rules and law.",
  },
  {
    title: "Allow clarification",
    description:
      "Where appropriate and feasible, users may be given an opportunity to explain or appeal a moderation decision.",
  },
];

function Guidelines() {
  const [activeSection, setActiveSection] = useState("principles");

  const sections = [
    { id: "principles", title: "Our principles", icon: Heart },
    { id: "rules", title: "Community rules", icon: ShieldCheck },
    { id: "moderation", title: "When rules are broken", icon: Scale },
    { id: "reporting", title: "Report a concern", icon: Flag },
  ];

  const jumpToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <main className="min-w-0 overflow-x-clip bg-background text-text-primary">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary sm:mb-10"
            >
              Typora <span className="text-primary">/</span> Community
            </Link>

            <div className="max-w-3xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-primary sm:mb-6 sm:h-14 sm:w-14">
                <HandHeart size={27} strokeWidth={1.7} />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                A place for thoughtful ideas
              </p>

              <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Community Guidelines
                <span className="text-primary">.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:mt-6 sm:text-lg sm:leading-8">
                Typora is a space to write, learn, and share perspectives. These
                guidelines help us build a community where people feel safe
                expressing themselves and exploring new ideas.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-text-muted sm:mt-8 sm:gap-3 sm:text-sm">
                <span className="rounded-full border border-border px-3 py-1.5">
                  Respect everyone
                </span>
                <span className="rounded-full border border-border px-3 py-1.5">
                  Create thoughtfully
                </span>
                <span className="rounded-full border border-border px-3 py-1.5">
                  Share responsibly
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main layout */}
        <section className="mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16 lg:px-12 lg:py-16">
          {/* Section navigation */}
          <aside className="h-fit min-w-0 lg:sticky lg:top-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              On this page
            </p>

            <nav
              aria-label="Community guideline sections"
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1"
            >
              {sections.map((section) => {
                const Icon = section.icon;
                const active = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => jumpToSection(section.id)}
                    className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs transition-colors sm:text-sm ${
                      active
                        ? "border-primary/30 bg-primary-soft font-medium text-primary"
                        : "border-border bg-surface text-text-secondary hover:text-primary"
                    }`}
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="min-w-0 break-words">{section.title}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 hidden rounded-2xl border border-border bg-surface p-5 lg:block">
              <MessageCircle size={20} className="mb-3 text-primary" />
              <h3 className="text-sm font-semibold">Need some help?</h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Let us know if you experience a problem in the community.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Contact us <ArrowUpRight size={15} />
              </Link>
            </div>
          </aside>

          {/* Content */}
          <div className="min-w-0">
            {/* Intro card */}
            <div className="mb-10 rounded-2xl border border-border bg-surface p-5 sm:p-7">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0 text-primary">
                  <Heart size={22} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">
                    Good writing starts with respect.
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-text-secondary sm:text-base">
                    A healthy community doesn't require everyone to agree. It
                    requires people to treat one another fairly, share
                    responsibly, and make room for different perspectives.
                  </p>
                </div>
              </div>
            </div>

            {/* Principles */}
            <section
              id="principles"
              className="scroll-mt-6"
              onMouseEnter={() => setActiveSection("principles")}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                What we believe
              </p>
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
                Our principles
              </h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                The foundation of every interaction on Typora.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {principles.map((principle) => {
                  const Icon = principle.icon;

                  return (
                    <article
                      key={principle.title}
                      className="min-w-0 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/40 sm:p-6"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-semibold">{principle.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-text-secondary">
                        {principle.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Rules */}
            <section
              id="rules"
              className="mt-12 scroll-mt-6 sm:mt-16"
              onMouseEnter={() => setActiveSection("rules")}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Clear expectations
              </p>
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
                Community rules
              </h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                Please avoid the following behaviors when publishing,
                commenting, or interacting with other members.
              </p>

              <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface px-4 sm:px-6">
                {rules.map((rule) => {
                  const Icon = rule.icon;

                  return (
                    <article
                      key={rule.id}
                      className="flex min-w-0 gap-3 py-5 sm:gap-4 sm:py-6"
                    >
                      <span className="pt-1 text-xs font-medium tabular-nums text-text-muted">
                        {rule.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Icon size={17} className="shrink-0 text-primary" />
                          <h3 className="break-words text-sm font-semibold sm:text-base">
                            {rule.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-7 text-text-secondary">
                          {rule.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Moderation */}
            <section
              id="moderation"
              className="mt-12 scroll-mt-6 sm:mt-16"
              onMouseEnter={() => setActiveSection("moderation")}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Keeping Typora healthy
              </p>
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
                When rules are broken
              </h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                Reports and suspected violations may need review. Any moderation
                process should be fair, proportionate, and consistent with
                applicable law.
              </p>

              <div className="mt-6 space-y-3">
                {actions.map((action, index) => (
                  <div
                    key={action.title}
                    className="flex min-w-0 gap-4 rounded-xl border border-border p-4 sm:p-5"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-text-secondary">
                        {action.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reporting */}
            <section
              id="reporting"
              className="mt-12 scroll-mt-6 sm:mt-16"
              onMouseEnter={() => setActiveSection("reporting")}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Speak up
              </p>
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">
                Report a concern
              </h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                If you encounter harassment, suspicious activity, or content
                that may violate these guidelines, contact the Typora team.
                Include relevant details and links where possible, but avoid
                sharing additional sensitive information unnecessarily.
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-surface-secondary p-5 sm:p-7">
                <div className="flex items-start gap-3">
                  <Flag size={21} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <h3 className="font-semibold">
                      Help us make the community better
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">
                      Use our contact page to report an issue or explain a
                      concern. The contact form must be connected to a working
                      submission service for reports to reach the team.
                    </p>
                    <Link
                      to="/contact"
                      className="mt-4 inline-flex max-w-full items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
                    >
                      Contact Typora <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Closing */}
            <div className="mt-12 border-t border-border pt-8 sm:mt-16">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={21}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <div className="min-w-0">
                  <h2 className="font-serif text-xl sm:text-2xl">
                    Write freely. Treat people kindly.
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    By using Typora, you agree to follow the applicable platform
                    rules and Terms of Service.
                  </p>
                  <Link
                    to="/terms"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Read Terms of Service <ArrowUpRight size={15} />
                  </Link>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xs leading-6 text-text-muted">
              These guidelines are a starter policy for Typora. Review them
              against the features and moderation processes your application
              actually supports before publishing.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Guidelines;
