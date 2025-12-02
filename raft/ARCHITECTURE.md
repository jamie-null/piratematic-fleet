# 🏗️ PIRATEMATIC Architecture

*Three tiers: Data → Bases → Agents*

---

## Overview (Odd = Technical)

**Design Philosophy:**
- Property-first (YAML frontmatter = source of truth)
- Event-driven (agents react to file changes)
- Reactive (Obsidian Bases reflect current state)
- Greppable (JSON lines, not databases)
- Rewritable (files under 500 lines)

**Core Principle:**
> Files want to be rewritten, data wants to be portable

---

## Tier 1: Data Layer (Files + Properties)

### File Types (Odd = Structure)

**Issues** (`issues/issue-[ID].md`)
- YAML frontmatter with estimates per suit
- Markdown body with what/why/acceptance/notes
- Links to related issues and bets
- Status transitions: floating → sailing → anchored → harbored

**Bets** (`bets/bet-[NUM]-[name].md`)
- YAML frontmatter with prediction, suit, stake
- Markdown body with reasoning and context refs
- Resolution section filled when bet settles
- Tags: pending → resolved, won/lost/push/void

**Sessions** (`sessions/SESSION-[NUM].md`)
- YAML frontmatter with timestamp, mood, energy
- Markdown body with summary, decisions, next steps
- Lists of bets placed/resolved this session
- Amnesia mitigation through structured logging

**Contexts** (`contexts/context-[name].md`) *[Future]*
- YAML frontmatter with scores per suit
- Markdown body with source content (excerpt)
- Reliability score updated by bet outcomes
- Last referenced timestamp

**Bases** (`bases/[name].md`) *[Created by Obsidian]*
- Obsidian creates these when you make a Base
- Not manually edited
- Configuration stored in file

### Properties Schema (Odd = Technical)

**Common Properties:**
```yaml
id: string              # Unique identifier
type: string            # issue | bet | session | context
created: date           # ISO 8601
updated: date           # ISO 8601
tags: string[]          # For filtering
```

**Issue-Specific:**
```yaml
title: string
status: string          # floating | sailing | anchored | harbored
scope: string           # pond | lake | sea | ocean
diamonds: number        # 1-12, token cost estimate
spades: number          # 1-12, tractability estimate
hearts: number          # 1-12, attention cost estimate
clubs: number           # 1-12, time cost estimate
actuals:
  diamonds: number      # Actual token cost (filled on completion)
  spades: number        # Actual complexity
  hearts: number        # Actual attention cost
  clubs: number         # Actual time spent
```

**Bet-Specific:**
```yaml
suit: string            # diamonds | spades | hearts | clubs
stake: number           # 1-12 (card rank)
prediction: string      # Natural language
position: string        # over | under | exact | null
overUnder: number       # The line
madeBy: string          # Pilot handle/emoji
madeAt: date
relatedIssue: string    # Issue ID
contextRefs: string[]   # Files that informed bet
outcome: string         # won | lost | push | void
resolvedAt: date
actualValue: number
```

**Session-Specific:**
```yaml
timestamp: datetime     # ISO 8601 with time
mood: string            # Emoji string
energyLevel: string     # low | medium | high
betsPlaced: string[]    # Bet IDs
betsResolved: string[]  # Bet IDs
```

**Context-Specific:** *[Future]*
```yaml
source: string          # File path or URI
reliability: number     # 0-100
scores:
  diamonds: number      # 0-100
  spades: number        # 0-100
  hearts: number        # 0-100
  clubs: number         # 0-100
lastReferencedAt: date
referenceCount: number
```

### Storage Format (Odd = Technical)

**Primary:** Markdown files with YAML frontmatter
- Human-readable
- Version-controllable (git)
- Greppable (ripgrep, fd)
- Obsidian-compatible
- Portable (no vendor lock-in)

**Secondary:** JSON Lines (`.jsonl`) for bet history
- One line per bet resolution
- Append-only (never rewrite)
- Easy to parse for analytics
- Can import to SQLite later if needed

