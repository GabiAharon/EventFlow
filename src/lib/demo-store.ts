import { promises as fs } from "node:fs";
import path from "node:path";

import type { EventRecord, EventStore, RecommendationRecord } from "@/lib/eventflow-types";

const storePath = path.join(process.cwd(), "data", "eventflow-store.json");

async function readStore(): Promise<EventStore> {
  const raw = await fs.readFile(storePath, "utf8");
  return JSON.parse(raw) as EventStore;
}

async function writeStore(store: EventStore) {
  await fs.writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function getDemoStore() {
  return readStore();
}

export async function getDemoEvents() {
  const store = await readStore();
  return store.events;
}

export async function getDemoRecommendations(): Promise<RecommendationRecord[]> {
  const store = await readStore();
  return store.recommendations;
}

export async function getDemoEventBySlug(slug: string) {
  const store = await readStore();
  return store.events.find((event) => event.slug === slug) ?? null;
}

export async function createDemoEvent(event: EventRecord) {
  const store = await readStore();
  store.events = [event, ...store.events];
  await writeStore(store);
  return event;
}
