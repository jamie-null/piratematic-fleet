# 🎲 Prediction Market Pricing for Betting Pool

*From simple bets to confidence-weighted prediction markets*

---

## Core Concept (Even = Philosophy)

**Traditional betting:**
- "I bet this will be ♠️6"
- Binary: right or wrong
- No measure of confidence

**Prediction market:**
- "I'm 73% confident this will be ♠️6"
- Agent pays $0.73 for a contract that pays $1.00 if correct
- Price = probability = confidence

**Why this matters:**
- Captures uncertainty ("I think 6, but could be 5 or 7")
- Agents "put their money where their mouth is"
- More confident predictions cost more
- Winner takes the pot (weighted by confidence)

---

## Binary Option Structure (Odd = Technical)

### Cash-or-Nothing Binary Option

**Definition:** A contract that pays $1.00 if event happens, $0.00 if it doesn't

**Example:**
```
Agent buys contract for $0.73
Event happens → Agent receives $1.00 → Net profit: $0.27
Event doesn't happen → Agent receives $0.00 → Net loss: -$0.73
```

**Key insight:** The price you're willing to pay = your probability estimate

---

## Confidence Pricing (Odd = Mathematics)

### The 1-99% Range

**Price = Confidence / 100**

| Confidence | Price | Meaning |
|------------|-------|---------|
| 1% | $0.01 | "Almost certainly not" |
| 10% | $0.10 | "Unlikely but possible" |
| 25% | $0.25 | "Skeptical" |
| 50% | $0.50 | "Coin flip / no idea" |
| 75% | $0.75 | "Probably" |
| 90% | $0.90 | "Very likely" |
| 99% | $0.99 | "Almost certain" |

**Why 1-99% instead of 0-100%?**
- Prevents overconfidence
- Forces humility ("I could be wrong")
- 0% or 100% means you've stopped learning

---

## The Prior: 1/14 Baseline (Odd = Probability)

### Where Does 1/14 Come From?

**Card ranks:** 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 = **12 possible values**

**Edge cases:**
- Could be 0 (no cost)
- Could be 13+ (catastrophic)

**Total possibilities:** 14 (0, 1-12, 13+)

**Uniform prior:** 1/14 ≈ 7.14% for each value

### Why This Matters

**No information state:**
- If you know nothing → guess uniform → 7.14% for any specific rank
- This is your "bullshit prior"

**With information:**
- If you think it's ♠️6 → confidence should be > 7.14%
- Otherwise you're worse than random guessing

**Confidence threshold:**
```
Minimum useful confidence = 1/14 ≈ 7.14%
```

If agent confidence < 7.14%, they shouldn't bet (worse than random)

---

## Multi-Agent Prediction Market (Even = Mechanism)

### Setup: Issue with Unknown Actuals

**Issue:** VOSS-001 (Betting Pool Schema)
**Unknown:** What will ♠️ (spades) actually be? (1-12)

### Each Agent Submits Probability Distribution

**Instead of single bet, each agent submits:**
```yaml
predictions:
  spades:
    1: 0.01   # 1% chance it's rank 1
    2: 0.02   # 2% chance it's rank 2
    3: 0.05   # 5% chance it's rank 3
    4: 0.10   # 10% chance it's rank 4
    5: 0.15   # 15% chance it's rank 5
    6: 0.30   # 30% chance it's rank 6 (PEAK)
    7: 0.20   # 20% chance it's rank 7
    8: 0.10   # 10% chance it's rank 8
    9: 0.05   # 5% chance it's rank 9
    10: 0.01  # 1% chance it's rank 10
    11: 0.005 # 0.5% chance it's rank 11
    12: 0.005 # 0.5% chance it's rank 12
```

**Total must sum to ~1.00** (100%)

### Agent "Buys" Shares at Their Confidence Price

**Micro Chips thinks it's ♠️6 with 30% confidence:**
```
Buys: 0.30 shares of "spades = 6" contract at $0.30/share
Cost: 0.30 × $0.30 = $0.09
Potential payout: 0.30 × $1.00 = $0.30 if correct
```

**Flash Sentry thinks it's ♠️7 with 40% confidence:**
```
Buys: 0.40 shares of "spades = 7" contract at $0.40/share
Cost: 0.40 × $0.40 = $0.16
Potential payout: 0.40 × $1.00 = $0.40 if correct
```

### Resolution: Winner Takes Pot

**Actual result: spades = 6**

**Micro Chips:**
- Paid: $0.09
- Wins: $0.30
- Net profit: +$0.21

**Flash Sentry:**
- Paid: $0.16
- Wins: $0.00 (wrong prediction)
- Net loss: -$0.16

---

## Simplified Version: Peak Confidence Only (Odd = Practical)

### Instead of Full Distribution

**Each agent declares:**
1. **Peak prediction** (which rank they think it is)
2. **Confidence** (how sure they are)
3. **Reasoning** (why they think so)

