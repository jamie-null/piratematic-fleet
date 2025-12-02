# 🎴 Bet File Schema

*Command = Question — Every bet is both an assertion and a query*

---

## Core Properties (Required)

```yaml
id: string              # Unique identifier (e.g., "bet-001")
type: "bet"             # Always "bet" for betting pool entries
suit: string            # diamonds | spades | hearts | clubs
stake: number           # Card rank 1-12 (maps to Fibonacci values)
prediction: string      # Natural language statement of what you're betting on
madeAt: string          # ISO date (YYYY-MM-DD)
madeBy: string          # Pilot emoji/handle (e.g., "💜", "FD", "ANR")
tags: string[]          # Array of tags for filtering
```

## Optional Properties

```yaml
position: string        # "over" | "under" | "exact" | null
overUnder: number       # The line if this is an over/under bet
relatedIssue: string    # Issue ID this bet relates to (e.g., "VOSS-001")
contextRefs: string[]   # Files/contexts that informed this bet
notes: string           # Additional context or reasoning
```

## Resolution Properties (Filled when bet resolves)

```yaml
resolvedAt: string      # ISO date when bet was settled
outcome: string         # "won" | "lost" | "push" | "void"
actualValue: number     # What actually happened (for over/under bets)
resolutionNotes: string # Why it resolved this way
```

---

## Suit Meanings

| Suit | Emoji | Tracks | Pilot |
|------|-------|--------|-------|
| diamonds | ♦️ | Token costs — prediction accuracy | Applejack |
| spades | ♠️ | Technical tractability vs innovation | Rarity |
| hearts | ♥️ | Human attention costs vs progress | Fluttershy |
| clubs | ♣️ | Time costs vs progress | Rainbow Dash |

---

## Fibonacci Card Values

| Card | Fib Value | Meaning |
|------|-----------|---------|
| 1 | 1 | Trivial |
| 2 | 1 | Tiny |
| 3 | 2 | Small |
| 4 | 3 | Minor |
| 5 | 5 | Medium |
| 6 | 8 | Significant |
| 7 | 13 | Large |
| 8 | 21 | Major |
| 9 | 34 | Epic |
| 10 | 55 | Quest-tier |
| 11 | 89 | Arc-tier |
| 12 | 144 | Campaign-tier |

---

## Example: Simple Time Bet

```yaml
---
id: bet-001
type: bet
suit: clubs
stake: 5
prediction: "Formalizing TypeScript types will take under 5 time units"
position: under
overUnder: 5
madeAt: 2024-12-01
madeBy: 💜
relatedIssue: VOSS-001
contextRefs:
  - betting-pool-schema.ts
  - PRODUCT_REQUIREMENTS.md
tags:
  - bet
  - pending
  - clubs
---

# Bet 001: ♣️ TypeScript Schema Time

## Prediction

Formalizing the TypeScript types into a clean, documented schema will take **under 5 time units** (Fibonacci value: 5).

## Reasoning

- Already have `betting-pool-schema.ts` drafted
- Just need to clean it up and add Zod validators
- Most design decisions already made in brainstorm

## Context Used

- Existing betting-pool-schema.ts file
- Product requirements doc
- Previous session notes

## Stakes

♣️5 (5 Fibonacci time units)

---

*Waiting for resolution...*
```

---

## Example: Attention Cost Bet

```yaml
---
id: bet-002
type: bet
suit: hearts
stake: 7
prediction: "Setting up first Obsidian Base will be high attention cost"
position: over
overUnder: 8
madeAt: 2024-12-01
madeBy: 💜
relatedIssue: VOSS-002
tags:
  - bet
  - pending
  - hearts
---

# Bet 002: ♥️ Base Setup Attention

## Prediction

Setting up the first Obsidian Base with proper filters and properties will require **more than 8** attention units (Fibonacci).

## Reasoning

- Never used Bases before
- Need to learn the UI
- Might need multiple attempts to get filters right
- RSD makes learning new tools draining

## Stakes

♥️7 (13 Fibonacci attention units)

---

*Waiting for resolution...*
```

---

## Example: Resolved Bet (Won)

```yaml
---
id: bet-003
type: bet
suit: diamonds
stake: 4
prediction: "Creating fresh issue files will cost under 500 tokens"
position: under
overUnder: 500
madeAt: 2024-12-01
madeBy: 💜
relatedIssue: VOSS-002
resolvedAt: 2024-12-01
outcome: won
actualValue: 342
resolutionNotes: "Three files created, total 342 tokens. Won the bet!"
tags:
  - bet
  - resolved
  - won
  - diamonds
---

# Bet 003: ♦️ Issue File Creation Cost

## Prediction

Creating three fresh issue files with proper YAML frontmatter will cost **under 500 tokens**.

## Resolution

✅ **WON** — Actual cost: 342 tokens

## Context Updates

Files that informed this bet:
- `VOSS-001.md` → score UP in diamonds
- `betting-pool-schema.ts` → score UP in diamonds

---

*Bet settled 2024-12-01*
```

---

## Example: Resolved Bet (Lost)

```yaml
---
id: bet-004
type: bet
suit: spades
stake: 6
prediction: "AMM calibration logic is straightforward"
position: under
overUnder: 8
madeAt: 2024-12-01
madeBy: 💜
relatedIssue: VOSS-001
resolvedAt: 2024-12-02
outcome: lost
actualValue: 13
resolutionNotes: "More complex than expected - edge cases with Zeckendorf decomposition"
tags:
  - bet
  - resolved
  - lost
  - spades
---

# Bet 004: ♠️ AMM Complexity

## Prediction

Implementing the AMM calibration logic will be **straightforward** (under 8 tractability units).

## Resolution

❌ **LOST** — Actual complexity: 13 (Large)

Underestimated the edge cases around:
- Non-consecutive Fibonacci constraint
- Rounding errors in calibration drift
- Handling void bets vs pushes

## Learning

Next time I bet on "straightforward," add +1 card rank to account for hidden complexity.

## Calibration Update

Spades calibration factor: 1.0 → 1.15 (I'm 15% optimistic on technical tractability)

---

*Bet settled 2024-12-02*
```

---

## Storage Format

**Recommended:** JSON Lines (`.jsonl`)

Each bet resolution appends one line to `bets.jsonl`:

```json
{"id":"bet-001","suit":"clubs","stake":5,"outcome":"won","actualValue":4,"resolvedAt":"2024-12-01"}
{"id":"bet-002","suit":"hearts","stake":7,"outcome":"lost","actualValue":13,"resolvedAt":"2024-12-01"}
```

**Why JSONL?**
- Greppable (one line = one bet)
- Appendable (no rewriting entire file)
- Easy to import into SQLite later if needed
- Timestamped naturally (last line = most recent)

---

## Validation Rules (Odd for Technical)

**Data Integrity:**
- `suit` must be one of four valid suits
- `stake` must be 1-12
- `outcome` must be won/lost/push/void if present

**Constraint Checks:**
- Cannot resolve bet without `actualValue`
- `resolvedAt` must be >= `madeAt`

**Reference Integrity:**
- `relatedIssue` should exist
- `contextRefs` files should be findable

**Business Logic:**
- Void bets don't affect calibration
- Push bets refund stake, don't update scores

**State Transitions:**
- pending → resolved (normal)
- pending → void (cancellation)

---

💛 ! START
