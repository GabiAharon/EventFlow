import Link from "next/link";
import {
  CheckCircle2,
  MessageCircleMore,
  QrCode,
  ScanLine,
  Send,
} from "lucide-react";

import { AppShell, SectionTitle, Surface } from "@/components/app-shell";
import { PlanningBoard } from "@/components/planning-board";
import { type Locale, getCopy } from "@/lib/site-content";

function route(locale: Locale, path: string) {
  return locale === "en" ? `/en${path}` : path;
}

export function CreateScreen({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const isEnglish = locale === "en";

  return (
    <AppShell locale={locale} dir={copy.dir} nav={copy.nav}>
      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Surface className="app-panel app-panel-primary">
          <div className="app-panel-head">
            <div>
              <div className="app-kicker">{isEnglish ? "Create event" : "יצירת אירוע"}</div>
              <h1 className="app-title">
                {isEnglish ? "Set up the event in three short parts" : "מגדירים את האירוע בשלושה חלקים קצרים"}
              </h1>
            </div>
            <div className="status-pill">
              {isEnglish ? "Draft mode" : "טיוטה"}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {copy.create.steps.map((step, index) => (
              <div key={step} className={`readiness-step ${index === 0 ? "readiness-step-active" : ""}`}>
                <span className="readiness-dot" />
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="app-score-card">
              <div className="app-kicker">{isEnglish ? "What you fill in" : "מה ממלאים"}</div>
              <div className="compact-list mt-4">
                <div className="compact-row">
                  <CheckCircle2 className="h-4 w-4 text-amber-700" />
                  <span>{isEnglish ? "Event name and date" : "שם ותאריך"}</span>
                </div>
                <div className="compact-row">
                  <CheckCircle2 className="h-4 w-4 text-amber-700" />
                  <span>{isEnglish ? "Place and event type" : "מקום וסוג אירוע"}</span>
                </div>
                <div className="compact-row">
                  <CheckCircle2 className="h-4 w-4 text-amber-700" />
                  <span>{isEnglish ? "Private tasks and bring list" : "משימות פנימיות ורשימת הבאה"}</span>
                </div>
              </div>
            </div>

            <div className="app-next-card">
              <div className="app-kicker">{isEnglish ? "At the end" : "בסיום"}</div>
              <div className="next-task-title">
                {isEnglish ? "You get one link to share" : "מקבלים לינק אחד לשיתוף"}
              </div>
              <p className="next-task-copy">
                {isEnglish
                  ? "Use WhatsApp, copy link, or QR. No need to explain the flow to every guest."
                  : "שולחים בוואטסאפ, מעתיקים לינק או QR. לא צריך להסביר לכל אורח איך זה עובד."}
              </p>
              <div className="next-task-actions">
                <button className="app-cta app-cta-secondary" type="button">
                  <MessageCircleMore className="h-4 w-4" />
                  WhatsApp
                </button>
                <button className="app-cta app-cta-secondary" type="button">
                  <QrCode className="h-4 w-4" />
                  QR
                </button>
              </div>
            </div>
          </div>
        </Surface>
      </section>

      <PlanningBoard
        locale={locale}
        privateItems={copy.checklist}
        publicItems={copy.bringList}
        title={
          isEnglish
            ? "Add planning items before the event starts moving"
            : "להוסיף פריטי תכנון לפני שהאירוע מתחיל לזוז"
        }
        subtitle={
          isEnglish
            ? "This is the missing part: one side for the organizer only, one side for what guests should bring."
            : "זה החלק שהיה חסר: צד אחד למארגן בלבד, וצד אחד למה שהאורחים צריכים להביא."
        }
      />
    </AppShell>
  );
}

export function OrganizerScreen({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const isEnglish = locale === "en";

  return (
    <AppShell locale={locale} dir={copy.dir} nav={copy.nav}>
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Surface className="app-panel app-panel-primary">
          <div className="app-panel-head">
            <div>
              <div className="app-kicker">{isEnglish ? "Organizer board" : "לוח מארגן"}</div>
              <h1 className="app-title">
                {isEnglish ? "See what is ready and what is still open" : "רואים מה סגור ומה עדיין פתוח"}
              </h1>
            </div>
            <Link className="pill-action" href={route(locale, "/e/daniel-birthday")}>
              <Send className="h-4 w-4" />
              {isEnglish ? "Share link again" : "שלח שוב לינק"}
            </Link>
          </div>

          <div className="stats-strip">
            <div className="stat-chip">
              <span className="stat-chip-label">{isEnglish ? "Confirmed" : "אישרו"}</span>
              <span className="stat-chip-value">47</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-label">{isEnglish ? "Open items" : "פתוחים"}</span>
              <span className="stat-chip-value">3</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-label">{isEnglish ? "Ready score" : "מוכנות"}</span>
              <span className="stat-chip-value">82%</span>
            </div>
          </div>

          <div className="grid gap-3">
            {copy.events.map((event) => (
              <div key={event.title} className="event-tile event-tile-active">
                <div className="event-tile-main">
                  <div className="event-tile-title">{event.title}</div>
                  <div className="event-tile-meta">
                    <span>{event.date}</span>
                    <span>{event.mood}</span>
                  </div>
                </div>
                <div className="event-tile-side">
                  <div className="status-pill">{event.attendance}</div>
                  <div className="event-tile-actions">
                    <Link className="pill-action" href={route(locale, "/e/daniel-birthday")}>
                      <QrCode className="h-4 w-4" />
                      QR
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <PlanningBoard
        locale={locale}
        privateItems={copy.checklist}
        publicItems={copy.bringList}
        title={
          isEnglish
            ? "Update private tasks and public items from the same board"
            : "לעדכן משימות פנימיות ופריטים ציבוריים מאותו הלוח"
        }
        subtitle={
          isEnglish
            ? "This is where the organizer keeps the back-office work private while still showing guests what is needed."
            : "כאן המארגן שומר את העבודה האחורית פרטית, ועדיין מציג לאורחים מה צריך להביא."
        }
      />
    </AppShell>
  );
}

export function RecommendationsScreen({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);

  return (
    <AppShell locale={locale} dir={copy.dir} nav={copy.nav}>
      <section className="space-y-6">
        <SectionTitle
          eyebrow={locale === "en" ? "Knowledge layer" : "שכבת ידע"}
          title={copy.recommendationsTitle}
          subtitle={copy.recommendationsSubtitle}
        />
        <div className="grid gap-4">
          {copy.recommendations.map((item) => (
            <Surface key={item.title} className="recommendation-card">
              <div className="section-kicker">{item.category}</div>
              <h3 className="mt-3 font-display text-3xl text-stone-950">{item.title}</h3>
              <div className="mt-3 text-sm text-stone-500">
                {item.location} · {item.budget}
              </div>
              <p className="mt-4 text-stone-600">{item.note}</p>
            </Surface>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

export function EventScreen({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const isEnglish = locale === "en";

  return (
    <AppShell locale={locale} dir={copy.dir} nav={copy.nav}>
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Surface className="night-panel">
          <div className="section-kicker text-amber-300">{copy.eventPage.date}</div>
          <h1 className="mt-4 font-display text-5xl">{copy.eventPage.title}</h1>
          <p className="mt-4 text-stone-300">{copy.eventPage.subtitle}</p>
          <div className="mt-5 text-sm text-stone-300">
            {copy.eventPage.location} · {copy.eventPage.attendance}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button className="rounded-full bg-emerald-400 px-4 py-3 font-semibold text-emerald-950">
              {copy.eventPage.primary}
            </button>
            <button className="rounded-full border border-white/20 px-4 py-3">
              {copy.eventPage.secondary}
            </button>
            <button className="rounded-full border border-white/20 px-4 py-3">
              {copy.eventPage.maybe}
            </button>
          </div>
        </Surface>
        <div className="grid gap-4">
          <Surface className="bring-panel">
            <div className="section-kicker">{copy.bringTitle}</div>
            <div className="mt-4 space-y-3">
              {copy.bringList.map((item) => (
                <div
                  key={item.item}
                  className="flex items-center justify-between rounded-[1.2rem] bg-white px-4 py-3"
                >
                  <span>{item.item}</span>
                  <span className="text-sm text-stone-500">{item.owner}</span>
                </div>
              ))}
            </div>
          </Surface>
          <Surface>
            <div className="flex items-center gap-3 text-stone-900">
              <QrCode className="h-5 w-5" />
              <span>{isEnglish ? "Share options" : "אפשרויות שיתוף"}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link className="pill-action" href={route(locale, "/")}>
                <MessageCircleMore className="h-4 w-4" />
                WhatsApp
              </Link>
              <Link className="pill-action" href={route(locale, "/")}>
                Link
              </Link>
            </div>
          </Surface>
        </div>
      </section>
    </AppShell>
  );
}

export function OfflineScreen({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);

  return (
    <AppShell locale={locale} dir={copy.dir} nav={copy.nav}>
      <Surface className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-stone-950 text-stone-50">
          <ScanLine className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-display text-5xl text-stone-950">
          {locale === "en" ? "Offline mode stays focused" : "אופליין נשאר ממוקד"}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-stone-600">
          {locale === "en"
            ? "In v1, offline support is intentionally limited to event-day check-in so the core experience stays reliable."
            : "בגרסת ה-MVP, אופליין קיים לצ'ק-אין ביום האירוע בלבד כדי לשמור על מוצר אמין ופשוט."}
        </p>
      </Surface>
    </AppShell>
  );
}