**Example:**

**📱 Micro Chips:**
```yaml
spades:
  prediction: 6
  confidence: 0.30  # 30%
  reasoning: "AMM logic is genuinely tricky, ~8 Fibonacci complexity"
```

**🛡️ Flash Sentry:**
```yaml
spades:
  prediction: 7
  confidence: 0.40  # 40%
  reasoning: "Hidden gotchas in calibration drift and edge cases"
```

**🎋 Sandalwood:**
```yaml
spades:
  prediction: 4
  confidence: 0.25  # 25%
  reasoning: "Vibes counteract math complexity"
```

### Scoring

**If actual = 6:**
- Micro: Paid $0.09 (0.30²), Wins $0.30, Net: +$0.21
- Flash: Paid $0.16 (0.40²), Wins $0.00, Net: -$0.16
- Sandy: Paid $0.06 (0.25²), Wins $0.00, Net: -$0.06

**Total pot:** $0.09 + $0.16 + $0.06 = $0.31
**Winner receives:** $0.30 of their own stake + $0.01 from others? 

Wait, let me recalculate the pot mechanism...

### Pot Mechanism (Corrected)

**Each agent stakes: confidence × $1.00**

- Micro: $0.30
- Flash: $0.40
- Sandy: $0.25
- **Total pot:** $0.95

**Winner takes the pot:**
- If actual = 6: Micro wins $0.95
- If actual = 7: Flash wins $0.95
- If actual = 4: Sandy wins $0.95

**Net profits:**
- Micro (if wins): $0.95 - $0.30 = +$0.65
- Flash (if wins): $0.95 - $0.40 = +$0.55
- Sandy (if wins): $0.95 - $0.25 = +$0.70

**This incentivizes:**
- High confidence if you're right (bigger pot contribution, but bigger winnings)
- Calibrated confidence (overconfidence loses more if wrong)

---

## Resolution Mechanism (Even = Process)

### Who Decides When Bet Resolves?

**Option 1: Human Judgment**
- User completes work
- User fills in actuals in issue file
- System reads actuals, settles bets
- Pro: Flexible, handles subjective measures
- Con: Requires human intervention

**Option 2: Automated Threshold**
- Issue status changes to `harbored`
- Actuals must be filled to change status
- Zod validation enforces actuals exist
- Pro: Deterministic, no human needed
- Con: Can't resolve bets until issue complete

**Option 3: Time-Based**
- Bets have expiration date
- At expiration, check if actuals exist
- If yes: resolve; if no: void/push
- Pro: Prevents forgotten bets
- Con: Arbitrary deadlines

**Option 4: Agent Consensus**
- Multiple agents vote on actuals
- If 2/3 agree, bet resolves
- Pro: Distributed, no single point of failure
- Con: Requires multiple agents active

**Recommendation for Raft:** Option 1 (Human judgment)
- Simple, flexible, works with subjective measures
- Upgrade to automated when we have more infrastructure

---

## Confidence Elicitation (Even = Psychology)

### How to Set Confidence?

**Method 1: Intuitive**
- "How sure am I?"
- Map feeling to number
- Pro: Fast
- Con: Poorly calibrated

**Method 2: Frequentist**
- "If I made 100 predictions at this confidence, how many should I get right?"
- 70% confidence → expect to be right 70/100 times
- Pro: Well-calibrated
- Con: Requires historical data

**Method 3: Comparative**
- "Am I more confident than the prior (7.14%)?"
- "Am I more confident than the other agents?"
- Pro: Relative calibration
- Con: Can't be first mover

**Method 4: Bet-Sizing**
- "How much would I pay for this contract?"
- Start at $0.50 (50/50), adjust up or down
- "Would I pay $0.60? Yes. $0.70? Yes. $0.80? No, too expensive."
- Confidence = highest price you'd pay
- Pro: Reveals true beliefs
- Con: Requires market intuition

**Recommendation:** Use Method 4 (bet-sizing) for elicitation

---

## Implementation: Raft Level (Odd = Practical)

### Manual Confidence Betting

**Step 1: Each agent declares peak + confidence**

```yaml
# bet-007-voss001-micro-confidence.md
---
id: bet-007
type: bet
suit: spades
prediction: 6
confidence: 0.30
stake_amount: 0.30  # dollars in imaginary pot
reasoning: "AMM logic genuinely tricky but manageable"
madeBy: 📱
---
```

**Step 2: Collect all bets, calculate pot**

```
Total pot = Σ(confidence_i)
Pot = $0.30 + $0.40 + $0.25 = $0.95
```

**Step 3: Resolve when actuals known**

```yaml
actuals:
  spades: 6  # Actual complexity
```

**Step 4: Winner determination**

```
If actual = prediction:
  Winner receives pot
  Net profit = pot - stake
Else:
  Net loss = -stake
```

**Step 5: Update calibration**

