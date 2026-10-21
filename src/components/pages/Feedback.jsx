import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  MessageSquareText,
  Bug,
  Heart,
  Sparkles,
  Send,
  CheckCircle2,
} from "lucide-react";

import Button from "../ui/button/Button";

const feedbackTypes = [
  {
    label: "Suggestion",
    description: "Share an idea",
    icon: Lightbulb,
  },
  {
    label: "Bug report",
    description: "Report a problem",
    icon: Bug,
  },
  {
    label: "General feedback",
    description: "Tell us anything",
    icon: MessageSquareText,
  },
];

const ratings = [
  { value: 1, label: "Poor", emoji: "😕" },
  { value: 2, label: "Fair", emoji: "🙁" },
  { value: 3, label: "Okay", emoji: "😐" },
  { value: 4, label: "Good", emoji: "🙂" },
  { value: 5, label: "Great", emoji: "🤩" },
];

function Feedback() {
  const [feedbackType, setFeedbackType] = useState("General feedback");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!message.trim()) {
      nextErrors.message = "Please tell us a little about your experience.";
    } else if (message.trim().length < 10) {
      nextErrors.message = "Please enter at least 10 characters.";
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const feedbackData = {
      type: feedbackType,
      rating: rating || null,
      message: message.trim(),
      email: email.trim() || null,
      createdAt: new Date().toISOString(),
    };

    // Frontend demonstration only. Connect a backend before launch.
    console.log("Feedback submission:", feedbackData);

    setSubmitted(true);
    setErrors({});
    setFeedbackType("General feedback");
    setRating(0);
    setMessage("");
    setEmail("");
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15";

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
              to="/help"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-primary"
            >
              <ArrowLeft size={16} />
              Help center
            </Link>
          </div>
        </header>

        {/* Intro */}
        <section className="border-b border-border bg-surface-secondary/40">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface text-primary">
              <Heart size={23} />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Your voice matters
            </p>

            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              Help us make
              <br />
              <span className="italic text-primary">Typora better.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              Every suggestion, honest opinion, and reported issue helps us
              improve the experience for everyone who reads and writes here.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
          {submitted && (
            <div
              role="status"
              className="mb-8 flex items-start gap-3 rounded-xl border border-success/30 bg-success/10 p-4"
            >
              <CheckCircle2
                size={21}
                className="mt-0.5 shrink-0 text-success"
              />
              <div>
                <h2 className="text-sm font-semibold">Thanks for sharing!</h2>
                <p className="mt-1 text-sm leading-6 text-text-secondary">
                  Your feedback passed validation, but it has not been saved or
                  sent yet. A feedback service needs to be connected.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Category */}
            <fieldset>
              <legend className="text-base font-semibold">
                What would you like to share?
              </legend>

              <p className="mt-2 text-sm text-text-secondary">
                Choose the category that best describes your feedback.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  const selected = feedbackType === type.label;

                  return (
                    <button
                      key={type.label}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setFeedbackType(type.label)}
                      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        selected
                          ? "border-primary bg-primary-soft/50"
                          : "border-border bg-surface hover:border-primary/50"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={
                          selected ? "text-primary" : "text-text-muted"
                        }
                      />

                      <span>
                        <span className="block text-sm font-medium">
                          {type.label}
                        </span>
                        <span className="mt-1 block text-xs text-text-muted">
                          {type.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Rating */}
            <fieldset className="mt-10">
              <legend className="text-base font-semibold">
                How is your Typora experience?
              </legend>

              <p className="mt-2 text-sm text-text-secondary">
                This is optional — choose the rating that feels right.
              </p>

              <div className="mt-5 flex flex-wrap gap-2 sm:gap-4">
                {ratings.map((item) => {
                  const selected = rating === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      aria-pressed={selected}
                      aria-label={`${item.value} out of 5: ${item.label}`}
                      onClick={() => setRating(item.value)}
                      className={`flex min-w-14 flex-1 flex-col items-center gap-2 rounded-xl border px-2 py-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        selected
                          ? "border-primary bg-primary-soft/50 text-primary"
                          : "border-border bg-surface text-text-secondary hover:border-primary/50"
                      }`}
                    >
                      <span className="text-2xl" aria-hidden="true">
                        {item.emoji}
                      </span>
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Message */}
            <div className="mt-10">
              <label
                htmlFor="feedback-message"
                className="block text-base font-semibold"
              >
                Tell us more <span className="text-error">*</span>
              </label>

              <p className="mt-2 text-sm text-text-secondary">
                What worked well? What could be improved? We are listening.
              </p>

              <textarea
                id="feedback-message"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    message: "",
                  }));
                  setSubmitted(false);
                }}
                rows={6}
                maxLength={3000}
                placeholder="Share your thoughts, ideas, or the problem you encountered..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message
                    ? "feedback-message-error"
                    : "feedback-message-count"
                }
                className={`${inputClass} mt-4 resize-y`}
              />

              <div className="mt-2 flex items-start justify-between gap-3">
                {errors.message ? (
                  <p
                    id="feedback-message-error"
                    role="alert"
                    className="text-sm text-error"
                  >
                    {errors.message}
                  </p>
                ) : (
                  <p className="text-xs text-text-muted">
                    At least 10 characters.
                  </p>
                )}

                <p
                  id="feedback-message-count"
                  className="shrink-0 text-xs text-text-muted"
                >
                  {message.length}/3000
                </p>
              </div>
            </div>

            {/* Optional email */}
            <div className="mt-7">
              <label
                htmlFor="feedback-email"
                className="block text-sm font-semibold"
              >
                Email address{" "}
                <span className="font-normal text-text-muted">(optional)</span>
              </label>

              <p className="mt-2 text-sm text-text-secondary">
                Include your email if you'd like us to follow up.
              </p>

              <input
                id="feedback-email"
                type="email"
                autoComplete="email"
                value={email}
                maxLength={254}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    email: "",
                  }));
                  setSubmitted(false);
                }}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "feedback-email-error" : undefined
                }
                className={`${inputClass} mt-4`}
              />

              {errors.email && (
                <p
                  id="feedback-email-error"
                  role="alert"
                  className="mt-2 text-sm text-error"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-8 border-t border-border pt-6">
              <Button type="submit" className="w-full gap-2 sm:w-auto">
                Send feedback
                <Send size={16} />
              </Button>

              <p className="mt-4 text-xs leading-5 text-text-muted">
                Please do not include passwords, authentication tokens, or other
                sensitive information.
              </p>
            </div>
          </form>
        </section>

        {/* Contact CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24 lg:px-12">
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-secondary/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-3">
              <Sparkles size={21} className="mt-1 shrink-0 text-primary" />
              <div>
                <h2 className="font-serif text-xl">
                  Need help with something specific?
                </h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Visit our Help Center or contact us about your issue.
                </p>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
            >
              Contact us
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Feedback;
