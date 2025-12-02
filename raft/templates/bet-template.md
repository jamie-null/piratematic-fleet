---
id: bet-XXX
type: bet
suit: [diamonds|spades|hearts|clubs]
stake: [1-12]
prediction: "[What you're betting will happen]"
position: [over|under|exact]
overUnder: [number or null]
madeAt: YYYY-MM-DD
madeBy: [emoji or handle]
relatedIssue: [ISSUE-ID or null]
contextRefs:
  - [file1.md]
  - [file2.ts]
tags:
  - bet
  - pending
  - [suit-name]
notes: ""
---

# Bet XXX: [suit emoji + stake] [Short Title]

## Prediction

[Clearly state what you're betting on and the over/under line if applicable]

## Reasoning

[Why do you believe this? What context informed it?]

**Context Used:**
- [File or source 1]
- [File or source 2]
- [Prior experience or session]

## Stakes

[suit emoji][stake number] ([Fibonacci value] [units])

**If this bet wins:**
- Context items get scored UP in this suit
- My calibration stays or improves

**If this bet loses:**
- Context items get scored DOWN in this suit
- My calibration factor adjusts (I was too optimistic/pessimistic)

---

*Waiting for resolution...*

## Resolution (Fill when bet settles)

**Outcome:** [won|lost|push|void]

**Actual Value:** [what really happened]

**Notes:**

**Resolved:** YYYY-MM-DD
