import Link from "next/link";
import {
  ArrowUpRight,
  CalendarRange,
  ClipboardList,
  Link2,
  ListChecks,
  MapPinned,
  MessageCircleMore,
  Plus,
  QrCode,
  UsersRound,
} from "lucide-react";

import { AppShell, Surface } from "@/components/app-shell";
import { OnboardingTour } from "@/components/onboarding-tour";
import { type Locale, getCopy } from "@/lib/site-content";

function route(locale: Locale, path: string) {
  return locale === "en" ? `/en${path}` : path;
}

export function HomeScreen({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const isEnglish = locale === "en";
  const primaryEvent = copy.events[0];

  return (
    <AppShell locale={locale} dir={copy.dir} nav={copy.nav}>
      <OnboardingTour locale={locale} />
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Surface className="app-panel app-panel-primary">
          <div className="app-panel-head">
            <div>
              <div className="app-kicker">{isEnglish ? "Events" : "אירועים"}</div>
              <h1 className="app-title">
                {isEnglish ? "Your events" : "האירועים שלך"}
              </h1>
            </div>
            <Link
              className="app-cta app-cta-primary"
              data-tour-id="create-event"
              href={route(locale, "/create")}
            >
              <Plus className="h-4 w-4" />
              {isEnglish ? "New event" : "אירוע חדש"}
            </Link>
          </div>

          <div className="stats-strip">
            <div className="stat-chip">
              <span className="stat-chip-label">{isEnglish ? "Active" : "פעילים"}</span>
              <span className="stat-chip-value">{copy.events.length}</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-label">{isEnglish ? "Pending items" : "פריטים פתוחים"}</span>
              <span className="stat-chip-value">{copy.checklist.length}</span>
            </div>
            <div className="stat-chip">
              <span className="stat-chip-label">{isEnglish ? "Guests bringing items" : "מביאים פריטים"}</span>
              <span className="stat-chip-value">{copy.bringList.length}</span>
            </div>
          </div>

          <div className="event-stack">
            {copy.events.map((event, index) => (
              <div key={event.title} className={`event-tile ${index === 0 ? "event-tile-active" : ""}`}>
                <div className="event-tile-main">
                  <div className="event-tile-title">{event.title}</div>
                  <div className="event-tile-meta">
                    <span className="inline-flex items-center gap-2">
                      <CalendarRange className="h-4 w-4" />
                      {event.date}
                    </span>
                    <span>{event.mood}</span>
                  </div>
                </div>
                <div className="event-tile-side">
                  <div className="status-pill">{event.attendance}</div>
                  <div className="event-tile-actions">
                    <Link className="pill-action" href={route(locale, "/organizer")}>
                      <ClipboardList className="h-4 w-4" />
                      {isEnglish ? "Manage" : "ניהול"}
                    </Link>
                    <Link className="pill-action" href={route(locale, "/e/daniel-birthday")}>
                      <ArrowUpRight className="h-4 w-4" />
                      {isEnglish ? "Open" : "פתיחה"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Surface>

        <div className="grid gap-4">
          <Surface className="app-panel">
            <div className="app-kicker">{isEnglish ? "Next action" : "הצעד הבא"}</div>
            <div className="next-task-card">
              <div className="next-task-title">
                {isEnglish ? "Share the event link" : "לשלוח את הלינק לאירוע"}
              </div>
              <p className="next-task-copy">
                {isEnglish
                  ? "Send once. Stop managing confirmations in chat."
                  : "שולחים פעם אחת ומפסיקים לנהל אישורי הגעה בתוך הוואטסאפ."}
              </p>
              <div className="next-task-actions" data-tour-id="share-event">
                <Link className="app-cta app-cta-primary" href={route(locale, "/e/daniel-birthday")}>
                  <MessageCircleMore className="h-4 w-4" />
                  WhatsApp
                </Link>
                <button className="app-cta app-cta-secondary" type="button">
                  <Link2 className="h-4 w-4" />
                  {isEnglish ? "Copy link" : "העתק לינק"}
                </button>
                <button className="app-cta app-cta-secondary" type="button">
                  <QrCode className="h-4 w-4" />
                  QR
                </button>
              </div>
            </div>
          </Surface>

          <Surface className="app-panel">
            <div className="app-kicker">{isEnglish ? "Today" : "היום"}</div>
            <div className="compact-list">
              <div className="compact-row">
                <UsersRound className="h-4 w-4 text-amber-700" />
                <div className="compact-copy">
                  <span>{isEnglish ? "Confirmed attendance" : "אישורי הגעה"}</span>
                  <strong>{primaryEvent.attendance}</strong>
                </div>
              </div>
              <div className="compact-row">
                <ListChecks className="h-4 w-4 text-amber-700" />
                <div className="compact-copy">
                  <span>{isEnglish ? "Private checklist" : "צ'קליסט פנימי"}</span>
                  <strong>{copy.checklist.length}</strong>
                </div>
              </div>
              <div className="compact-row">
                <MapPinned className="h-4 w-4 text-amber-700" />
                <div className="compact-copy">
                  <span>{isEnglish ? "Current event" : "האירוע הנוכחי"}</span>
                  <strong>{primaryEvent.title}</strong>
                </div>
              </div>
            </div>
          </Surface>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          <Surface className="app-panel" data-tour-id="private-checklist">
            <div className="app-panel-head">
              <div>
                <div className="app-kicker">{isEnglish ? "Organizer only" : "למארגן בלבד"}</div>
                <h2 className="section-title-compact">
                  {isEnglish ? "Internal checklist" : "רשימת תכנון פנימית"}
                </h2>
              </div>
              <Link className="pill-action" href={route(locale, "/create")}>
                <Plus className="h-4 w-4" />
                {isEnglish ? "Add" : "הוסף"}
              </Link>
            </div>

            <div className="grid gap-2">
              {copy.checklist.map((item) => (
                <div key={item} className="task-row">
                  <span className="task-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Surface>

          <Surface className="app-panel bring-panel">
            <div className="app-panel-head">
              <div>
                <div className="app-kicker">{isEnglish ? "Guests see this" : "האורחים רואים"}</div>
                <h2 className="section-title-compact">
                  {isEnglish ? "Bring list" : "מה להביא"}
                </h2>
              </div>
              <Link className="pill-action" href={route(locale, "/create")}>
                <Plus className="h-4 w-4" />
                {isEnglish ? "Add item" : "הוסף פריט"}
              </Link>
            </div>

            <div className="grid gap-2">
              {copy.bringList.map((item) => (
                <div key={item.item} className="bring-row">
                  <span>{item.item}</span>
                  <span className="planner-owner-pill">{item.owner}</span>
                </div>
              ))}
            </div>
          </Surface>
        </div>

        <Surface className="app-panel">
          <div className="app-panel-head">
            <div>
              <div className="app-kicker">{isEnglish ? "Useful now" : "רלוונטי עכשיו"}</div>
              <h2 className="section-title-compact">
                {isEnglish ? "Recommendations for this event type" : "המלצות לסוג האירוע הזה"}
              </h2>
            </div>
            <Link className="pill-action" href={route(locale, "/recommendations")}>
              {isEnglish ? "All recommendations" : "לכל ההמלצות"}
            </Link>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {copy.recommendations.map((item) => (
              <div key={item.title} className="recommendation-card recommendation-card-tight">
                <div className="section-kicker">{item.category}</div>
                <div className="mt-3 font-display text-2xl text-stone-950">{item.title}</div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-stone-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPinned className="h-4 w-4" />
                    {item.location}
                  </span>
                  <span>{item.budget}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-stone-600">{item.note}</p>
              </div>
            ))}
          </div>
        </Surface>
      </section>
    </AppShell>
  );
}