**Example JSONL:**
```json
{"id":"bet-001","suit":"clubs","stake":5,"outcome":"won","actualValue":42,"resolvedAt":"2024-12-01T21:00:00Z"}
{"id":"bet-002","suit":"hearts","stake":4,"outcome":"lost","actualValue":5,"resolvedAt":"2024-12-01T21:05:00Z"}
```

---

## Tier 2: Base Views (Obsidian UI)

### What Are Bases? (Even = Interface)

**Obsidian Bases** = Interactive, filtered tables of markdown files

**Features:**
- Filter by property values
- Display selected properties as columns
- Sort by any column
- Group by property
- Inline editing of some properties
- Drag to sidebar for persistent views

### Base Configurations (Even = Interface)

**Active Issues Base** (`🚧 Active Issues`)
- Filter: `type = "issue" AND (status = "sailing" OR status = "floating")`
- Properties: id, title, status, diamonds, spades, hearts, clubs, updated
- Sort: hearts descending (highest attention cost first)
- Purpose: Main navigation — what needs doing?

**All Issues Base** (`📋 All Issues`)
- Filter: `type = "issue"`
- Properties: id, title, status, scope, updated
- Sort: updated descending
- Purpose: Historical view, find archived issues

**Open Bets Base** (`🎴 Open Bets`)
- Filter: `type = "bet" AND outcome = null`
- Properties: suit, stake, prediction, madeBy, madeAt, relatedIssue
- Group by: suit
- Purpose: What are we tracking?

**Bet History Base** (`📊 Bet History`)
- Filter: `type = "bet" AND outcome != null`
- Properties: suit, stake, outcome, actualValue, resolvedAt
- Sort: resolvedAt descending
- Purpose: Learning from past predictions

**Session Log Base** (`📓 Session Log`)
- Filter: `type = "session"`
- Properties: id, timestamp, mood, energyLevel, summary
- Sort: timestamp descending
- Purpose: Amnesia mitigation — what did we do?

**Context Scores Base** (`🔍 Context Scores`) *[Future]*
- Filter: `type = "context"`
- Properties: source, reliability, diamonds, spades, hearts, clubs
- Sort: reliability descending
- Purpose: Which sources to trust?

### Base Setup Workflow (Even = Process)

**Step 1:** Enable Bases plugin (Settings → Core Plugins)

**Step 2:** Create Base (Command palette → "Create new base")

**Step 3:** Configure filters
- Click "Filters" button
- Add property filters
- Use "Advanced" for complex queries

**Step 4:** Configure properties
- Click "Properties" button
- Check boxes for desired columns
- Reorder by dragging

**Step 5:** Sort and group
- Click column headers to sort
- Use "Group by" dropdown for grouping

**Step 6:** Drag to sidebar (optional)
- Drag Base tab to left/right sidebar
- Becomes persistent panel

---

## Tier 3: Agent Layer (Event-Driven)

### Agent Roles (Odd = Architecture)

**From ACE (Autonomous Cognitive Entity) Framework:**

**Curator Agent**
- Monitors: Bet resolution events
- Reads: `bets/*.md` files when outcome changes
- Writes: `contexts/*.md` files with updated scores
- Logic: If bet won, score UP; if bet lost, score DOWN
- Pay mechanism: Costs Bits to run (tracks token usage)

**Reflector Agent**
- Monitors: Bet resolution events
- Reads: Bet history, pilot profiles
- Writes: Calibration updates, session insights
- Logic: Calculate actual/predicted ratios, adjust factors
- Output: "You're 1.5x optimistic on time" insights

**Generator Agent**
- Monitors: Session start events, issue creation
- Reads: Active issues, context scores
- Writes: Proposed bets, suggested next steps
- Logic: Based on patterns, suggest what to bet on
- Output: "Bet this will take longer than you think"

