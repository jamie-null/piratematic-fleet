# VOSS-001: Betting Pool Schema

| field  | value     |
|--------|-----------|
| status | Sailing   |
| scope  | Pond      |

## Estimates

| Suit | Card | Fib | Notes |
|------|------|-----|-------|
| ♦️ | 5 | 5 | Some LLM iteration to formalize |
| ♠️ | 6 | 8 | AMM logic is genuinely tricky |
| ♥️ | 7 | 13 | High attention — designing incentives |
| ♣️ | 5 | 5 | Bootstrap conversation = most of it |

---

## What

Design and implement the futarchy-inspired betting pool for context scoring.

## Why

The betting pool IS the memory system. Each yes|no resolution grows utak. Without it, we can't score context items, can't prioritize the 15MB corpus, can't remember between sessions.

## Acceptance

- [x] Four suits defined (♦️ tokens, ♠️ tractability, ♥️ attention, ♣️ time)
- [x] Fibonacci card values with Zeckendorf decomposition
- [x] TypeScript schema drafted
- [ ] AMM rules implemented (adjustTimeEstimate, updateCalibration)
- [ ] Bet placement CLI
- [ ] Bet resolution CLI
- [ ] Context scoring integration
- [ ] Storage format decided (JSON lines vs SQLite)

## Notes

See `betting-pool-schema.ts` for current draft.

Key insight from Bone Poem: **Command = Question**. Placing a bet is both asserting you understand AND asking if you do.
