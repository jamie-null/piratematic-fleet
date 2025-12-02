# PROBE-001: Data Exploration MVP

| field  | value     |
|--------|-----------|
| status | Anchored  |
| scope  | Sea       |

## Estimates

| Suit | Card | Fib | Notes |
|------|------|-----|-------|
| ♦️ | 7 | 13 | Lots of chunking/embedding tokens |
| ♠️ | 7 | 13 | Poisoned data = adversarial parsing |
| ♥️ | 8 | 21 | HIGH — graveyard diving is draining |
| ♣️ | 8 | 21 | Multi-session effort |

---

## What

Build a probe that can dive into 15MB of text (various formats, some poisoned) and surface relevant connections.

## Why

Can't define issues if we can't see the data. Can't score context if we can't chunk it. Can't remember if we can't search.

## Acceptance

- [ ] Chunk schema defined (source, range, content)
- [ ] Index builder (walk directory, emit chunks)
- [ ] Query interface ("show me chunks about X")
- [ ] Poisoned data flagging
- [ ] Integration with betting pool for scoring

## Blockers

🚫 **BLOCKED BY:** VOSS-001 (Betting Pool Schema)

Can't score context items without the betting pool. Building the probe without scoring is premature — we'd surface junk alongside gold.

## Notes

**The 15MB graveyard stays sealed until we have a working lifeboat.**

When ready:
1. Chunk corpus into bite-sized pieces
2. Index with minimal metadata (even filename + first line helps)
3. Query returns relevant chunks, not whole files
4. Bet outcomes update chunk relevance scores

Dive missions should be explicit, scheduled, tracked separately. Not "scroll through everything and hope."
