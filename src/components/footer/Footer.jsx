import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import {
  ArrowUpRight,
  BookOpen,
  Feather,
  //   Github,
  Heart,
  Mail,
} from "lucide-react";

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Posts", to: "/posts" },
      { label: "About Typora", to: "/about" },
    ],
  },
  {
    title: "Create",
    links: [
      { label: "Write a story", to: "/add-post", requiresAuth: true },
      { label: "My posts", to: "/posts", requiresAuth: true },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Help & FAQ", to: "/help" },
      { label: "Feedback", to: "/feedback" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of service", to: "/terms" },
      { label: "Community guidelines", to: "/guidelines" },
    ],
  },
];

function Footer() {
  const authStatus = useSelector((state) => state.auth.status);

  const currentYear = new Date().getFullYear();

  const linkClass = ({ isActive }) =>
    `inline-flex w-fit items-center gap-1 text-sm transition-colors duration-200 ${
      isActive ? "text-primary" : "text-text-secondary hover:text-primary"
    }`;

  return (
    <footer className="border-t border-border bg-background text-text-primary">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12">
        {/* Brand and introduction */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <NavLink
              to="/"
              aria-label="Typora home"
              className="inline-flex items-center font-serif text-3xl tracking-tight"
            >
              Typora
              <span className="font-bold text-primary">.</span>
            </NavLink>

            <p className="mt-4 text-sm leading-7 text-text-secondary">
              A little space for a lot of ideas. Discover thoughtful stories,
              explore new perspectives, and share what matters to you.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {authStatus ? (
                <NavLink
                  to="/add-post"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Feather size={16} />
                  Write a story
                </NavLink>
              ) : (
                <NavLink
                  to="/getin/signup"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Join Typora
                  <ArrowUpRight size={16} />
                </NavLink>
              )}

              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text-secondary transition hover:border-primary hover:text-primary"
              >
                Our story
              </NavLink>
            </div>
          </div>

          {/* Navigation groups */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4 sm:gap-x-8">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-4 text-sm font-semibold text-text-primary">
                  {group.title}
                </h2>

                <ul className="space-y-3">
                  {group.links
                    .filter((link) => !link.requiresAuth || authStatus)
                    .map((link) => (
                      <li key={link.to}>
                        <NavLink to={link.to} className={linkClass}>
                          {link.label}
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-5 border-t border-border pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 text-xs text-text-muted sm:flex-row sm:items-center sm:gap-3">
            <span>© {currentYear} Typora.</span>
            <span className="hidden sm:inline">·</span>
            <span>Made for the curious.</span>
          </div>

          <div className="flex items-center gap-4">
            <NavLink
              to="/posts"
              aria-label="Explore stories"
              title="Explore stories"
              className="text-text-muted transition hover:text-primary"
            >
              <BookOpen size={18} />
            </NavLink>

            <a
              href="mailto:contact@typora.example"
              aria-label="Email Typora"
              title="Email Typora"
              className="text-text-muted transition hover:text-primary"
            >
              <Mail size={18} />
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="text-text-muted transition hover:text-primary"
            >
              {/* <Github size={18} /> */}
            </a>

            <span
              className="flex items-center gap-1 text-xs text-text-muted"
              title="Made with care"
            >
              <Heart size={13} className="text-primary" />
              Made with care
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
