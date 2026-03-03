---
title: EventFlow MVP Design
date: 2026-03-03
status: approved-in-chat
---

# EventFlow MVP Design

## Objective

Build a bilingual PWA for fast event creation, RSVP collection, and event-day check-in, with Hebrew as the default language and a premium mobile-first experience.

## Product Scope

The MVP includes three connected product pillars:

1. Event management:
   - organizer onboarding
   - event creation
   - public event pages
   - RSVP flows
   - share links
   - organizer dashboard
   - event-day check-in
2. Structured event knowledge:
   - recommendations for venues and vendors
   - classification by event type and subtype
   - optional pricing context and recommendation sentiment
3. Planning utilities:
   - organizer-only internal checklist
   - guest-visible bring list for shared items

## Key Product Decisions

- Platform: PWA only for v1
- Languages: bilingual with Hebrew as default
- Layout direction: RTL-first, with LTR support for English
- Offline support: check-in only in v1
- Notifications: operational/transactional only in v1
- Event sharing: unique event link as the primary sharing mechanism
- Access model:
  - default: anyone with the link can access
  - optional: invite-only via short access code

## Experience Direction

The interface should feel warm, editorial, and celebratory rather than corporate. The visual language should rely on strong typography, warm tones, layered depth, and deliberate motion. Mobile is the first-class surface.

## Technical Architecture

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- bilingual copy architecture
- RTL-aware UI primitives

### Data and backend

- Supabase Auth with magic link for organizers
- Supabase Postgres for core product data
- Supabase Storage for media
- RLS on every table

### Notifications

- OneSignal web push
- transactional reminders and updates only

### Offline and PWA

- manifest and installability metadata
- service worker with event page caching
- offline fallback UI
- Dexie / IndexedDB for check-in sync queue

## Core Data Domains

- events
- event_questions
- rsvps
- event_categories
- event_subtypes
- vendor_recommendations
- event_checklists
- event_bring_items
- organizer_profiles

## Main User Flows

### Organizer flow

1. Sign in with magic link
2. Complete lightweight onboarding
3. Create event in a guided multi-step flow
4. Share unique event link through WhatsApp, copy link, native share, or QR
5. Track responses and manage the event
6. Use check-in mode on event day

### Guest flow

1. Open event link without installing or signing in
2. Review event details, attendance stats, and bring list
3. Submit RSVP and answers
4. Receive confirmation and calendar actions

### Knowledge flow

1. Organizer chooses event type and subtype
2. App surfaces matching recommendations
3. Organizer can add a new recommendation tied to that topic

## Verification Targets

- responsive behavior on mobile and desktop
- RTL and English rendering
- service worker registration
- installability metadata
- offline check-in queue behavior
- clean type-safe build

## Risks and Boundaries

- full offline create/edit flows are explicitly out of scope for v1
- recommendation media uploads should stay optional to protect free-tier usage
- invite-only is code-based, not per-guest gated authorization

## Post-MVP Opportunities

- richer recommendation discovery
- premium upgrades and export tools
- SMS reminders
- Remotion promo/demo video for launch assets
