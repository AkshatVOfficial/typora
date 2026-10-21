import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MessageCircle,
  Send,
  Clock,
} from "lucide-react";

import Button from "../ui/button/Button";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Your message must contain at least 10 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Frontend validation only. Connect an email service or backend
    // before treating this message as delivered.
    console.log("Contact form data:", {
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "General inquiry",
      message: "",
    });
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
              className="font-serif text-2xl tracking-tight"
              aria-label="Typora home"
            >
              Typora<span className="font-bold text-primary">.</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-primary"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </header>

        {/* Main content */}
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Introduction */}
            <section>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-text-secondary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                We'd love to hear from you
              </div>

              <h1 className="mt-7 max-w-lg font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
                Let's start a
                <br />
                <span className="italic text-primary">conversation.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-8 text-text-secondary sm:text-lg">
                Have a question, an idea, or feedback about Typora? Send us a
                message. We're always interested in hearing what you have to
                say.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Mail size={20} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">Email us</h2>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      For questions, suggestions, or general inquiries.
                    </p>
                    <p className="mt-2 text-sm text-primary">
                      Use the contact form
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MessageCircle size={20} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">Share feedback</h2>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      Tell us what works, what doesn't, and what you'd like to
                      see next.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Clock size={20} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">Response time</h2>
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                      We'll aim to respond as soon as we can once a contact
                      service is connected.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact form */}
            <section className="rounded-2xl border border-border bg-surface p-5 sm:p-8 lg:p-10">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Contact form
                </p>

                <h2 className="mt-3 font-serif text-3xl tracking-tight">
                  Send us a message.
                </h2>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  Fill in the details below and tell us how we can help.
                </p>
              </div>

              {submitted && (
                <div
                  role="status"
                  className="mb-6 rounded-xl border border-success/30 bg-success/10 p-4 text-sm text-text-primary"
                >
                  Your message passed validation, but it hasn't been sent yet.
                  Connect a backend or email service to deliver it.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Your name <span className="text-error">*</span>
                  </label>

                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    maxLength={100}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={inputClass}
                  />

                  {errors.name && (
                    <p id="name-error" className="mt-2 text-sm text-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email address <span className="text-error">*</span>
                  </label>

                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    maxLength={254}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                  />

                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-error">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-medium"
                  >
                    What is this about?
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option>General inquiry</option>
                    <option>Technical issue</option>
                    <option>Feedback or suggestion</option>
                    <option>Account problem</option>
                    <option>Privacy concern</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Your message <span className="text-error">*</span>
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    maxLength={5000}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`${inputClass} resize-y`}
                  />

                  <div className="mt-2 flex items-start justify-between gap-3">
                    {errors.message ? (
                      <p id="message-error" className="text-sm text-error">
                        {errors.message}
                      </p>
                    ) : (
                      <p className="text-xs text-text-muted">
                        Please provide at least 10 characters.
                      </p>
                    )}

                    <p className="shrink-0 text-xs text-text-muted">
                      {formData.message.length}/5000
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2">
                  Send message
                  <Send size={16} />
                </Button>

                <p className="text-center text-xs leading-5 text-text-muted">
                  Please don't include passwords or other sensitive information
                  in your message.
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
