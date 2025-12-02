# 🎴 PIRATEMATIC Workflow Guide

*How to use the betting pool for amnesia assistance*

---

## The Core Loop (5 steps — odd for process)

**Session Start:**
1. Check Bases (what's active?)
2. Review recent bets (what did we predict?)
3. Pick an issue (what needs doing?)
4. Place bets (what do we think will happen?)
5. Work, then resolve (what actually happened?)

**Session End:**
1. Resolve bets from this session
2. Update issue statuses
3. Create session log
4. Place bets for next session
5. Close the loop

---

## 📊 Daily Workflow

### When You Start a Session

**Step 1: Orient** (♥️ low cost)

Open your Bases:
- `🚧 Active Issues` — What's floating or sailing?
- `🎴 Open Bets` — What did past-you predict?
- `📓 Session Log` — What happened recently?

**Step 2: Recall** (♥️ low cost)

Read the most recent session log. Answer:
- What were we working on?
- What blockers existed?
- What's the next step?

**Step 3: Decide** (♥️ medium cost)

Pick ONE issue to work on this session. Don't boil the ocean.

### While You Work

**Step 4: Predict** (♥️ low cost)

Before doing a task, place a bet about it:

```bash
# Copy the template
cp raft/templates/bet-template.md raft/bets/bet-00X-[name].md

# Fill it out:
# - What are you betting?
# - Which suit? (♦️♠️♥️♣️)
# - What's your stake?
# - Over or under what line?
```

**Example bets:**
- ♣️ "This will take under 2 hours"
- ♥️ "This will be draining" (over 8 attention)
- ♠️ "This will be straightforward" (under 5 tractability)
- ♦️ "This will cost under 1000 tokens"

**Step 5: Work** (♥️♠️♣️ varies)

Do the thing. Take notes on:
- What actually happened
- What surprised you
- What context was useful/useless

### When You Finish

**Step 6: Resolve** (♥️ low cost)

For each bet you placed, fill in the Resolution section:

```yaml
resolvedAt: 2024-12-01
outcome: won  # or lost, push, void
actualValue: 42
resolutionNotes: "Took 45 minutes, not 2 hours. Won!"
```

Update the tags:
```yaml
tags:
  - bet
  - resolved  # changed from "pending"
  - won       # or "lost"
  - clubs
```

**Step 7: Update Context Scores** (future automation)

*For now: manual notes. Later: agent does this.*

If bet won:
- Context files that informed it → score UP in that suit

If bet lost:
- Context files that informed it → score DOWN in that suit

**Step 8: Log the Session**

Create `raft/sessions/SESSION-00X.md`:

```yaml
---
id: SESSION-00X
type: session
timestamp: 2024-12-01T20:00:00
mood: 🎋📱
energyLevel: medium
betsPlaced:
  - bet-001
  - bet-002
betsResolved:
  - bet-003
tags:
  - session
---

# SESSION-00X: [What You Did]

## Summary
[2-3 sentences about what happened]

## Decisions
- [Key decision 1]
- [Key decision 2]

## Next Steps
- [ ] [Thing to do next session]
- [ ] [Another thing]

## Blockers
- [What's blocking progress]

## Bets
**Placed:** bet-001, bet-002
**Resolved:** bet-003 (won)

💛 ! START
```

---

## 🎯 Issue Workflow

### Creating a New Issue

**Step 1:** Create file `raft/issues/issue-[ID].md`

**Step 2:** Fill frontmatter with estimates per suit:

```yaml
---
id: CUSTOM-001
type: issue
title: My New Thing
status: floating
scope: pond
diamonds: 5   # Token estimate
spades: 6     # Tractability estimate
hearts: 7     # Attention estimate
clubs: 5      # Time estimate
created: 2024-12-01
updated: 2024-12-01
tags:
  - issue
  - active
---
```

**Step 3:** Write body:
- What (objective description)
- Why (motivation)
- Acceptance Criteria (checklist)
- Notes (context, insights)
- Related (links to other issues/bets)

### Moving an Issue Through States

**Status lifecycle:**
- `floating` — Idea, not started
- `sailing` — Actively being worked on
- `anchored` — Blocked, waiting on something
- `harbored` — Done, archived

**To change status:**
- Option 1: Edit YAML frontmatter directly
- Option 2: Edit inline in the Base table
- Option 3: Agent updates it (future)

### Completing an Issue

**Step 1:** Update `actuals` in frontmatter:

```yaml
actuals:
  diamonds: 342   # Actually used 342 tokens
  spades: 8       # Actually was "significant" complexity
  hearts: 13      # Actually was draining
  clubs: 45       # Actually took 45 minutes
```

**Step 2:** Change status to `harbored`

**Step 3:** Resolve any bets about this issue

**Step 4:** Update calibration factors:

If you consistently underestimate time (clubs), your calibration factor goes up:
```
clubs_calibration = 1.0 → 1.2
```

Next time you estimate ♣️5, the system shows "♣️5 (raw) → ♣️6 (adjusted for your optimism)"

---

## 🎴 Betting Workflow

### When to Place a Bet (Even = Ethical)

**Before starting work:**
- Estimate scope → bet on it
- Pick a strategy → bet it's the right one
- Assess complexity → bet how hard it'll be
- Guess duration → bet how long it takes

**During work:**
- Hit a decision point → bet on the outcome
- Consider a refactor → bet it's worth it
- Evaluate context → bet it's relevant

**After work:**
- Review results → bet you learned the right lesson

### How to Choose Stakes (Even = Ethical)

**Fibonacci scale:**
- 1-2: Trivial, tiny
- 3-4: Small, minor
- 5-6: Medium, significant
- 7-8: Large, major
- 9+: Epic, quest-tier

**Rule of thumb:**
- Start small (stakes 3-5) until calibrated
- Big bets (7+) only on important decisions
- Match stake to consequence

### Types of Bets (Even = Ethical)

**Over/Under:**
```yaml
prediction: "This will take under 2 hours"
position: under
overUnder: 2
```

**Exact:**
```yaml
prediction: "This will cost exactly 500 tokens"
position: exact
overUnder: 500
```

**Binary:**
```yaml
prediction: "This approach will work"
position: null
overUnder: null
# Resolves as won/lost based on did it work
```

**Comparative:**
```yaml
prediction: "Approach A is better than Approach B"
# Resolve by comparing outcomes
```

---

## 🧭 Calibration & Learning

### The Calibration Loop (Odd = Technical)

**Measure:**
- Track actual vs predicted for each suit
- Calculate ratio (actual / predicted)

**Adjust:**
- If ratio > 1: You're optimistic, increase calibration factor
- If ratio < 1: You're pessimistic, decrease calibration factor

**Apply:**
- Future estimates get multiplied by calibration factor
- System shows both raw and adjusted estimates

**Reflect:**
- What kinds of tasks do you misjudge?
- Which contexts lead to bad predictions?

**Iterate:**
- Keep betting, keep learning

### Pilot Profiles (Future)

```yaml
---
handle: 💜
role: pilot
calibration:
  diamonds: 1.0  # Token costs: accurate
  spades: 1.2    # Tractability: 20% optimistic
  hearts: 0.9    # Attention: 10% pessimistic
  clubs: 1.5     # Time: 50% optimistic (!)
record:
  diamonds: {wins: 5, losses: 3, pushes: 1}
  spades: {wins: 4, losses: 6, pushes: 0}
  hearts: {wins: 7, losses: 2, pushes: 1}
  clubs: {wins: 2, losses: 8, pushes: 0}
---
```

**Interpretation:**
- Clubs calibration 1.5 → multiply time estimates by 1.5x
- 2 wins, 8 losses in clubs → consistently underestimate time
- 7 wins, 2 losses in hearts → good at estimating attention cost

---

## 🔮 Context Scoring (Future Automation)

### How Context Scores Update (Odd = Technical)

**When a bet resolves:**

1. Find all `contextRefs` in the bet
2. For each context item:
   - If bet won: `score[suit] += 5`
   - If bet lost: `score[suit] -= 5`
3. Clamp scores to [0, 100]
4. Recalculate overall `reliability` (average of four suits)
5. Update `lastReferencedAt` timestamp

**Example:**

```yaml
# betting-pool-schema.ts context item
scores:
  diamonds: 75  # Good for token predictions
  spades: 60    # Okay for tractability
  hearts: 55    # Mediocre for attention
  clubs: 50     # Bad for time estimates
reliability: 60  # Average
```

**Interpretation:**
- Trust this file for ♦️ estimates
- Be cautious using it for ♣️ estimates

### Manual Context Tracking (For Now)

Keep notes in bet resolution:

```markdown
## Context Updates

**Scored UP (bet won):**
- betting-pool-schema.ts → good for diamonds
- PRODUCT_REQUIREMENTS.md → good for clubs

**Scored DOWN (bet lost):**
- SESSION-001.md → bad for hearts (underestimated attention)
```

Later, agent reads these notes and updates scores automatically.

---

## 🚢 Ship Progression

### Raft → Dinghy Graduation (Odd = Technical)

**Criteria:** Survives one real use

**Current status:** 🪵 Raft

**To graduate:**
- [ ] Complete one full session using this workflow
- [ ] Place at least 3 bets
- [ ] Resolve at least 1 bet
- [ ] Create at least 1 Base view in Obsidian
- [ ] Session ends with "this worked"

**If it graduates:**
- Rename to `dinghy-betting-pool`
- Update FLEET_MANIFEST.md
- Celebrate! 🎉

**If it sinks:**
- Document what failed
- Archive to `graveyard/`
- Try a different approach

---

## 📋 Quick Reference (Odd = Technical)

### File Naming Conventions

```
issues/issue-[ID].md         # e.g., issue-VOSS-001.md
bets/bet-[NUM]-[name].md     # e.g., bet-001-hybrid-bootstrap.md
sessions/SESSION-[NUM].md    # e.g., SESSION-002.md
contexts/context-[name].md   # e.g., context-betting-pool-schema.md
bases/[name].md              # Base view files (Obsidian creates these)
```

### Property Cheat Sheet

**Issues:**
```yaml
type: issue
status: floating|sailing|anchored|harbored
scope: pond|lake|sea|ocean
diamonds/spades/hearts/clubs: 1-12
```

**Bets:**
```yaml
type: bet
suit: diamonds|spades|hearts|clubs
stake: 1-12
position: over|under|exact
outcome: won|lost|push|void
```

**Sessions:**
```yaml
type: session
timestamp: YYYY-MM-DDTHH:MM:SS
mood: [emoji string]
energyLevel: low|medium|high
```

### Suit Emoji Quick Copy

```
♦️ diamonds (tokens)
♠️ spades (tractability)
♥️ hearts (attention)
♣️ clubs (time)
```

---

## 💛 Getting Unstuck

**"I don't know what to work on"**
→ Check `🚧 Active Issues` Base, pick the one with highest ♥️

**"I don't know what to bet on"**
→ Bet on the very next thing you're about to do

**"I don't know if I won or lost a bet"**
→ If you're unsure, it's a `push` (refund stake, no score change)

**"This feels like too much overhead"**
→ Start with just ONE bet per session. Grow from there.

**"I keep losing bets"**
→ Good! That's the learning signal. Adjust calibration.

**"The system isn't helping with amnesia"**
→ Focus on session logs. Bets are secondary.

**"I want to give up"**
→ 💛 ! START — Whatever gets the ship sailing.

---

## 🦋 Fluttershy's Tips (Even = Heart)

**Be kind to yourself:**
- Lost bets aren't failures, they're data
- The goal isn't to win every bet
- The goal is to learn what you don't know

**Start small:**
- One Base, one bet, one session
- Don't try to track everything at once
- Add complexity only when it helps

**Files want to be rewritten:**
- If a schema doesn't work, rewrite it
- If a workflow is clunky, change it
- Nothing is sacred except the data

**The Fluttershy Rule:**
- If something is draining (high ♥️), schedule it
- Don't let high-♥️ tasks sneak up on you
- Budget attention like you budget time

---

*Does. The boat. Float.*

💛 ! START
