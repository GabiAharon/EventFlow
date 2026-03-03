import "server-only";

import { createDemoEvent, getDemoEventBySlug, getDemoEvents, getDemoRecommendations } from "@/lib/demo-store";
import type {
  DashboardData,
  EventCardView,
  EventDetailView,
  EventRecord,
  Locale,
  RecommendationCardView,
} from "@/lib/eventflow-types";
import { createSupabaseAdminClient, hasSupabaseEnv } from "@/lib/supabase/server";

type SupabaseRsvpRow = {
  status: "going" | "not_going" | "maybe";
  checked_in: boolean | null;
};

type SupabaseChecklistRow = {
  label: string;
};

type SupabaseBringItemRow = {
  label: string;
  claimed_by_name: string | null;
};

type SupabaseNamedRow = {
  name_he: string | null;
  name_en: string | null;
};

type SupabaseEventRow = {
  id: string;
  title: string;
  description: string | null;
  event_at: string;
  location: string;
  maps_url: string | null;
  is_public: boolean | null;
  access_code: string | null;
  event_checklists: SupabaseChecklistRow[] | null;
  event_bring_items: SupabaseBringItemRow[] | null;
  event_categories: SupabaseNamedRow | null;
  event_subtypes: SupabaseNamedRow | null;
  rsvps: SupabaseRsvpRow[] | null;
};

type SupabaseRecommendationRow = {
  id: string;
  vendor_name: string;
  city: string | null;
  price_range: string | null;
  notes: string | null;
  event_categories: SupabaseNamedRow | null;
  event_subtypes: SupabaseNamedRow | null;
};

function localize(locale: Locale, value: { he: string; en: string }) {
  return locale === "en" ? value.en : value.he;
}

function joinParts(parts: string[]) {
  return parts.filter(Boolean).join(" · ");
}

function formatEventDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "he-IL", {
    weekday: locale === "en" ? "short" : undefined,
    day: "numeric",
    month: locale === "en" ? "short" : "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(new Date(value))
    .replace(",", " ·");
}

function buildAttendanceLine(locale: Locale, attendance: EventRecord["attendance"]) {
  const spotsLeft = Math.max(attendance.capacity - attendance.confirmed, 0);

  if (locale === "en") {
    return `${attendance.confirmed} confirmed · ${attendance.declined} declined · ${spotsLeft} spots left`;
  }

  return `${attendance.confirmed} אישרו · ${attendance.declined} לא מגיעים · ${spotsLeft} מקומות פנויים`;
}

function toEventCard(locale: Locale, event: EventRecord): EventCardView {
  return {
    slug: event.slug,
    title: localize(locale, event.title),
    date: formatEventDate(locale, event.eventAt),
    attendance:
      locale === "en"
        ? `${event.attendance.confirmed} of ${event.attendance.capacity} confirmed`
        : `${event.attendance.confirmed} מתוך ${event.attendance.capacity} אישרו`,
    mood: joinParts([localize(locale, event.category), localize(locale, event.subtype)]),
  };
}

function toRecommendationCard(
  locale: Locale,
  recommendation: Awaited<ReturnType<typeof getDemoRecommendations>>[number],
): RecommendationCardView {
  return {
    id: recommendation.id,
    title: localize(locale, recommendation.title),
    category: localize(locale, recommendation.category),
    location: localize(locale, recommendation.location),
    budget: localize(locale, recommendation.budget),
    note: localize(locale, recommendation.note),
  };
}

function toEventDetail(locale: Locale, event: EventRecord): EventDetailView {
  return {
    slug: event.slug,
    title: localize(locale, event.title),
    subtitle: localize(locale, event.description),
    date: formatEventDate(locale, event.eventAt),
    location: localize(locale, event.location),
    attendance: buildAttendanceLine(locale, event.attendance),
    checklist: event.checklist,
    bringList: event.bringList,
    isPublic: event.isPublic,
    accessCode: event.accessCode,
  };
}

