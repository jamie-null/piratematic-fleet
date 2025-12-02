---
id: VOSS-001
type: issue
title: Betting Pool Schema
status: sailing
scope: pond
diamonds: 5
spades: 8
hearts: 13
clubs: 5
created: 2024-11-01
updated: 2024-12-01
tags:
  - issue
  - active
  - futarchy
---

# VOSS-001: Betting Pool Schema

## What

Design and implement the futarchy-inspired betting pool for context scoring.

## Why

The betting pool IS the memory system. Each yes|no resolution grows utak. Without it, we can't score context items, can't prioritize the 15MB corpus, can't remember between sessions.

## Acceptance Criteria

- [x] Four suits defined (♦️ tokens, ♠️ tractability, ♥️ attention, ♣️ time)
- [x] Fibonacci card values with Zeckendorf decomposition
- [x] TypeScript schema drafted
- [ ] AMM rules implemented (adjustTimeEstimate, updateCalibration)
- [ ] Bet placement workflow
- [ ] Bet resolution workflow
- [ ] Context scoring integration
- [ ] Storage format decided (JSON lines vs SQLite)

## Notes

See `betting-pool-schema.ts` for current draft.

Key insight from Bone Poem: **Command = Question**. Placing a bet is both asserting you understand AND asking if you do.

## Related

- Blocks: PROBE-001 (Data Exploration)
- Depends on: VOSS-002 (Amnesia Assistance)

---

*Files want to be rewritten* 🦋
