import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../ui/Logo";
import Button from "../ui/button/Button";
import Logout from "./Logout";
import { useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";

const navItems = [
  { label: "Home", path: "/", end: true },
  { label: "Posts", path: "/posts" },
  { label: "Add Post", path: "/add-post" },
  { label: "About", path: "/about" },
];

const desktopLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-primary-soft text-primary"
      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-md px-3 py-3 text-base transition-colors ${
    isActive
      ? "bg-primary-soft text-primary"
      : "text-text-secondary hover:bg-surface-secondary hover:text-text-primary"
  }`;

function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);
  const authStatus = useSelector((state) => state.auth.status);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("typora-theme") || "system",
  );

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const isDark = theme === "dark" || (theme === "system" && media.matches);

      root.classList.toggle("dark", isDark);
      root.style.colorScheme = isDark ? "dark" : "light";
    };

    applyTheme();

    if (theme === "system") {
      media.addEventListener("change", applyTheme);
    }

    return () => {
      media.removeEventListener("change", applyTheme);
    };
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    localStorage.setItem("typora-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" onClick={closeMenu} className="flex shrink-0 items-center">
          {/* <Logo width="40" height="40" /> */}
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={desktopLinkClass}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:bg-surface-secondary hover:text-primary"
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          {!authStatus && (
            <NavLink to="/getin/signin">
              <Button className="px-4 py-2">Sign in</Button>
            </NavLink>
          )}
          {authStatus && <Logout />}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-surface-secondary md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`border-t border-border bg-background md:hidden ${open ? "block" : "hidden"}`}
      >
        <ul className="mx-auto max-w-6xl space-y-1 px-4 py-3 sm:px-6">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                end={item.end}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-base text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}

              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </li>
          <div className="mt-2">
            {!authStatus && (
              <NavLink to="/getin/signin">
                <Button className="mt-3 px-4 py-2 w-full">Sign in</Button>
              </NavLink>
            )}
            {authStatus && <Logout className={"w-full"} />}
          </div>
        </ul>
      </div>
    </header>
  );
}

export default Header;
