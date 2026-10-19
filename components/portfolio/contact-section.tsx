"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, ArrowRight, Mail, MapPin } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export function ContactSection({ email }: { email?: string | null }) {
  const address = email || "fahamijemal1@gmail.com";
  const [feedback, setFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });
  async function submit(data: ContactFormData) {
    setFeedback(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        setFeedback({
          success: false,
          message:
            body.error ||
            "Your message could not be sent. Please try again or use the email link.",
        });
        return;
      }
      reset();
      setFeedback({
        success: true,
        message: "Thanks for reaching out. Your message has been sent.",
      });
    } catch {
      setFeedback({
        success: false,
        message:
          "Could not connect. Your message is still here — please try again or email me directly.",
      });
    }
  }
  return (
    <section
      id="contact"
      className="folio-section folio-contact"
      aria-labelledby="contact-title"
    >
      <div className="folio-container contact-grid">
        <div>
          <p className="folio-label">LET’S MAKE SOMETHING USEFUL</p>
          <h2 id="contact-title">
            A good idea
            <br />
            starts a <span>conversation.</span>
          </h2>
          <p className="contact-intro">
            I welcome software engineering opportunities, backend and AI product
            work, and thoughtful collaborations. Tell me what you’re building
            and where I can help.
          </p>
          <a className="contact-email" href={`mailto:${address}`}>
            <Mail size={18} aria-hidden="true" />
            {address}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="folio-text-link contact-cv" href="/api/resume">
            Download my CV <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className="contact-location">
            <MapPin size={16} aria-hidden="true" /> Adama, Ethiopia · Working
            with ideas beyond borders.
          </p>
        </div>
        <form
          className="folio-contact-form"
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <div className="form-pair">
            {(["name", "email"] as const).map((key) => (
              <div className="folio-field" key={key}>
                <label htmlFor={`contact-${key}`}>
                  {key === "name" ? "Your name" : "Email address"}
                </label>
                <input
                  id={`contact-${key}`}
                  type={key === "email" ? "email" : "text"}
                  autoComplete={key}
                  placeholder={key === "name" ? "Full name" : "you@example.com"}
                  {...register(key)}
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key] ? `${key}-error` : undefined}
                />
                {errors[key] && (
                  <p className="field-error" id={`${key}-error`}>
                    {errors[key]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="folio-field">
            <label htmlFor="contact-subject">
              What’s on your mind? <span>(optional)</span>
            </label>
            <input
              id="contact-subject"
              placeholder="A product, a project, a possibility…"
              {...register("subject")}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <p className="field-error" id="subject-error">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div className="folio-field">
            <label htmlFor="contact-message">Your message</label>
            <textarea
              id="contact-message"
              rows={4}
              placeholder="Tell me a little about it."
              {...register("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p className="field-error" id="message-error">
                {errors.message.message}
              </p>
            )}
          </div>
          {feedback && (
            <p
              className={`form-feedback ${feedback.success ? "success" : "error"}`}
              role={feedback.success ? "status" : "alert"}
            >
              {feedback.message}
            </p>
          )}
          <button
            className="folio-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending…" : "Send message"}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
          <p className="form-note">
            Your name, email, and message are saved to my portfolio inbox so I
            can reply.
          </p>
        </form>
      </div>
    </section>
  );
}
