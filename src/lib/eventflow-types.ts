export type Locale = "he" | "en";

export type LocalizedText = {
  he: string;
  en: string;
};

export type BringListItem = {
  item: string;
  owner: string;
};

export type AttendanceSummary = {
  confirmed: number;
  declined: number;
  maybe: number;
  capacity: number;
  checkedIn: number;
};

export type EventRecord = {
  id: string;
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  subtype: LocalizedText;
  eventAt: string;
  location: LocalizedText;
  mapsUrl: string;
  isPublic: boolean;
  accessCode: string;
  attendance: AttendanceSummary;
  checklist: string[];
  bringList: BringListItem[];
};

export type RecommendationRecord = {
  id: string;
  title: LocalizedText;
  category: LocalizedText;
  location: LocalizedText;
  budget: LocalizedText;
  note: LocalizedText;
};

export type EventStore = {
  events: EventRecord[];
  recommendations: RecommendationRecord[];
};

export type EventCardView = {
  slug: string;
  title: string;
  date: string;
  attendance: string;
  mood: string;
};

export type RecommendationCardView = {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: string;
  note: string;
};

export type EventDetailView = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  attendance: string;
  checklist: string[];
  bringList: BringListItem[];
  isPublic: boolean;
  accessCode: string;
};

export type DashboardData = {
  events: EventCardView[];
  recommendations: RecommendationCardView[];
  checklist: string[];
  bringList: BringListItem[];
};
