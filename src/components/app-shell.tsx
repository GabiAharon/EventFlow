import Link from "next/link";
import { ArrowUpRight, CheckCircle2, QrCode, ScanLine, Sparkles } from "lucide-react";

import { type Locale } from "@/lib/site-content";

type AppShellProps = {
  locale: Locale;
  dir: "rtl" | "ltr";
  nav: {
    create: string;
    organizer: string;
    recommendations: string;
    event: string;
  };
  children: React.ReactNode;
};

function href(locale: Locale, path: string) {
  return locale === "en" ? `/en${path}` : path;
}

export function AppShell({ locale, dir, nav, children }: AppShellProps) {
  const switchHref = locale === "en" ? "/" : "/en";

  return (
    <div dir={dir} className="min-h-screen overflow-hidden">
      <div className="ambient-gradient" />
      <div className="grain" />
      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <header className="site-header">
          <div className="flex items-center gap-3">
            <div className="brand-mark">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-[1.85rem] leading-none text-stone-950">
                EventFlow
              </div>
              <div className="mt-1 text-xs text-stone-500 sm:text-sm">
                {locale === "en"
                  ? "Fast event planning, confirmations, and event-day flow"
                  : "תכנון אירוע, אישורי הגעה וניהול יום האירוע במקום אחד"}
              </div>
            </div>
          </div>

          <div className="nav-row">
            <Link className="nav-pill nav-pill-cta" href={href(locale, "/create")}>
              {nav.create}
            </Link>
            <Link className="nav-pill" href={href(locale, "/organizer")}>
              {nav.organizer}
            </Link>
            <Link className="nav-pill" href={href(locale, "/recommendations")}>
              {nav.recommendations}
            </Link>
            <Link className="nav-pill" href={href(locale, "/e/daniel-birthday")}>
              {nav.event}
            </Link>
            <Link className="locale-pill" href={switchHref}>
              {locale === "en" ? "HE" : "EN"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <div className="text-xs uppercase tracking-[0.24em] text-stone-500">{label}</div>
      <div className="mt-2 font-display text-3xl leading-none text-stone-950 sm:text-[2.6rem]">
        {value}
      </div>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="space-y-3">
      <div className="section-kicker">{eyebrow}</div>
      <h2 className="font-display text-3xl leading-tight text-stone-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Surface({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glass-panel rounded-[1.8rem] p-5 sm:p-7 ${className}`}>{children}</div>;
}

export function QuickStatus() {
  return (
    <Surface className="night-panel">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.28em] text-stone-400">יום האירוע</div>
          <h3 className="mt-3 max-w-sm font-display text-3xl leading-tight">
            גם אם אין קליטה, ממשיכים לסמן מי הגיע.
          </h3>
        </div>
        <ScanLine className="h-8 w-8 flex-none text-amber-300" />
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <span className="chip-dark">
          <CheckCircle2 className="h-4 w-4" />
          נשמר במכשיר
        </span>
        <span className="chip-dark">
          <QrCode className="h-4 w-4" />
          סריקת QR
        </span>
      </div>
    </Surface>
  );
}
