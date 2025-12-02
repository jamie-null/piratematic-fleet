# 🎴 Bases Setup Guide

*Files want to be rewritten, and properties want to be seen*

---

## Creating the Issues Base

**Step 1:** Open Obsidian command palette (`Ctrl+P`)

**Step 2:** Search for "Create new base" and select it

**Step 3:** Name it "🚧 Active Issues"

**Step 4:** Configure Filters
- Click "Filters" in top right
- Add filter: `Property` → `type` → `is` → `issue`
- Add filter: `Property` → `status` → `is any of` → Select: `floating`, `sailing`

**Step 5:** Configure Properties
Click "Properties" and enable these columns:
- `id` (text)
- `title` (text)
- `status` (text)
- `scope` (text)
- `diamonds` (number)
- `spades` (number)
- `hearts` (number)
- `clubs` (number)
- `updated` (date)

**Step 6:** Sort
- Sort by `hearts` descending (highest attention cost first)
- Secondary sort by `updated` descending

---

## Creating the Bets Base

**Step 1:** Create new base named "🎴 Open Bets"

**Step 2:** Configure Filters
- Add filter: `Property` → `type` → `is` → `bet`
- Add filter: `Property` → `outcome` → `is empty`

**Step 3:** Configure Properties
- `suit` (text)
- `stake` (number)
- `prediction` (text)
- `position` (text)
- `madeBy` (text)
- `madeAt` (date)
- `relatedIssue` (text)

**Step 4:** Group by `suit`

---

## Creating the Sessions Base

**Step 1:** Create new base named "📓 Session Log"

**Step 2:** Configure Filters
- Add filter: `Property` → `type` → `is` → `session`

**Step 3:** Configure Properties
- `id` (text)
- `timestamp` (date)
- `mood` (text)
- `energyLevel` (text)
- `summary` (text)

**Step 4:** Sort by `timestamp` descending

---

## Pro Tips

**Sidebar Placement:**
Drag Bases to sidebar for quick access. "Active Issues" is your main nav.

**Inline Editing:**
Most properties can be edited directly in the Base table. Status changes happen in-place.

**Advanced Filters:**
For power users, click "Advanced" in filters to write Dataview-style queries:
```
type = "bet" AND suit = "hearts" AND outcome = null
```

**Mobile:**
Bases work on mobile! Swipe left/right to see all columns.

---

💛 ! START