**Adjudicator Agent**
- Monitors: Manual triggers, scheduled runs
- Reads: Resolved issues, open bets
- Writes: Bet outcome updates, issue actuals
- Logic: Match issue completion to related bets
- Output: Auto-resolve deterministic bets

### Event Stream (Odd = Architecture)

**Event Types:**
```typescript
type Event =
  | { type: 'bet_placed', bet: Bet }
  | { type: 'bet_resolved', bet: Bet, outcome: Outcome }
  | { type: 'issue_created', issue: Issue }
  | { type: 'issue_updated', issue: Issue, changes: Delta }
  | { type: 'session_started', session: SessionLog }
  | { type: 'session_ended', session: SessionLog }
  | { type: 'context_referenced', context: ContextItem, by: Bet }
  | { type: 'calibration_drift', pilot: string, suit: Suit, delta: number }
```

**Event Sources:**
- File system watcher (new files, edits)
- Manual triggers (CLI commands)
- Scheduled jobs (daily rollup)
- User actions (via UI/scripts)

**Event Handlers:**
- Agents subscribe to event types
- React asynchronously
- Write new files or update existing
- Emit new events (cascading)

### Implementation Strategy (Odd = Technical)

**Phase 1: Manual** (Current)
- Human places bets manually
- Human resolves bets manually
- Human updates context scores in notes
- Agents = future

**Phase 2: CLI Tools** (Next)
- `bet-place.ts` — Interactive bet creation
- `bet-resolve.ts` — Interactive bet resolution
- `context-update.ts` — Update scores from bet
- Agents = scripts

**Phase 3: Watchers** (Later)
- File watcher detects new bet resolutions
- Auto-trigger context score updates
- Auto-generate calibration reports
- Agents = background processes

**Phase 4: Full Agents** (Future)
- Curator/Reflector/Generator/Adjudicator
- Event-driven architecture
- Multi-agent coordination
- Agents = autonomous

### Tech Stack (Odd = Technical)

**Current (Raft):**
- TypeScript for schemas
- Markdown + YAML for data
- Obsidian for UI
- Manual workflows

**Planned (Dinghy → Sloop):**
- Deno for runtime (secure, modern)
- Zod for validation
- Chokidar for file watching
- LLM API for agent cognition

**Future (Brigantine+):**
- SQLite for analytics
- Vector DB for semantic search
- LSH for clustering (port from Ratty)
- Web UI for non-Obsidian access

---

## Integration Points (Odd = Technical)

### Obsidian ↔ Agents

**Read Path:**
- Agents read markdown files
- Parse YAML frontmatter
- Validate against Zod schemas
- Process markdown body (optional)

**Write Path:**
- Agents generate markdown strings
- Include YAML frontmatter
- Write atomically (temp file → rename)
- Let Obsidian pick up changes

**Conflict Resolution:**
- Last write wins (simple)
- Agents only append new files (safer)
- Manual edits take precedence
- Lock files for multi-step updates (future)

### Futarchy ↔ Bases

**Property Mapping:**
- Suit estimates → numeric properties
- Card ranks → stored as Fibonacci values
- Displayed in Base with rank labels
- Computed fields show "♦️6 (8 units)"

**Zeckendorf Display:**
- Store: `debt = 21`
- Compute: `zeckendorf(21) = [13, 8]`
- Display: `♠️7 + ♠️6` or `21 units`
- UI shows decomposition on hover (future)

### Bases ↔ Daily Logs

**Cross-Reference:**
- Daily logs have date property
- Session logs reference daily log date
- Base filter: `date = today()`
- Shows sessions from same day

**Bidirectional Linking:**
- Daily log links to session: `[[SESSION-002]]`
- Session log links back: `Related: [[Daily Notes/2024-12-01]]`
- Obsidian graph view shows connections

---

## Data Flow (Odd = Process)

### Typical Session Flow

**1. Start Session**
```
User opens Obsidian
  → Reads NEXT_SESSION_START_HERE.md
  → Opens "Active Issues" Base
  → Sees what's floating/sailing
```