async function getSupabaseEvents(): Promise<EventRecord[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("events")
    .select(
      `
        id,
        title,
        description,
        event_at,
        location,
        maps_url,
        is_public,
        access_code,
        event_checklists(label),
        event_bring_items(label, claimed_by_name),
        event_categories(name_he, name_en),
        event_subtypes(name_he, name_en),
        rsvps(status, checked_in)
      `,
    )
    .order("event_at", { ascending: true });

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as unknown as SupabaseEventRow[];

  return rows.map((row) => {
    const confirmed = (row.rsvps ?? []).filter((item) => item.status === "going").length;
    const declined = (row.rsvps ?? []).filter((item) => item.status === "not_going").length;
    const maybe = (row.rsvps ?? []).filter((item) => item.status === "maybe").length;
    const checkedIn = (row.rsvps ?? []).filter((item) => item.checked_in).length;

    return {
      id: row.id,
      slug: slugify(row.title || "event"),
      title: {
        he: row.title,
        en: row.title,
      },
      description: {
        he: row.description ?? "",
        en: row.description ?? "",
      },
      category: {
        he: row.event_categories?.name_he ?? "אירוע",
        en: row.event_categories?.name_en ?? "Event",
      },
      subtype: {
        he: row.event_subtypes?.name_he ?? "",
        en: row.event_subtypes?.name_en ?? "",
      },
      eventAt: row.event_at,
      location: {
        he: row.location,
        en: row.location,
      },
      mapsUrl: row.maps_url ?? "",
      isPublic: row.is_public ?? true,
      accessCode: row.access_code ?? "",
      attendance: {
        confirmed,
        declined,
        maybe,
        checkedIn,
        capacity: confirmed + declined + maybe + 10,
      },
      checklist: (row.event_checklists ?? []).map((item) => item.label),
      bringList: (row.event_bring_items ?? []).map((item) => ({
        item: item.label,
        owner: item.claimed_by_name || "Open",
      })),
    };
  });
}

async function getSupabaseRecommendations() {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("vendor_recommendations")
    .select(
      `
        id,
        vendor_name,
        city,
        price_range,
        notes,
        event_categories(name_he, name_en),
        event_subtypes(name_he, name_en)
      `,
    )
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    throw error;
  }

  const rows = (data ?? []) as unknown as SupabaseRecommendationRow[];

  return rows.map((row) => ({
    id: row.id,
    title: {
      he: row.vendor_name,
      en: row.vendor_name,
    },
    category: {
      he: joinParts([row.event_categories?.name_he ?? "", row.event_subtypes?.name_he ?? ""]),
      en: joinParts([row.event_categories?.name_en ?? "", row.event_subtypes?.name_en ?? ""]),
    },
    location: {
      he: row.city ?? "",
      en: row.city ?? "",
    },
    budget: {
      he: row.price_range ?? "",
      en: row.price_range ?? "",
    },
    note: {
      he: row.notes ?? "",
      en: row.notes ?? "",
    },
  }));
}

export async function getDashboardData(locale: Locale): Promise<DashboardData> {
  const [events, recommendations] = hasSupabaseEnv()
    ? await Promise.all([getSupabaseEvents(), getSupabaseRecommendations()])
    : await Promise.all([getDemoEvents(), getDemoRecommendations()]);

  const primaryEvent = events[0];

  return {
    events: events.map((event) => toEventCard(locale, event)),
    recommendations: recommendations.map((item) => toRecommendationCard(locale, item)),
    checklist: primaryEvent?.checklist ?? [],
    bringList: primaryEvent?.bringList ?? [],
  };
}

export async function getEventDetail(locale: Locale, slug: string) {
  const event = hasSupabaseEnv()
    ? (await getSupabaseEvents()).find((item) => item.slug === slug) ?? null
    : await getDemoEventBySlug(slug);

  return event ? toEventDetail(locale, event) : null;
}

export async function getRecommendationCards(locale: Locale) {
  const recommendations = hasSupabaseEnv()
    ? await getSupabaseRecommendations()
    : await getDemoRecommendations();

  return recommendations.map((item) => toRecommendationCard(locale, item));
}

type CreateEventInput = {
  locale: Locale;
  title: string;
  description: string;
  category: string;
  subtype: string;
  eventAt: string;
  location: string;
  isPublic: boolean;
  accessCode: string;
  checklist: string[];
  bringList: { item: string; owner: string }[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0590-\u05ff]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createEvent(input: CreateEventInput) {
  const slug = slugify(input.title) || `event-${Date.now()}`;

  const demoRecord: EventRecord = {
    id: `event-${slug}`,
    slug,
    title: {
      he: input.title,
      en: input.title,
    },
    description: {
      he: input.description,
      en: input.description,
    },
    category: {
      he: input.category,
      en: input.category,
    },
    subtype: {
      he: input.subtype,
      en: input.subtype,
    },
    eventAt: input.eventAt,
    location: {
      he: input.location,
      en: input.location,
    },
    mapsUrl: "",
    isPublic: input.isPublic,
    accessCode: input.accessCode,
    attendance: {
      confirmed: 0,
      declined: 0,
      maybe: 0,
      checkedIn: 0,
      capacity: 50,
    },
    checklist: input.checklist,
    bringList: input.bringList,
  };

  await createDemoEvent(demoRecord);
  return demoRecord;
}