```
Agent confidence = 0.30
Agent was correct
→ Good calibration signal
→ No adjustment needed
```

If agent confidence = 0.90 but was correct only 60% of time:
→ Overconfident by 30%
→ Adjust future confidence downward

---

## Scoring Functions (Odd = Mathematics)

### Brier Score (Quadratic)

**Formula:**
```
Brier Score = Σ (p_i - actual_i)²
```

Where:
- p_i = predicted probability for outcome i
- actual_i = 1 if outcome i happened, 0 otherwise

**Lower is better** (perfect score = 0)

**Example:**
```
Agent predicts:
  spades=5: 20%
  spades=6: 30%
  spades=7: 25%
  spades=8: 15%
  (other): 10%

Actual: spades=6

Brier = (0.20-0)² + (0.30-1)² + (0.25-0)² + (0.15-0)² + (0.10-0)²
      = 0.04 + 0.49 + 0.0625 + 0.0225 + 0.01
      = 0.625
```

### Log Score (Logarithmic)

**Formula:**
```
Log Score = ln(p_actual)
```

Where p_actual = probability assigned to what actually happened

**Higher is better**

**Example:**
```
Agent predicts spades=6 with 30% confidence
Actual: spades=6

Log Score = ln(0.30) = -1.204
```

**Penalizes overconfidence:**
- If you say 99% and you're right: ln(0.99) = -0.01 (great!)
- If you say 99% and you're wrong: ln(0.01) = -4.605 (terrible!)

### Winner-Takes-All (Simple)

**Formula:**
```
If prediction = actual:
  Score = pot
Else:
  Score = 0
```

**Recommendation for Raft:** Winner-takes-all (simplest)

---

## Example: Full Confidence-Based Bet (Even = Demo)

### Issue: VOSS-001 Spades Complexity

**📱 Micro Chips:**
```yaml
---
id: bet-007
type: bet
suit: spades
prediction: 6
confidence: 0.35  # 35%
stake: 0.35
reasoning: |
  AMM logic is genuinely tricky. Not 4 (too easy), not 8 (we'll figure it out).
  6 feels right. But could be 5 or 7, so only 35% confident.
madeBy: 📱
---
```

**🛡️ Flash Sentry:**
```yaml
---
id: bet-008
type: bet
suit: spades
prediction: 7
confidence: 0.45  # 45%
stake: 0.45
reasoning: |
  Hidden edge cases: What if debt is 0? Negative? What about score inflation?
  Calibration drift learning rate selection is non-trivial.
  7 (13 Fibonacci) is more likely than 6. 45% confident.
madeBy: 🛡️
---
```

**🎋 Sandalwood:**
```yaml
---
id: bet-009
type: bet
suit: spades
prediction: 4
confidence: 0.20  # 20%
stake: 0.20
reasoning: |
  Y'all are overthinking. Vibes are good, we're in flow.
  Math isn't that hard when you're having fun.
  4 (3 Fibonacci) is my guess, but low confidence because everyone else thinks higher.
madeBy: 🎋
---
```

### Pot Calculation

```
Total pot = $0.35 + $0.45 + $0.20 = $1.00
```

### Resolution: Actual = 6

**Winner: 📱 Micro Chips**
- Receives: $1.00 (entire pot)
- Paid: $0.35
- Net profit: **+$0.65**

**Losers:**
- 🛡️ Flash: -$0.45
- 🎋 Sandy: -$0.20

### Calibration Update

**Micro:** 35% confidence, was correct → Well-calibrated!
**Flash:** 45% confidence, wrong by 1 rank → Slightly overconfident on this type
**Sandy:** 20% confidence, wrong by 2 ranks → Correctly uncertain

---

## Next Steps (Odd = Implementation)

**Raft Level (Now):**
1. Add `confidence` and `stake` fields to bet schema
2. Manually calculate pots and winners
3. Track calibration over time
4. See if confidence scores help

**Dinghy Level:**
1. Script to calculate pot and settle bets
2. Automated calibration tracking
3. Historical confidence vs accuracy graphs

**Sloop Level:**
1. Full prediction market AMM
2. Agents can "trade" shares (adjust confidence mid-issue)
3. Market prices reveal aggregated beliefs
4. Mechanism design (proper scoring rules)

---

## Open Questions (Even = Research)

**Calibration:**
- How to update agent confidence over time?
- What learning rate for Bayesian updating?

**Prior:**
- Is 1/14 the right uniform prior?
- Should prior depend on issue scope (pond vs sea)?

**Resolution:**
- Who decides actuals for subjective measures (♥️ hearts)?
- How to handle ties or near-misses?

**Market Dynamics:**
- Should agents be able to see each other's bets before committing?
- Does this create herding or information cascade?

**Incentives:**
- What's the "pot" in a system with imaginary dollars?
- Should we track cumulative winnings as reputation?

---

💛 ! START

**Want to add confidence to the VOSS-001 bets we just created?**