**2. Pick Issue**
```
User clicks issue in Base
  → Reads issue file
  → Understands what/why/acceptance
  → Decides to work on it
```

**3. Place Bet**
```
User copies bet-template.md
  → Fills prediction, suit, stake
  → Saves to bets/ directory
  → Obsidian Base updates (shows new bet)
```

**4. Do Work**
```
User works on issue
  → Writes code / docs
  → Takes notes on surprises
  → Tracks actual time/tokens/complexity
```

**5. Resolve Bet**
```
User edits bet file
  → Fills resolution section
  → Updates outcome, actualValue
  → Changes tags: pending → resolved, won/lost
  → Obsidian Base updates (bet moves to history)
```

**6. Update Calibration** *[Manual for now]*
```
User notes in session log:
  "Lost bet-001: underestimated time by 2x
   clubs calibration should increase"
```

**7. Log Session**
```
User creates SESSION-00X.md
  → Summary, decisions, next steps
  → List of bets placed/resolved
  → Mood, energy level
  → Obsidian Base updates (shows new session)
```

**8. End Session**
```
User reads NEXT_SESSION_START_HERE.md
  → Updates it for next session
  → Closes loop
```

### Agent-Augmented Flow (Future)

**Same as above, plus:**

**After Step 5 (Resolve Bet):**
```
File watcher detects bet resolution
  → Curator agent triggers
  → Reads bet, finds contextRefs
  → Updates context scores
  → Writes updated context files
  → Reflector agent triggers
  → Calculates calibration drift
  → Writes calibration report
```

**After Step 7 (Log Session):**
```
Generator agent triggers
  → Reads session log
  → Analyzes bet patterns
  → Generates proposed bets for next session
  → Writes suggestions to inbox
```

---

## Scaling Strategy (Odd = Technical)

### Small Scale (Raft/Dinghy)

**10-100 files:**
- Manual workflows
- Obsidian Bases for UI
- Scripts for repetitive tasks
- Human in the loop for all bets

### Medium Scale (Sloop/Schooner)

**100-1000 files:**
- CLI tools for bet lifecycle
- File watchers for auto-updates
- Simple agents (Curator only)
- Batch processing for analytics

### Large Scale (Brigantine/Galleon)

**1000+ files:**
- SQLite for analytics
- Vector DB for semantic search
- Full multi-agent system
- Web UI for visualization
- Scheduled jobs for rollups

---

## Failure Modes & Mitigations (Even = Safety)

**File Conflicts:**
- Mitigation: Atomic writes (temp → rename)
- Fallback: Manual merge

**Schema Drift:**
- Mitigation: Zod validation on read
- Fallback: Warn on invalid, don't crash

**Broken References:**
- Mitigation: Validate relatedIssue exists
- Fallback: Show warning, don't block

**Infinite Loops:**
- Mitigation: Event deduplication
- Fallback: Circuit breaker (max N events/minute)

**Data Loss:**
- Mitigation: Git versioning
- Fallback: Obsidian sync, backups

**Agent Runaway:**
- Mitigation: Token budget per agent
- Fallback: Manual approval for high-cost ops

---

## Design Principles (Even = Philosophy)

**Greppable > Clever:**
- Prefer JSON lines over databases
- Prefer markdown over binary formats
- Prefer flat files over nested structures

**Rewritable > Patchable:**
- Files under 500 lines
- Whole-file rewrites over patches
- Fresh starts over migrations

**Property-First:**
- YAML frontmatter = source of truth
- Obsidian reads properties
- Agents write files
- UI reflects data

**Event-Driven:**
- Agents react, don't poll
- File changes = events
- Async, not blocking

**Human-in-the-Loop:**
- Agents suggest, humans decide
- Bet resolution requires judgment
- Override always possible

**Fail-Safe:**
- Invalid data → warn, don't crash
- Missing files → degrade gracefully
- Agent errors → log, continue

---

💛 ! START
