import { Link, Outlet } from "react-router";
import heroImage from "../../assets/image/getIn.jpeg";
import Button from "../ui/button/Button";
import Logo from "../ui/Logo";

function AccountGetInPage() {
  return (
    <main className="min-h-screen bg-background p-3 sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100dvh-2rem)] max-w-[1600px] grid-cols-1 overflow-hidden rounded-[28px] bg-surface shadow-xl lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-2">
        {/* LEFT SECTION — HERO IMAGE */}
        <section className="relative hidden min-h-[640px] overflow-hidden lg:block">
          {/* Background image */}
          <img
            src={heroImage}
            alt="Writing desk at sunset with a lamp, books and a Typora mug"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140d1f]/90 via-[#140d1f]/40 to-[#140d1f]/10" />

          {/* Brand */}
          <header className="absolute left-10 top-10 flex items-center gap-6">
            <span className="font-serif text-3xl tracking-tight text-white">
              Typora<span className="text-primary font-bold">.</span>
            </span>

            <span className="h-px w-16 bg-white/40" />

            <span className="text-[11px] uppercase tracking-[0.32em] text-white/80">
              A home for thoughtful ideas
            </span>
          </header>

          {/* Hero content */}
          <div className="absolute bottom-16 left-12 right-12">
            <h1 className="font-serif text-5xl leading-[1.05] text-white xl:text-6xl">
              Every thought
              <br />
              deserves a <span className="italic text-violet-300">story.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 xl:text-lg">
              Write freely. Share your perspective. Discover ideas that stay
              with you long after you’ve read them.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-violet-400 to-transparent" />

              <p className="text-[11px] uppercase tracking-[0.3em] text-violet-300">
                Write&nbsp; • &nbsp;Discover&nbsp; • &nbsp;Connect
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT SECTION — SIGN IN FORM */}
        <section className="relative flex min-h-[640px] items-center justify-center bg-surface px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
          {/* Mobile brand — hero panel is hidden on mobile */}
          <div className="absolute left-6 top-6 lg:hidden ">
            <Logo />
            {/* i want this button at the right side of the mobile brand */}
          </div>
          <span className="absolute right-6 top-6 lg:right-10 lg:top-10 ">
            <Link to="/">
              <Button
                variant="outline"
                className="px-2 py-1 text-[11px] uppercase tracking-[0.32em]"
              >
                Skip
              </Button>
            </Link>
          </span>

          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}

export default AccountGetInPage;
