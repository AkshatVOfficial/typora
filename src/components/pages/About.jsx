import { Link } from "react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Feather,
  Heart,
  Lightbulb,
  PenLine,
  Sparkles,
  Users,
} from "lucide-react";

import Button from "../ui/button/Button";
import Logo from "../ui/Logo";
import { useSelector } from "react-redux";

const features = [
  {
    number: "01",
    icon: Feather,
    title: "Write with freedom.",
    description:
      "Turn your thoughts, experiences, and ideas into stories worth sharing. Your words deserve a place of their own.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Discover new perspectives.",
    description:
      "Explore ideas beyond your own world, learn something unexpected, and find inspiration in the stories of others.",
  },
  {
    number: "03",
    icon: Users,
    title: "Share what matters.",
    description:
      "Give your ideas a voice, connect through meaningful stories, and be part of a community that values curiosity.",
  },
];

const principles = [
  {
    icon: Sparkles,
    title: "Simplicity",
    description: "Less clutter. More room for ideas.",
  },
  {
    icon: Heart,
    title: "Authenticity",
    description: "Real thoughts deserve real voices.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity",
    description: "There is always something new to learn.",
  },
];

function About() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-text-primary">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:px-12 lg:pt-28">
        <div className="absolute right-0 top-12 -z-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80" />

        <div className="relative z-10 max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-primary" />A little about
            Typora
          </div>

          <h1 className="max-w-4xl font-serif text-4xl font-medium leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
            A home for ideas
            <br />
            worth <span className="italic text-primary">sharing.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg sm:leading-9">
            The world is full of stories waiting to be told. Typora is a space
            for curious minds to write freely, discover new perspectives, and
            turn everyday thoughts into something meaningful.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {authStatus && (
              <Button
                onClick={() => (window.location.href = "/")}
                className="gap-2"
              >
                Explore stories
                <ArrowRight size={17} />
              </Button>
            )}

            {!authStatus && (
              <Button
                onClick={() => (window.location.href = "/getin/signup")}
                className="gap-2"
              >
                Start your story
                <ArrowRight size={17} />
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={() => {
                document
                  .getElementById("our-story")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get to know us
              <ArrowDown size={16} />
            </Button>
          </div>

          <div className="mt-16 flex items-center gap-3 border-t border-border pt-6 sm:mt-24">
            <span className="font-serif text-2xl italic text-primary">T.</span>
            <p className="text-sm text-text-muted">
              Made for the curious. Built around ideas.
            </p>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section
        id="our-story"
        className="border-y border-border bg-surface-secondary/50"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our story
            </p>

            <h2 className="mt-5 max-w-md font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
              Good ideas deserve more than a passing thought.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-text-secondary sm:text-lg sm:leading-9">
            <p>
              Some ideas arrive in the middle of the night. Others grow from a
              conversation, a book, or an experience that changes how we see the
              world.
            </p>

            <p>
              We believe these ideas are worth holding on to. Typora is built
              around a simple thought: writing and reading should feel natural,
              welcoming, and rewarding.
            </p>

            <p>
              Whether you are sharing something you have learned, exploring a
              subject you love, or putting your thoughts into words for the
              first time, there should be a place for you here.
            </p>

            <p className="font-serif text-xl italic text-text-primary sm:text-2xl">
              Because every meaningful story starts somewhere.
            </p>
          </div>
        </div>
      </section>

      {/* What Typora stands for */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            The Typora experience
          </p>

          <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
            A little less noise.
            <br />A little more meaning.
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-text-secondary sm:text-lg sm:leading-8">
            We want to make space for the things that matter: thoughtful
            writing, interesting discoveries, and ideas that bring people
            together.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group rounded-2xl border border-border bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-background">
                    <Icon size={22} strokeWidth={1.7} />
                  </div>

                  <span className="font-mono text-sm text-text-muted">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-8 font-serif text-2xl tracking-tight">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
                  {feature.description}
                </p>

                <div className="mt-7 h-px w-full bg-border transition-colors group-hover:bg-primary/40" />
              </article>
            );
          })}
        </div>
      </section>

      {/* Our principles */}
      <section className="bg-surface-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What we believe
            </p>

            <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
              Built on the things that matter.
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-text-secondary sm:text-lg sm:leading-8">
              Great writing does not need to be complicated. It needs a clear
              voice, an open mind, and the freedom to explore.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <div
                  key={principle.title}
                  className="flex items-start gap-5 py-6 sm:py-7"
                >
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-primary">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h3 className="font-medium text-text-primary">
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-text-secondary sm:text-base">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-7 sm:p-12 lg:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-sm text-primary">
              <PenLine size={16} />
              Your story starts here
            </span>

            <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
              Have something on your mind?
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-text-secondary sm:text-lg sm:leading-8">
              An idea, a lesson, a story, or a perspective worth sharing. Give
              it a home. You never know who might need to hear it.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {authStatus && (
                <Button onClick={() => (window.location.href = "/")}>
                  Continue exploring
                  <ArrowRight size={17} />
                </Button>
              )}

              {!authStatus && (
                <Button onClick={() => (window.location.href = "/getin/signup")}>
                  Join Typora
                  <ArrowRight size={17} />
                </Button>
              )}

              {!authStatus && (
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/getin/signin")}
                >
                  Welcome back
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <Link to="/" aria-label="Typora home" className="w-fit">
            <Logo />
          </Link>

          <p className="text-sm text-text-muted">
            A little space for a lot of ideas.
          </p>

          <Link
            to="/"
            className="flex w-fit items-center gap-2 text-sm text-text-secondary transition-colors hover:text-primary"
          >
            Back to home
            <ArrowRight size={15} />
          </Link>
        </div>
      </footer>
    </main>
  );
}

export default About;
