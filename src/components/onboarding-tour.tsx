"use client";

import { useEffect, useMemo, useState } from "react";

import { type Locale } from "@/lib/site-content";

type TourStep = {
  id: string;
  title: string;
  body: string;
};

const stepsByLocale: Record<Locale, TourStep[]> = {
  he: [
    {
      id: "email-access",
      title: "קודם מתחברים",
      body: "אם רוצים לעבוד מסודר בין מכשירים, מתחילים עם מייל.",
    },
    {
      id: "create-event",
      title: "כאן יוצרים אירוע",
      body: "זה הכפתור שממנו מתחילים אירוע חדש.",
    },
    {
      id: "share-event",
      title: "אחר כך שולחים לינק",
      body: "מכאן שולחים WhatsApp, מעתיקים לינק או מציגים QR.",
    },
    {
      id: "private-checklist",
      title: "וזה נשאר רק למארגן",
      body: "הרשימה הפנימית עוזרת לך לזכור מה עוד צריך לסגור.",
    },
  ],
  en: [
    {
      id: "email-access",
      title: "Start with email",
      body: "Use email when you want access across devices later on.",
    },
    {
      id: "create-event",
      title: "Create the event here",
      body: "This is the main button to start a new event.",
    },
    {
      id: "share-event",
      title: "Then share one link",
      body: "Send WhatsApp, copy the link, or show a QR from here.",
    },
    {
      id: "private-checklist",
      title: "This stays organizer-only",
      body: "Use the private checklist to track what still needs action.",
    },
  ],
};

function storageKey(locale: Locale) {
  return `eventflow-tour-dismissed:${locale}`;
}

export function OnboardingTour({ locale }: { locale: Locale }) {
  const steps = useMemo(() => stepsByLocale[locale], [locale]);
  const [activeIndex, setActiveIndex] = useState<number | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem(storageKey(locale)) ? null : 0;
  });
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const target = document.querySelector<HTMLElement>(`[data-tour-id="${steps[activeIndex].id}"]`);
    if (!target) {
      return;
    }

    const updateRect = () => {
      const nextRect = target.getBoundingClientRect();
      setRect(nextRect);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [activeIndex, steps]);

  if (activeIndex === null || !rect || viewport.width === 0) {
    return null;
  }

  const step = steps[activeIndex];
  const bubbleWidth = Math.min(320, viewport.width - 32);
  const bubbleLeft = Math.max(16, Math.min(rect.left, viewport.width - bubbleWidth - 16));
  const bubbleTop =
    rect.bottom + 14 + 180 < viewport.height
      ? rect.bottom + 14
      : Math.max(16, rect.top - 150);

  const closeTour = () => {
    window.localStorage.setItem(storageKey(locale), "1");
    setActiveIndex(null);
  };

  const nextStep = () => {
    if (activeIndex >= steps.length - 1) {
      closeTour();
      return;
    }

    setActiveIndex(activeIndex + 1);
  };

  return (
    <div className="tour-layer" role="presentation">
      <div className="tour-dim" />
      <div
        className="tour-spotlight"
        style={{
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        }}
      />

      <div
        className="tour-bubble"
        style={{
          top: bubbleTop,
          left: bubbleLeft,
          width: bubbleWidth,
        }}
      >
        <div className="tour-step-count">
          {activeIndex + 1}/{steps.length}
        </div>
        <div className="tour-title">{step.title}</div>
        <p className="tour-copy">{step.body}</p>
        <div className="tour-actions">
          <button className="pill-action" onClick={closeTour} type="button">
            {locale === "en" ? "Skip" : "דלג"}
          </button>
          <button className="app-cta app-cta-primary" onClick={nextStep} type="button">
            {activeIndex === steps.length - 1
              ? locale === "en"
                ? "Start"
                : "להתחיל"
              : locale === "en"
                ? "Next"
                : "הבא"}
          </button>
        </div>
      </div>
    </div>
  );
}
