import Link from "next/link";
import {
  MessageCircleMore,
  QrCode,
  ScanLine,
  Send,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { AppShell, QuickStatus, SectionTitle, Surface } from "@/components/app-shell";
import { PlanningBoard } from "@/components/planning-board";
import { RemotionPreview } from "@/components/remotion-preview";
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
        <Surface className="panel-soft dashboard-hero">
          <div className="dashboard-badge">
            <Sparkles className="h-4 w-4" />
            {isEnglish ? "Create flow" : "מסלול יצירה"}
          </div>

          <div className="dashboard-hero-grid">
            <div className="space-y-5">
              <SectionTitle
                eyebrow={isEnglish ? "Step by step" : "שלב אחרי שלב"}
                title={
                  isEnglish
                    ? "Build the event like a guided checklist"
                    : "לבנות את האירוע כמו צ'קליסט מודרך"
                }
                subtitle={
                  isEnglish
                    ? "The form stays simple: first the event basics, then the two planning lists, then sharing."
                    : "הטופס נשאר פשוט: קודם פרטי האירוע, אחר כך שתי רשימות התכנון, ואז שיתוף."
                }
              />

              <div className="readiness-rail">
                {copy.create.steps.map((step, index) => (
                  <div
                    key={step}
                    className={`readiness-step ${index === 0 ? "readiness-step-active" : ""}`}
                  >
                    <span className="readiness-dot" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="app-score-card">
                  <div className="section-kicker">
                    {isEnglish ? "Suggested topic" : "נושא מומלץ"}
                  </div>
                  <div className="mt-3 font-display text-3xl text-stone-950">
                    {isEnglish ? "Birthday · Age 3" : "יום הולדת · גיל 3"}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-stone-600">
                    {isEnglish
                      ? "Choosing the event type loads a matching bring list and more relevant recommendations."
                      : "בחירת סוג האירוע טוענת רשימת הבאה מתאימה והמלצות מדויקות יותר."}
                  </p>
                </div>

                <div className="app-next-card">
                  <div className="section-kicker">
                    {isEnglish ? "Share outcome" : "בסוף התהליך"}
                  </div>
                  <div className="mt-3 text-xl font-semibold text-stone-950">
                    {isEnglish ? "You get one clean event link" : "מקבלים לינק אירוע נקי אחד"}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-stone-600">
                    {isEnglish
                      ? "Send via WhatsApp, copy it, or show a QR code on the spot."
                      : "שולחים בוואטסאפ, מעתיקים, או מציגים QR במקום."}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <Surface className="motion-panel">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="section-kicker">
                      {isEnglish ? "Motion" : "תצוגת motion"}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-stone-950">
                      {isEnglish ? "Event setup pulse" : "Pulse של תהליך ההקמה"}
                    </div>
                  </div>
                  <div className="motion-badge">Remotion</div>
                </div>
                <div className="mt-4">
                  <RemotionPreview locale={locale} />
                </div>
              </Surface>

              <Surface className="night-panel">
                <div className="section-kicker text-amber-300">
                  {isEnglish ? "Why split the lists?" : "למה לפצל רשימות?"}
                </div>
                <p className="mt-4 text-sm leading-7 text-stone-300">
                  {isEnglish
                    ? "Because private organizer work and guest-facing items are different jobs. Keeping them apart makes the app easier on first use."
                    : "כי משימות פנימיות של מארגן ומה שהאורחים מביאים הם שני דברים שונים. ההפרדה הזאת הופכת את האפליקציה לברורה כבר בכניסה הראשונה."}
                </p>
              </Surface>
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
        <Surface className="panel-soft dashboard-hero">
          <div className="dashboard-badge">
            <UsersRound className="h-4 w-4" />
            {isEnglish ? "Organizer board" : "לוח מארגן"}
          </div>

          <div className="dashboard-hero-grid">
            <div className="space-y-5">
              <SectionTitle
                eyebrow={isEnglish ? "Control room" : "חדר הבקרה"}
                title={
                  isEnglish
                    ? "Keep attendance, tasks, and guest items in one flow"
                    : "להחזיק אישורי הגעה, משימות ופריטי הבאה בזרימה אחת"
                }
                subtitle={
                  isEnglish
                    ? "Instead of jumping between chats and notes, the organizer board shows what is ready and what still needs action."
                    : "במקום לקפוץ בין צ'אטים והערות, לוח המארגן מראה מה סגור ומה עוד דורש פעולה."
                }
              />

              <div className="grid gap-3 md:grid-cols-3">
                <div className="metric-card">
                  <div className="text-xs uppercase tracking-[0.24em] text-stone-500">
                    {isEnglish ? "Confirmed" : "אישרו"}
                  </div>
                  <div className="mt-2 font-display text-3xl text-stone-950">47</div>
                </div>
                <div className="metric-card">
                  <div className="text-xs uppercase tracking-[0.24em] text-stone-500">
                    {isEnglish ? "Open items" : "פריטים פתוחים"}
                  </div>
                  <div className="mt-2 font-display text-3xl text-stone-950">3</div>
                </div>
                <div className="metric-card">
                  <div className="text-xs uppercase tracking-[0.24em] text-stone-500">
                    {isEnglish ? "Ready score" : "מדד מוכנות"}
                  </div>
                  <div className="mt-2 font-display text-3xl text-stone-950">82%</div>
                </div>
              </div>

              <div className="grid gap-3">
                {copy.events.map((event) => (
                  <div key={event.title} className="app-event-card">
                    <div>
                      <div className="font-display text-2xl text-stone-950">{event.title}</div>
                      <div className="mt-2 text-sm text-stone-500">{event.date}</div>
                      <div className="mt-2 text-sm text-amber-700">{event.mood}</div>
                    </div>
                    <div className="space-y-3 xl:text-left">
                      <div className="status-pill">{event.attendance}</div>
                      <div className="flex flex-wrap gap-2 xl:justify-end">
                        <Link className="pill-action" href={route(locale, "/e/daniel-birthday")}>
                          <Send className="h-4 w-4" />
                          {isEnglish ? "Share again" : "לשלוח שוב"}
                        </Link>
                        <Link className="pill-action" href={route(locale, "/e/daniel-birthday")}>
                          <QrCode className="h-4 w-4" />
                          QR
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <QuickStatus />

              <Surface className="motion-panel">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="section-kicker">
                      {isEnglish ? "Active view" : "מבט פעיל"}
                    </div>
                    <div className="mt-2 text-lg font-semibold text-stone-950">
                      {isEnglish ? "The app looks alive" : "האפליקציה נראית חיה"}
                    </div>
                  </div>
                  <div className="motion-badge">Remotion</div>
                </div>
                <div className="mt-4">
                  <RemotionPreview locale={locale} />
                </div>
              </Surface>
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
