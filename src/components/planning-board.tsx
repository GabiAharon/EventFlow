"use client";

import { useMemo, useState } from "react";
import { Check, Circle, Eye, Lock, Plus, ShoppingBag, Sparkles } from "lucide-react";

import { type Locale } from "@/lib/site-content";

type PrivateItem = {
  id: string;
  label: string;
  done: boolean;
};

type PublicItem = {
  id: string;
  item: string;
  owner: string;
};

type PlanningBoardProps = {
  locale: Locale;
  privateItems: string[];
  publicItems: Array<{ item: string; owner: string }>;
  title?: string;
  subtitle?: string;
};

function uid(prefix: string, value?: string) {
  if (value) {
    return `${prefix}-${value}`;
  }

  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function PlanningBoard({
  locale,
  privateItems,
  publicItems,
  title,
  subtitle,
}: PlanningBoardProps) {
  const labels = useMemo(
    () =>
      locale === "en"
        ? {
            title: title ?? "Plan the event without losing the thread",
            subtitle:
              subtitle ??
              "Keep private organizer tasks and the public bring list separate, clear, and easy to update.",
            privateTitle: "Private organizer list",
            privateHint: "Only the organizer sees this list",
            privatePlaceholder: "Add an internal task",
            privateCta: "Add task",
            publicTitle: "Guest bring list",
            publicHint: "Guests can see and pick from this list",
            publicItemPlaceholder: "What should someone bring?",
            publicOwnerPlaceholder: "Who brings it? optional",
            publicCta: "Add item",
            openLabel: "Open",
            readyLabel: "ready items",
            addLabel: "New",
          }
        : {
            title: title ?? "מתכננים את האירוע בלי לאבד שליטה",
            subtitle:
              subtitle ??
              "מפרידים בין משימות פנימיות של המארגן לבין מה שהאורחים רואים ומביאים, כדי שהכל יהיה ברור מהרגע הראשון.",
            privateTitle: "רשימת תכנון פנימית",
            privateHint: "רק המארגן רואה את הרשימה הזאת",
            privatePlaceholder: "להוסיף משימה פנימית",
            privateCta: "הוסף משימה",
            publicTitle: "מה האורחים מביאים",
            publicHint: "האורחים רואים את הרשימה ויודעים מה עדיין פתוח",
            publicItemPlaceholder: "מה צריך להביא?",
            publicOwnerPlaceholder: "מי מביא? לא חובה",
            publicCta: "הוסף פריט",
            openLabel: "פתוח",
            readyLabel: "דברים מוכנים",
            addLabel: "חדש",
          },
    [locale, subtitle, title],
  );

  const [privateState, setPrivateState] = useState<PrivateItem[]>(
    privateItems.map((item, index) => ({
      id: uid("private", `${index}-${item}`),
      label: item,
      done: false,
    })),
  );
  const [publicState, setPublicState] = useState<PublicItem[]>(
    publicItems.map((item, index) => ({
      id: uid("public", `${index}-${item.item}-${item.owner}`),
      item: item.item,
      owner: item.owner,
    })),
  );
  const [privateDraft, setPrivateDraft] = useState("");
  const [publicDraft, setPublicDraft] = useState("");
  const [publicOwnerDraft, setPublicOwnerDraft] = useState("");

  const completedCount = privateState.filter((item) => item.done).length;

  const addPrivateItem = () => {
    const value = privateDraft.trim();
    if (!value) {
      return;
    }

    setPrivateState((current) => [
      { id: uid("private"), label: value, done: false },
      ...current,
    ]);
    setPrivateDraft("");
  };

  const addPublicItem = () => {
    const value = publicDraft.trim();
    if (!value) {
      return;
    }

    setPublicState((current) => [
      {
        id: uid("public"),
        item: value,
        owner: publicOwnerDraft.trim() || labels.openLabel,
      },
      ...current,
    ]);
    setPublicDraft("");
    setPublicOwnerDraft("");
  };

  const togglePrivateItem = (id: string) => {
    setPrivateState((current) =>
      current.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  };

  return (
    <section className="grid gap-5">
      <div className="space-y-3">
        <div className="section-kicker">{labels.addLabel}</div>
        <h2 className="font-display text-3xl leading-tight text-stone-950 sm:text-4xl">
          {labels.title}
        </h2>
        <p className="max-w-3xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          {labels.subtitle}
        </p>
      </div>

      <div className="planner-summary">
        <div>
          <div className="planner-summary-label">{labels.readyLabel}</div>
          <div className="planner-summary-value">
            {completedCount}/{privateState.length || 1}
          </div>
        </div>
        <div className="planner-summary-chip">
          <Sparkles className="h-4 w-4" />
          {locale === "en" ? "Simple, split, visible" : "פשוט, מופרד וברור"}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <article className="planner-card planner-card-private">
          <div className="planner-card-head">
            <div>
              <div className="planner-flag planner-flag-private">
                <Lock className="h-4 w-4" />
                {labels.privateTitle}
              </div>
              <div className="planner-card-hint">{labels.privateHint}</div>
            </div>
            <div className="planner-mini-count">{privateState.length}</div>
          </div>

          <div className="planner-form">
            <input
              className="planner-input"
              onChange={(event) => setPrivateDraft(event.target.value)}
              placeholder={labels.privatePlaceholder}
              value={privateDraft}
            />
            <button className="planner-button" onClick={addPrivateItem} type="button">
              <Plus className="h-4 w-4" />
              {labels.privateCta}
            </button>
          </div>

          <div className="grid gap-3">
            {privateState.map((item) => (
              <button
                key={item.id}
                className={`planner-row ${item.done ? "planner-row-done" : ""}`}
                onClick={() => togglePrivateItem(item.id)}
                type="button"
              >
                <span className={`planner-check ${item.done ? "planner-check-done" : ""}`}>
                  {item.done ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                </span>
                <span className="planner-row-copy">{item.label}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="planner-card planner-card-public">
          <div className="planner-card-head">
            <div>
              <div className="planner-flag planner-flag-public">
                <Eye className="h-4 w-4" />
                {labels.publicTitle}
              </div>
              <div className="planner-card-hint">{labels.publicHint}</div>
            </div>
            <div className="planner-mini-count">{publicState.length}</div>
          </div>

          <div className="grid gap-3">
            <div className="planner-form planner-form-stack">
              <input
                className="planner-input"
                onChange={(event) => setPublicDraft(event.target.value)}
                placeholder={labels.publicItemPlaceholder}
                value={publicDraft}
              />
              <input
                className="planner-input"
                onChange={(event) => setPublicOwnerDraft(event.target.value)}
                placeholder={labels.publicOwnerPlaceholder}
                value={publicOwnerDraft}
              />
              <button className="planner-button" onClick={addPublicItem} type="button">
                <ShoppingBag className="h-4 w-4" />
                {labels.publicCta}
              </button>
            </div>

            <div className="grid gap-3">
              {publicState.map((item) => (
                <div key={item.id} className="planner-row planner-row-public">
                  <div className="planner-row-copy">{item.item}</div>
                  <div className="planner-owner-pill">{item.owner}</div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
