import { useState } from "react";
import { Link } from "react-router";
import {
  ShieldCheck,
  LockKeyhole,
  UserRound,
  Database,
  Cookie,
  Mail,
  ChevronRight,
  ArrowUpRight,
  Eye,
} from "lucide-react";

const sections = [
  {
    id: "information",
    title: "Information We Collect",
    icon: Database,
    content: [
      {
        heading: "Information you provide",
        text: "When you create an account or use Typora, you may provide information such as your name, username, email address, profile details, and the stories or comments you publish.",
      },
      {
        heading: "Content you create",
        text: "Stories, drafts, featured images, comments, and other content you submit may be processed to provide the platform's writing and publishing features.",
      },
      {
        heading: "Technical information",
        text: "Depending on the services enabled, technical information such as browser type, device information, and basic usage data may be collected to maintain and improve the platform.",
      },
    ],
  },
  {
    id: "usage",
    title: "How We Use Information",
    icon: Eye,
    content: [
      {
        heading: "Provide our services",
        text: "We use information to create and manage accounts, authenticate users, display published stories, and provide writing and publishing functionality.",
      },
      {
        heading: "Improve Typora",
        text: "Information may be used to troubleshoot problems, maintain security, understand feature performance, and improve the user experience.",
      },
      {
        heading: "Communications",
        text: "If you provide contact details, we may use them to respond to your messages or feedback. Any additional email communications should be described here once implemented.",
      },
    ],
  },
  {
    id: "sharing",
    title: "Information Sharing",
    icon: UserRound,
    content: [
      {
        heading: "Public content",
        text: "Stories and profile details you choose to publish may be visible to other users or visitors, depending on the platform's features and settings.",
      },
      {
        heading: "Service providers",
        text: "Typora may rely on third-party providers, such as Appwrite, to support authentication, databases, file storage, and hosting. Those providers process information as needed to deliver their services.",
      },
      {
        heading: "No sale of personal information",
        text: "Do not publish this statement as a verified practice until you have confirmed that your implementation and any third-party integrations match it.",
      },
    ],
  },
  {
    id: "security",
    title: "Data Security",
    icon: LockKeyhole,
    content: [
      {
        heading: "Protecting your information",
        text: "Reasonable technical and organizational safeguards should be used to protect account information and content from unauthorized access, loss, or misuse.",
      },
      {
        heading: "Your responsibility",
        text: "Use a strong, unique password and keep your login credentials private. Contact the Typora team if you believe your account has been accessed without permission.",
      },
      {
        heading: "Important limitation",
        text: "No online service can guarantee absolute security. The safeguards actually in place depend on your application's configuration and hosting environment.",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Sessions",
    icon: Cookie,
    content: [
      {
        heading: "Authentication sessions",
        text: "Typora and its authentication provider may use cookies, browser storage, or other session mechanisms to keep you signed in and maintain essential functionality, depending on the configured authentication method.",
      },
      {
        heading: "Your choices",
        text: "You can manage cookies through your browser settings. Blocking essential storage or session mechanisms may affect sign-in and other platform features.",
      },
    ],
  },
  {
    id: "rights",
    title: "Your Choices and Rights",
    icon: ShieldCheck,
    content: [
      {
        heading: "Access and correction",
        text: "You should be able to request access to or correction of personal information associated with your account, subject to applicable law and the capabilities of the service.",
      },
      {
        heading: "Deleting your information",
        text: "You can contact the Typora team to request account or data deletion. Requests may require verification and may be subject to legal or operational retention requirements. Ensure account deletion is actually supported before promising automatic deletion.",
      },
      {
        heading: "Your published content",
        text: "Before publishing a story, consider whether it contains personal or confidential information. Removing a story from public view may not automatically remove copies, backups, or information retained by other users.",
      },
    ],
  },
];

function Privacy() {
  const [activeSection, setActiveSection] = useState("information");

  const lastUpdated = "October 16, 2026";

  return (
    <>
      <main className="min-h-screen bg-background text-text-primary">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary"
            >
              Typora <span className="text-primary">/</span> Privacy
            </Link>

            <div className="flex max-w-3xl flex-col items-start">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
                <ShieldCheck size={28} strokeWidth={1.7} />
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Your privacy matters
              </p>

              <h1 className="font-serif text-3xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Privacy Policy<span className="text-primary">.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
                Your ideas are personal. This page explains how Typora may
                collect, use, and protect information when you use our platform.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-text-muted">
                <span className="rounded-full border border-border px-3 py-1.5">
                  Last updated: {lastUpdated}
                </span>
                <span className="flex items-center gap-1.5">
                  <LockKeyhole size={14} />
                  Privacy-first principles
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:gap-10 sm:px-8 sm:py-12 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 lg:px-12 lg:py-16">
          {/* Table of contents */}

          {/* Table of contents */}
          <aside className="h-fit min-w-0 lg:sticky lg:top-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
              On this page
            </p>

            <nav
              aria-label="Privacy policy sections"
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
              <h3 className="text-sm font-semibold">
                Questions about privacy?
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                Reach out if you have questions about your information.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Contact us <ArrowUpRight size={15} />
              </Link>
            </div>
          </aside>
          {/* Policy content */}
          <div className="min-w-0">
            <div className="mb-10 rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary">
                  <ShieldCheck size={21} />
                </div>
                <div>
                  <h2 className="font-semibold">A quick overview</h2>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    Typora is designed for people who want to write and share
                    ideas. The information we handle depends on which features
                    you use and how the platform's services are configured. This
                    policy should be updated to reflect the actual application
                    before it is published as a legal notice.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon;

                return (
                    <section
                    id={section.id}
                    key={section.id}
                    className="scroll-mt-6"
                    onMouseEnter={() => setActiveSection(section.id)}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-text-muted">
                          SECTION {String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="space-y-6 border-l border-border pl-5 sm:pl-6">
                      {section.content.map((item) => (
                        <div key={item.heading}>
                          <h3 className="text-base font-medium">
                            {item.heading}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Contact CTA */}
            <div className="mt-14 rounded-2xl border border-border bg-surface-secondary p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-2xl">Still have questions?</h2>
                  <p className="mt-2 text-sm leading-7 text-text-secondary">
                    We want you to understand how your information is handled.
                    Get in touch if something is unclear.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
                >
                  Contact Typora <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <p className="mt-8 text-xs leading-6 text-text-muted">
              This page is a starter template for your project, not legal
              advice. Review it against your actual data practices and
              applicable privacy laws before publishing.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Privacy;
