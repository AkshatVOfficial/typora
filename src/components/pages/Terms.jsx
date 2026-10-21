import { useState } from "react";
import { Link } from "react-router";
import {
  Scale,
  FileText,
  UserCheck,
  BookOpen,
  ShieldCheck,
  Copyright,
  AlertTriangle,
  Ban,
  RefreshCw,
  Mail,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: UserCheck,
    paragraphs: [
      "By accessing or using Typora, you agree to these Terms of Service. If you do not agree, please do not use the platform.",
      "If you use Typora on behalf of an organization, you confirm that you have permission to accept these terms on its behalf.",
    ],
  },
  {
    id: "accounts",
    title: "Your Account",
    icon: ShieldCheck,
    paragraphs: [
      "You are responsible for providing accurate account information, keeping your login credentials secure, and activity carried out through your account.",
      "Do not impersonate another person, create accounts through unauthorized means, or attempt to access another user's account. Contact the Typora team if you suspect unauthorized access.",
    ],
  },
  {
    id: "content",
    title: "Your Content",
    icon: BookOpen,
    paragraphs: [
      "You retain ownership of the original stories, drafts, images, and other material you create, subject to any rights held by others in the material.",
      "By submitting content to Typora, you grant the platform permission to host, store, reproduce, and display that content as reasonably necessary to operate the features you use, such as saving drafts and displaying published stories.",
      "You are responsible for ensuring that you have the rights and permissions needed to publish your content. Do not post material that unlawfully infringes another person's rights.",
    ],
  },
  {
    id: "conduct",
    title: "Acceptable Use",
    icon: Ban,
    paragraphs: [
      "Use Typora lawfully and respectfully. Do not use the platform to harass, threaten, defraud, or harm others.",
      "You must not attempt to disrupt the service, bypass security controls, introduce malicious code, scrape restricted information, or interfere with other users' access.",
      "Do not publish unlawful content, private information without permission, or content that violates applicable laws. These examples are not an exhaustive list.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    icon: Copyright,
    paragraphs: [
      "Typora's name, branding, interface, and original platform materials may be protected by intellectual-property laws. You may not use them in a way that suggests endorsement or violates applicable rights.",
      "Respect the copyrights and other rights of creators. If you believe content on Typora infringes your rights, contact us with enough information for us to review your concern.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    icon: AlertTriangle,
    paragraphs: [
      "Typora is provided on an 'as available' basis to the extent permitted by applicable law. We cannot guarantee that the service will always be available, uninterrupted, error-free, or free of security vulnerabilities.",
      "User-generated stories and opinions belong to their respective authors and do not necessarily represent the views of Typora.",
      "Nothing in these terms excludes or limits rights or protections that cannot lawfully be excluded or limited.",
    ],
  },
  {
    id: "termination",
    title: "Suspension and Termination",
    icon: RefreshCw,
    paragraphs: [
      "Access may be restricted or suspended where reasonably necessary to protect users, investigate suspected abuse, maintain platform security, or comply with legal obligations.",
      "You may stop using Typora at any time. Account closure and deletion of associated content depend on the account-management features available and any applicable retention requirements.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    icon: FileText,
    paragraphs: [
      "These terms may be revised as Typora develops. When changes are made, the updated version should be published on this page with a revised effective date.",
      "If a change requires notice or consent under applicable law, we will follow the relevant requirements. Your options if you disagree with a change may depend on the law and the services you use.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: Mail,
    paragraphs: [
      "If you have questions about these terms, need to report a concern, or believe content violates someone's rights, contact the Typora team through the Contact page.",
    ],
  },
];

function Terms() {
  const [activeSection, setActiveSection] = useState("acceptance");
  const lastUpdated = "October 16, 2026";

  return (
    <>
      <main className="min-h-screen min-w-0 overflow-x-clip bg-background text-text-primary">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary sm:mb-10"
            >
              Typora <span className="text-primary">/</span> Terms
            </Link>

            <div className="flex max-w-3xl flex-col items-start">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-primary sm:mb-6 sm:h-14 sm:w-14">
                <Scale size={26} strokeWidth={1.7} />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                A few things to know
              </p>

              <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Terms of Service
                <span className="text-primary">.</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:mt-6 sm:text-lg sm:leading-8">
                These terms explain the basic rules for using Typora, sharing
                your writing, and being part of our community.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-text-muted sm:mt-8 sm:gap-3 sm:text-sm">
                <span className="rounded-full border border-border px-3 py-1.5">
                  Last updated: {lastUpdated}
                </span>
                <span className="flex items-center gap-1.5">
                  <FileText size={14} />
                  Please read carefully
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto grid w-full max-w-6xl min-w-0 grid-cols-1 gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 lg:px-12 lg:py-16">
          {/* Responsive table of contents */}
          <aside className="h-fit min-w-0 lg:sticky lg:top-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              On this page
            </p>

            <nav
              aria-label="Terms of Service sections"
              className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1"
            >
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                    className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs transition-colors sm:text-sm ${
                      isActive
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
              <Mail size={20} className="mb-3 text-primary" />
              <h3 className="text-sm font-semibold">Need clarification?</h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Get in touch if you have questions about these terms.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Contact us <ArrowUpRight size={15} />
              </Link>
            </div>
          </aside>

          {/* Terms content */}
          <div className="min-w-0">
            <div className="mb-8 rounded-2xl border border-border bg-surface p-4 sm:mb-10 sm:p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <div className="min-w-0">
                  <h2 className="font-semibold">The short version</h2>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    Be respectful, protect your account, publish content you
                    have the right to share, and use Typora lawfully. The
                    detailed terms below explain these expectations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-10 sm:space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <section
                    id={section.id}
                    key={section.id}
                    className="min-w-0 scroll-mt-6"
                    onMouseEnter={() => setActiveSection(section.id)}
                  >
                    <div className="mb-4 flex items-center gap-3 sm:mb-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary sm:h-10 sm:w-10">
                        <Icon size={19} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium tracking-[0.15em] text-text-muted sm:text-xs">
                          SECTION {String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-1 break-words text-lg font-semibold tracking-tight sm:text-2xl">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-4 border-l border-border pl-4 sm:space-y-5 sm:pl-6">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={paragraphIndex}
                          className="break-words text-sm leading-7 text-text-secondary sm:text-base sm:leading-8"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Contact CTA */}
            <div className="mt-10 rounded-2xl border border-border bg-surface-secondary p-5 sm:mt-14 sm:p-8">
              <h2 className="font-serif text-xl sm:text-2xl">
                Questions about these terms?
              </h2>
              <p className="mt-2 text-sm leading-7 text-text-secondary">
                If something isn't clear, reach out to the Typora team.
              </p>

              <Link
                to="/contact"
                className="mt-5 inline-flex max-w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-background transition-colors hover:bg-primary-hover sm:px-5"
              >
                Contact Typora <ChevronRight size={16} />
              </Link>
            </div>

            <p className="mt-6 break-words text-xs leading-6 text-text-muted sm:mt-8">
              This is a starter template, not legal advice. Review it against
              Typora's actual features and applicable laws before publishing.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Terms;
