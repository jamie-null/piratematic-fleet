# 🦋 The Ship's Manifest

*"Oh my... I hope this isn't too complicated. Let's keep it gentle, okay?"*

---

## Status (where is this thing?)

```rust
enum Status {
    Floating,   // exists, vibing, not urgent
    Sailing,    // actively being worked  
    Anchored,   // blocked or waiting
    Harbored,   // done! safe in port
}
```

## Scope (how big is the voyage?)

```rust
enum Scope {
    Puddle,     // tiny, < 1 hour
    Pond,       // small, < 1 day  
    Sea,        // medium, < 1 week
    Ocean,      // big, needs breaking down probably
}
```

## Kind (what manner of creature is this?)

```rust
enum Kind {
    Bug,        // something's hurt
    Feature,    // something new wants to exist
    Question,   // we don't know yet
    Lore,       // worldbuilding, character, narrative
    Chore,      // maintenance, cleanup, no one's favorite
}
```

## Suit (which cost dimension?)

```rust
enum Suit {
    Diamonds,   // ♦️ token costs — Applejack
    Spades,     // ♠️ tractability — Rarity
    Hearts,     // ♥️ attention costs — Fluttershy
    Clubs,      // ♣️ time costs — Rainbow Dash
}
```

## Card Rank (Fibonacci scale)

```rust
// Card -> Fibonacci value
const RANKS: [(u8, u32); 12] = [
    (1, 1),    // Trivial
    (2, 1),    // Tiny
    (3, 2),    // Small
    (4, 3),    // Minor
    (5, 5),    // Medium
    (6, 8),    // Significant
    (7, 13),   // Large
    (8, 21),   // Major
    (9, 34),   // Epic
    (10, 55),  // Quest-tier
    (11, 89),  // Arc-tier
    (12, 144), // Campaign-tier
];
```

## The Whole Issue

```rust
struct Issue {
    id: String,         // like "VOSS-001"
    title: String,      // one gentle line
    status: Status,
    scope: Scope,
    kind: Kind,
    estimates: HashMap<Suit, u8>,  // card rank per suit
    body: Markdown,     // whatever you need to say
}
```

## The Bet

```rust
struct Bet {
    id: String,
    suit: Suit,
    stake: u8,          // card rank (1-12)
    prediction: String,
    made_at: DateTime,
    outcome: Option<Outcome>,  // Won | Lost | Push | Void
}
```

---

*"If you need more fields... just add them here and rewrite your issues. The old ones don't have to match perfectly. We'll be gentle with them."* 🦋
