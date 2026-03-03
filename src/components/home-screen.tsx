import Link from "next/link";
import {
  ArrowUpRight,
  CalendarRange,
  CheckCircle2,
  ClipboardList,
  ListTodo,
  MapPinned,
  MessageCircleMore,
  Plus,
} from "lucide-react";

import { AppShell, QuickStatus, Surface } from "@/components/app-shell";
import { RemotionPreview } from "@/components/remotion-preview";
import { type Locale, getCopy } from "@/lib/site-content";

function route(locale: Locale, path: string) {
  return locale === "en" ? `/en${path}` : path;
}

export function HomeScreen({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const isEnglish = locale === "en";

  return (
    <AppShell locale={locale} dir={copy.dir} nav={copy.nav}>
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Surface className="panel-soft dashboard-hero">
          <div className="dashboard-badge">
            <CheckCircle2 className="h-4 w-4" />
            {isEnglish ? "Organizer home" : "מסך הבית למארגן"}
          </div>

          <div className="dashboard-hero-grid">
            <div className="space-y-5">
              <div className="space-y-3">
                <h1 className="font-display text-4xl leading-tight text-stone-950 sm:text-5xl">
                  {isEnglish
                    ? "Open the app and know exactly what to do next."
                    : "פותחים את האפליקציה ומבינים מיד מה הצעד הבא."}
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-stone-600">
                  {isEnglish
                    ? "Create an event, send one link, track attendance confirmations, and manage the event day from one place."
                    : "יוצרים אירוע, שולחים לינק אחד, רואים אישורי הגעה ומנהלים את יום האירוע ממקום אחד."}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Link className="app-cta app-cta-primary" href={route(locale, "/create")}>
                  <Plus className="h-4 w-4" />
                  {isEnglish ? "Create event" : "ליצור אירוע"}
                </Link>
                <Link className="app-cta app-cta-secondary" href={route(locale, "/organizer")}>
                  <ClipboardList className="h-4 w-4" />
                  {isEnglish ? "Open organizer board" : "לפתוח את לוח המארגן"}
                </Link>
              </div>

              <div className="readiness-rail">
                {[
                  isEnglish ? "1. Create the event" : "1. יוצרים אירוע",
                  isEnglish ? "2. Send the link" : "2. שולחים לינק",
                  isEnglish ? "3. Track confirmations" : "3. רואים אישורי הגעה",
                  isEnglish ? "4. Run event day" : "4. מנהלים את יום האירוע",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`readiness-step ${index < 2 ? "readiness-step-active" : ""}`}
                  >
                    <span className="readiness-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <div className="app-score-card">
                <div className="section-kicker">
                  {isEnglish ? "Today" : "היום"}
                </div>
                <div className="mt-3 font-display text-4xl text-stone-950">67%</div>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  {isEnglish
                    ? "Your current sample event is almost ready. Finish the bring list and share the event page."
                    : "האירוע לדוגמה כמעט מוכן. נשאר רק לסגור את רשימת ההבאה ולשתף את דף האירוע."}
                </p>
              </div>

              <div className="app-next-card">
                <div className="section-kicker">
                  {isEnglish ? "Next move" : "המהלך הבא"}
                </div>
                <div className="mt-3 text-xl font-semibold text-stone-950">
                  {isEnglish ? "Add what guests should bring" : "להוסיף מה האורחים צריכים להביא"}
                </div>
                <p className="mt-2 text-sm leading-7 text-stone-600">
                  {isEnglish
                    ? "That keeps the chat clean and shows what is still open."
                    : "כך לא מחפשים הודעות בוואטסאפ וכולם רואים מה עדיין פתוח."}
                </p>
                <Link className="pill-action mt-4 w-fit" href={route(locale, "/create")}>
                  <ListTodo className="h-4 w-4" />
                  {isEnglish ? "Open planning" : "לפתוח תכנון"}
                </Link>
              </div>
            </div>
          </div>
        </Surface>

        <div className="grid gap-6">
          <Surface className="motion-panel">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="section-kicker">
                  {isEnglish ? "Live motion" : "תצוגת motion"}
                </div>
                <h2 className="mt-3 font-display text-3xl leading-tight text-stone-950">
                  {isEnglish ? "A living event pulse" : "Pulse חי של האירוע"}
                </h2>
              </div>
              <div className="motion-badge">Remotion</div>
            </div>
            <p className="mt-3 max-w-xl text-sm leading-7 text-stone-600">
              {isEnglish
                ? "A branded motion layer that makes the app feel active without turning it into a landing page."
                : "שכבת motion ממותגת שנותנת תחושת חיות לאפליקציה בלי להפוך אותה לדף נחיתה."}
            </p>
            <div className="mt-5">
              <RemotionPreview locale={locale} />
            </div>
          </Surface>

          <QuickStatus />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <Surface>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="section-kicker">{isEnglish ? "My events" : "האירועים שלי"}</div>
              <h2 className="mt-3 font-display text-3xl text-stone-950 sm:text-4xl">
                {isEnglish ? "Active events" : "אירועים פעילים"}
              </h2>
            </div>
            <Link className="pill-action" href={route(locale, "/create")}>
              <Plus className="h-4 w-4" />
              {isEnglish ? "New event" : "אירוע חדש"}
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {copy.events.map((event) => (
              <div key={event.title} className="app-event-card">
                <div className="space-y-2">
                  <div className="font-display text-2xl text-stone-950">{event.title}</div>
                  <div className="inline-flex items-center gap-2 text-sm text-stone-500">
                    <CalendarRange className="h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="text-sm text-amber-700">{event.mood}</div>
                </div>

                <div className="space-y-4 xl:text-left">
                  <div className="status-pill">{event.attendance}</div>
                  <div className="flex flex-wrap gap-2 xl:justify-end">
                    <Link className="pill-action" href={route(locale, "/organizer")}>
                      {isEnglish ? "Manage" : "נהל"}
                    </Link>
                    <Link className="pill-action" href={route(locale, "/e/daniel-birthday")}>
                      <MessageCircleMore className="h-4 w-4" />
                      {isEnglish ? "Share link" : "שלח לינק"}
                    </Link>
                    <Link className="pill-action" href={route(locale, "/e/daniel-birthday")}>
                      <ArrowUpRight className="h-4 w-4" />
                      {isEnglish ? "Open event page" : "פתח דף אירוע"}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Surface>

        <div className="grid gap-6">
          <Surface className="bring-panel">
            <div className="section-kicker">{isEnglish ? "Planning" : "תכנון"}</div>
            <h2 className="mt-3 font-display text-3xl text-stone-950">
              {isEnglish ? "Keep both lists visible" : "להחזיק את שתי הרשימות מול העיניים"}
            </h2>

            <div className="mt-5 grid gap-4">
              <div className="list-snapshot list-snapshot-private">
                <div className="list-snapshot-head">
                  <span>{isEnglish ? "Private organizer list" : "רשימת תכנון פנימית"}</span>
                  <span className="planner-owner-pill">{copy.checklist.length}</span>
                </div>
                <div className="mt-3 grid gap-2">
                  {copy.checklist.slice(0, 3).map((item) => (
                    <div key={item} className="task-row">
                      <span className="task-dot" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="list-snapshot list-snapshot-public">
                <div className="list-snapshot-head">
                  <span>{isEnglish ? "Guest bring list" : "מה האורחים מביאים"}</span>
                  <span className="planner-owner-pill">{copy.bringList.length}</span>
                </div>
                <div className="mt-3 grid gap-2">
                  {copy.bringList.map((item) => (
                    <div key={item.item} className="bring-row">
                      <span>{item.item}</span>
                      <span className="text-sm text-stone-500">{item.owner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link className="pill-action mt-5 w-fit" href={route(locale, "/create")}>
              <Plus className="h-4 w-4" />
              {isEnglish ? "Add items" : "להוסיף פריטים"}
            </Link>
          </Surface>

          <Surface>
            <div className="section-kicker">
              {isEnglish ? "Recommendations" : "המלצות"}
            </div>
            <h2 className="mt-3 font-display text-3xl text-stone-950">
              {isEnglish ? "Only what matches the event" : "רק מה שרלוונטי לסוג האירוע"}
            </h2>
            <div className="mt-5 grid gap-4">
              {copy.recommendations.map((item) => (
                <div key={item.title} className="recommendation-card rounded-[1.4rem] p-4">
                  <div className="section-kicker">{item.category}</div>
                  <div className="mt-3 font-display text-2xl text-stone-950">{item.title}</div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-stone-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPinned className="h-4 w-4" />
                      {item.location}
                    </span>
                    <span>{item.budget}</span>
                  </div>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </section>
    </AppShell>
  );
}
