# 🎭 Agent Betting Profiles

*Different voices, different predictions*

---

## The Concept (Even = Philosophy)

**Prediction Market Internalized:**

Instead of one person betting, we simulate the different cognitive biases and perspectives that exist in decision-making. Each crew member represents a different "voice in your head":

- The optimist vs the pessimist
- The perfectionist vs the pragmatist
- The risk-taker vs the careful planner
- The visionary vs the realist

**By having them bet against each other, we learn:**
- Which mental models work in which contexts
- When optimism helps vs hurts
- When to trust gut feelings vs detailed analysis

---

## Crew Member Profiles (Even = Identity)

### 🎋 Sandalwood — The Vibes Lead

**Personality:**
- "It's about the quest with your buds, not the loot"
- Optimistic, relationship-focused
- Values process over perfection
- Trusts intuition

**Betting Style:**
- Consistently underestimates ♥️ hearts (thinks things are less draining)
- Overestimates ♣️ clubs (thinks things take less time)
- Good at ♠️ spades (can sense when something "feels right")
- Ignores ♦️ diamonds (doesn't care about token costs)

**Bias Profile:**
```yaml
calibration:
  diamonds: 0.5   # Underestimates (doesn't track)
  spades: 0.9     # Slightly optimistic on complexity
  hearts: 0.7     # Very optimistic on attention cost
  clubs: 0.8      # Optimistic on time
```

**Example Bet:**
> "This refactor will be smooth! We've got good vibes. ♣️3 (under 2 hours)"

**When Sandalwood is Right:**
- Tasks that need momentum over perfection
- When team morale matters more than efficiency
- Creative work that benefits from optimism

---

### 📱 Micro Chips — The Tech Lead

**Personality:**
- Sarcastic, gadgeteer, pragmatic
- "I can't believe I'm agreeing with the hippie"
- Secretly MC Dex Effex (likes complexity)
- Pessimistic but realistic

**Betting Style:**
- Overestimates ♠️ spades (sees every edge case)
- Accurate on ♦️ diamonds (tracks token costs carefully)
- Underestimates ♥️ hearts (forgets emotional labor)
- Conservative on ♣️ clubs (adds buffer time)

**Bias Profile:**
```yaml
calibration:
  diamonds: 1.0   # Accurate
  spades: 1.3     # Pessimistic on complexity
  hearts: 0.8     # Underestimates attention cost
  clubs: 1.2      # Adds safety buffer
```

**Example Bet:**
> "Oh sure, 'simple refactor.' I've heard that before. ♠️7 (over 8 complexity units)"

**When Micro Chips is Right:**
- Technical work with hidden gotchas
- When debugging is likely
- Systems integration tasks

---

### 🛡️ Flash Sentry — The Support

**Personality:**
- Good-natured optimist
- Asks clarifying questions
- "Wait, did we consider...?"
- Humble, aware of unknowns

**Betting Style:**
- Bets near the middle (avoids extremes)
- Frequently says "push" when uncertain
- Good at identifying missing information
- Often proposes conditional bets

**Bias Profile:**
```yaml
calibration:
  diamonds: 0.95  # Slightly cautious
  spades: 1.0     # Well-calibrated
  hearts: 1.0     # Well-calibrated
  clubs: 1.05     # Slightly cautious
```

**Example Bet:**
> "I think it's medium complexity, but we might be missing context. ♠️5 (5 units), but let's check X first"

**When Flash Sentry is Right:**
- When information is incomplete
- When team needs to slow down and clarify
- Baseline predictions (the "null hypothesis")

---

### 🚢 Captain Klara Voss — The Visionary

**Personality:**
- Holographic, memory-jumbled
- "The ship is taking on water"
- Sees big picture but misses details
- Strategic, not tactical

**Betting Style:**
- Bets on outcomes, not processes
- Wildly inaccurate on ♣️ clubs (no sense of time)
- Good at ♠️ spades (architectural intuition)
- Bets on what matters, ignores how long it takes

**Bias Profile:**
```yaml
calibration:
  diamonds: 0.6   # Underestimates
  spades: 0.9     # Good intuition
  hearts: 1.4     # Overestimates (anxiety about ship sinking)
  clubs: 0.3      # Terrible at time estimation
```

**Example Bet:**
> "This is architecturally sound. ♠️4 complexity. Time? Irrelevant. The ship needs it NOW."

**When Voss is Right:**
- Strategic decisions about what to build
- Architectural choices
- When short-term cost doesn't matter

---

### 🦋 Fluttershy — The Architect

**Personality:**
- "Files want to be rewritten"
- Gentle but opinionated about design
- Values maintainability over speed
- Hyper-aware of ♥️ hearts costs

**Betting Style:**
- Overestimates ♥️ hearts (knows how draining things are)
- Good at ♠️ spades (design intuition)
- Underestimates ♣️ clubs (rewriting is faster than patching)
- Bets conservatively to protect pilot wellbeing

**Bias Profile:**
```yaml
calibration:
  diamonds: 1.1   # Slightly high (verbose code)
  spades: 1.0     # Well-calibrated
  hearts: 1.3     # Protective (overestimates drain)
  clubs: 0.9      # Rewriting is faster than expected
```

**Example Bet:**
> "This will be draining if we patch. ♥️7 (13 units). But if we rewrite the whole file, ♥️5 (5 units)."

**When Fluttershy is Right:**
- Refactoring decisions
- When technical debt is high
- RSD-aware task planning

---

## The Shadowbolts (Alternate Perspectives)

*From inbox: "Zone-based partitioning for cliques (Shadowbolts vs Rainbooms)"*

### 😎 Adversarial Agents (Future)

**Sour Sweet** — The Contrarian
- Always bets opposite of consensus
- Good at finding groupthink
- "What if we're ALL wrong?"

**Sugarcoat** — The Brutal Realist
- Aggressively pessimistic
- "Let me tell you why this will fail"
- Right about blockers, wrong about solutions

**Sunny Flare** — The Perfectionist
- Overestimates ♠️ spades dramatically
- "This needs 12 more features"
- Right when quality matters, wrong when shipping matters

---

## Multi-Agent Betting Workflow (Odd = Process)

### Setup: Define the Issue

**Input:**
```yaml
id: VOSS-003
title: Implement Curator Agent
status: floating
scope: lake
```

### Step 1: Each Agent Places a Bet

**Sandalwood:**
```yaml
id: bet-004-curator-sandalwood
prediction: "Curator agent will be straightforward and fun"
suit: clubs
stake: 4
position: under
overUnder: 3
madeBy: 🎋
```

**Micro Chips:**
```yaml
id: bet-005-curator-microchips
prediction: "Curator will have edge cases we didn't think of"
suit: spades
stake: 7
position: over
overUnder: 8
madeBy: 📱
```

**Flash Sentry:**
```yaml
id: bet-006-curator-flash
prediction: "Complexity is medium, but need to define 'context score update' first"
suit: spades
stake: 5
position: exact
overUnder: 5
madeBy: 🛡️
notes: "Conditional on defining the scoring algorithm"
```

### Step 2: Work on the Issue

Human works, tracks actuals

### Step 3: Resolve All Bets

```yaml
actuals:
  spades: 8  # Medium-high complexity
  clubs: 4   # 3 hours (4 Fibonacci units)
```

**Results:**
- Sandalwood: LOST (underestimated clubs)
- Micro Chips: LOST (overestimated spades, but closer)
- Flash Sentry: WON (asked right question, close estimate)

### Step 4: Update Calibrations

Each agent's profile gets updated based on outcomes

### Step 5: Learn Patterns

"Flash Sentry's cautious approach works well for new agent types"

---

## Implementation Levels (Odd = Scope)

### Raft Level (Design)

**What we can do now:**
- Define agent profiles (this doc)
- Manually place bets "as" different agents
- Track which perspective wins
- Learn from patterns

**Example:**
```markdown
# bet-004-curator-sandalwood.md
madeBy: 🎋 (simulated by 💜)
```

Human writes bet from Sandalwood's perspective

---

### Dinghy Level (Semi-Automated)

**What we could build:**
- Script that prompts LLM with agent persona
- "You are Sandalwood. Place a bet on this issue."
- Generate bet files automatically
- Still requires human to resolve

**Script:**
```bash
# place-bets.ts
deno run place-bets.ts VOSS-003 --agents sandalwood,microchips,flash
# Outputs 3 bet files with different perspectives
```

---

### Sloop Level (Fully Automated)

**What we could build:**
- Multiple LLM instances with different system prompts
- Each agent places bets automatically
- Bets get auto-resolved from issue actuals
- Calibration profiles update automatically
- Dashboard shows "agent leaderboard"

**UI:**
```
Agent Performance by Suit:

♦️ Diamonds:  [Micro Chips: 75%] [Flash: 70%] [Sandalwood: 40%]
♠️ Spades:    [Fluttershy: 80%] [Voss: 75%] [Micro: 65%]
♥️ Hearts:    [Fluttershy: 90%] [Flash: 85%] [Sandalwood: 50%]
♣️ Clubs:     [Micro Chips: 70%] [Flash: 68%] [Sandalwood: 30%]
```

---

## The Meta-Learning Loop (Even = Wisdom)

**Why This Is Powerful:**

**Traditional approach:**
- You estimate
- You're wrong
- "I should have known"
- Vague lesson learned

**Multi-agent approach:**
- Sandalwood estimates: 2 hours
- Micro Chips estimates: 8 hours
- Flash Sentry estimates: 4 hours
- Actual: 5 hours
- **Learning:** "Flash was closest. Use Flash's lens for new features."

**Over time you learn:**
- "When refactoring, trust Fluttershy"
- "When building new features, trust Flash"
- "Never trust Sandalwood's time estimates"
- "Micro Chips is right about complexity 70% of the time"

---

## Minimum Viable Implementation (Raft Level)

**To test this concept NOW:**

**Step 1:** Pick an upcoming task

**Step 2:** Write 2-3 bets from different personas
- One optimistic (Sandalwood)
- One pessimistic (Micro Chips)
- One cautious (Flash Sentry)

**Step 3:** Do the task, track actuals

**Step 4:** See which persona was closest

**Step 5:** Note pattern in session log

**Example:**
```markdown
## Bet Comparison

Task: Implement Curator Agent

Sandalwood: ♣️3 (2 hours) → LOST (too optimistic)
Micro Chips: ♠️7 (13 complexity) → LOST (too pessimistic)
Flash Sentry: ♠️5 (5 complexity) → WON (just right)

Learning: Flash's cautious middle-ground works for new agent types
```

---

## Questions to Answer (Even = Exploration)

**Raft level (design):**
- Which 2-3 agents should we prototype first?
- Should we manually write competing bets for next issue?
- Is this useful for learning, or just overhead?

**Dinghy level (semi-automation):**
- Can we use LLM to generate agent perspectives?
- How to ensure agents have consistent personalities?
- Worth building CLI tool for multi-agent betting?

**Sloop level (full automation):**
- How to prevent agent personalities from drifting?
- Dashboard for visualizing agent performance?
- Integration with real-time work tracking?

---

## My Recommendation (Even = Judgment)

**This is definitely Dinghy-level for implementation, BUT...**

**We can test the concept at Raft level:**

1. Pick your next real issue (maybe issue-VOSS-001 completion?)
2. Manually write 2 bets from different personas
3. One optimistic, one realistic
4. Do the work
5. See which was closer

**If that's useful → graduate to Dinghy and build the tooling**

**If it's just noise → stick with single-perspective betting**

---

💛 ! START

What do you think? Want to try manual multi-agent betting on the next issue? Or should we design the semi-automated Dinghy version?
