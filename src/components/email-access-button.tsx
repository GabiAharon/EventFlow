"use client";

import { useState } from "react";
import { Mail, X } from "lucide-react";

import { type Locale } from "@/lib/site-content";

export function EmailAccessButton({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const copy =
    locale === "en"
      ? {
          trigger: "Email access",
          title: "Connect with email",
          subtitle: "Use email for a direct sign-in link and event updates.",
          placeholder: "name@example.com",
          action: "Send link",
          success: "A sign-in link will be sent here once auth is connected.",
          close: "Close",
        }
      : {
          trigger: "כניסה עם מייל",
          title: "חיבור עם מייל",
          subtitle: "הזינו מייל כדי לקבל קישור כניסה ישיר ועדכונים על האירועים.",
          placeholder: "name@example.com",
          action: "שלח קישור",
          success: "כאן יישלח קישור כניסה ברגע שנחבר auth אמיתי.",
          close: "סגירה",
        };

  return (
    <>
      <button
        className="email-access-trigger"
        data-tour-id="email-access"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Mail className="h-4 w-4" />
        {copy.trigger}
      </button>

      {open ? (
        <div className="modal-backdrop" onClick={() => setOpen(false)} role="presentation">
          <div
            className="email-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={copy.title}
          >
            <div className="email-modal-head">
              <div>
                <div className="app-kicker">{copy.trigger}</div>
                <h2 className="section-title-compact">{copy.title}</h2>
              </div>
              <button className="icon-close" onClick={() => setOpen(false)} type="button">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="next-task-copy">{copy.subtitle}</p>

            <div className="email-form">
              <input
                className="planner-input"
                onChange={(event) => setEmail(event.target.value)}
                placeholder={copy.placeholder}
                type="email"
                value={email}
              />
              <button
                className="app-cta app-cta-primary"
                onClick={() => setSubmitted(Boolean(email.trim()))}
                type="button"
              >
                <Mail className="h-4 w-4" />
                {copy.action}
              </button>
            </div>

            {submitted ? <div className="email-success">{copy.success}</div> : null}

            <button className="pill-action" onClick={() => setOpen(false)} type="button">
              {copy.close}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
