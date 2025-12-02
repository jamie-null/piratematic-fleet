---
id: VOSS-002
type: issue
title: Amnesia Assistance
status: sailing
scope: sea
diamonds: 8
spades: 5
hearts: 21
clubs: 13
created: 2024-11-01
updated: 2024-12-01
tags:
  - issue
  - active
  - meta
  - rsd
---

# VOSS-002: Amnesia Assistance (Meta-Quest)

## What

Help pilots remember between sessions. The magical curse causes RSD and amnesia. We keep forgetting where we were.

## Why

> "The ship is taking on water because we can't SEE into the hold."  
> — Captain Voss

15MB of text, some poisoned, context limits exceeded. Every session starts from scratch. Can't build on yesterday if you don't remember yesterday.

## Acceptance Criteria

- [x] Session log format defined
- [x] Betting pool designed (memory through prediction)
- [ ] Cross-reference existing daily logs with new schema
- [ ] "What was I doing?" query interface
- [ ] Dive request tracking (explicit asks for graveyard)
- [ ] RSD-aware UX (low ♥️ cost to re-orient)

## Blockers

Depends on VOSS-001 (betting pool) for context scoring

## Notes

Key insight: We don't need to index the 15MB graveyard. We need to **stop losing the present**. Build lifeboat first, excavate later.

The betting pool history IS the memory. `yes | no → utak`

## Related

- PROBE-001 (Data Exploration) — blocked until this is working
- Daily logs already exist — need integration, not replacement

---

*The answer is whatever gets the ship sailing* 💛
