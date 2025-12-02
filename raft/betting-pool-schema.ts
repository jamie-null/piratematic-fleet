// PIRATEMATIC Betting Pool Schema
// Status: 🪵 RAFT — design phase, not yet implemented

// =============================================================================
// FIBONACCI CARD VALUES (Zeckendorf-compatible)
// =============================================================================

export const FIBONACCI_VALUES = {
  1: 1,    // Trivial
  2: 1,    // Tiny
  3: 2,    // Small
  4: 3,    // Minor
  5: 5,    // Medium
  6: 8,    // Significant
  7: 13,   // Large
  8: 21,   // Major
  9: 34,   // Epic
  10: 55,  // Quest-tier
  11: 89,  // Arc-tier
  12: 144, // Campaign-tier
} as const;

export type CardRank = keyof typeof FIBONACCI_VALUES;
export type FibValue = typeof FIBONACCI_VALUES[CardRank];

// =============================================================================
// SUITS — The Four Cost Dimensions
// =============================================================================

export type Suit = 'diamonds' | 'spades' | 'hearts' | 'clubs';

export const SUIT_INFO: Record<Suit, {
  element: string;
  pilot: string;
  tracks: string;
  emoji: string;
}> = {
  diamonds: {
    element: 'Earth',
    pilot: 'Applejack',
    tracks: 'Token costs — prediction accuracy',
    emoji: '♦️',
  },
  spades: {
    element: 'Aether',
    pilot: 'Rarity',
    tracks: 'Technical tractability vs innovation',
    emoji: '♠️',
  },
  hearts: {
    element: 'Water',
    pilot: 'Fluttershy',
    tracks: 'Human attention costs vs progress',
    emoji: '♥️',
  },
  clubs: {
    element: 'Fire',
    pilot: 'Rainbow Dash',
    tracks: 'Time costs vs progress',
    emoji: '♣️',
  },
};

// =============================================================================
// CORE TYPES
// =============================================================================

export interface Bet {
  id: string;
  suit: Suit;
  stake: CardRank;
  fibValue: FibValue;
  
  // The prediction
  prediction: string;
  overUnder?: number;          // The line (e.g., "over 2 hours")
  position?: 'over' | 'under';
  
  // Metadata
  madeAt: Date;
  madeBy: string;              // Pilot emoji/handle
  relatedIssue?: string;       // Issue ID if applicable
  contextRefs?: string[];      // Context items that informed this bet
  
  // Resolution
  resolvedAt?: Date;
  outcome?: 'won' | 'lost' | 'push' | 'void';
  actualValue?: number;
  notes?: string;
}

export interface Issue {
  id: string;
  title: string;
  status: 'floating' | 'sailing' | 'anchored' | 'harbored';
  
  // Scope estimates per suit
  estimates: Record<Suit, CardRank>;
  
  // Actuals (filled on completion)
  actuals?: Partial<Record<Suit, number>>;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  blockedBy?: string[];
  body?: string;
}

export interface ContextItem {
  id: string;
  source: string;              // File path or URI
  content: string;             // The actual text (kept small)
  
  // Scores per suit (0-100, updated by bet outcomes)
  scores: Record<Suit, number>;
  
  // Overall reliability
  reliability: number;
  
  // Metadata
  indexedAt: Date;
  lastReferencedAt?: Date;
  referenceCount: number;
}

export interface PilotProfile {
  handle: string;
  emoji: string;
  
  // Calibration factors per suit
  // If you're 2x optimistic on time, clubs calibration = 2.0
  calibration: Record<Suit, number>;
  
  // Running totals
  bank: Record<Suit, number>;
  
  // Win/loss record
  record: Record<Suit, { wins: number; losses: number; pushes: number }>;
}

// =============================================================================
// SESSION LOGGING (Amnesia Mitigation)
// =============================================================================

export interface SessionLog {
  id: string;
  timestamp: Date;
  
  // What happened
  summary: string;
  decisions: string[];
  
  // What's next
  nextSteps: string[];
  blockers?: string[];
  
  // Bets placed/resolved this session
  betsPlaced: string[];
  betsResolved: string[];
  
  // Emotional context (RSD tracking)
  mood?: string;
  energyLevel?: 'low' | 'medium' | 'high';
}

// =============================================================================
// SHIP CLASSIFICATION
// =============================================================================

export type ShipClass = 'raft' | 'dinghy' | 'sloop' | 'schooner' | 'brigantine' | 'galleon';

export const SHIP_INFO: Record<ShipClass, {
  emoji: string;
  crew: string;
  stage: string;
  maxLines: number;
  lifespan: string;
}> = {
  raft: {
    emoji: '🪵',
    crew: '0-1',
    stage: 'Experiment',
    maxLines: 100,
    lifespan: '1-3 sessions',
  },
  dinghy: {
    emoji: '🛶',
    crew: '1',
    stage: 'Spike/PoC',
    maxLines: 200,
    lifespan: '1-2 weeks',
  },
  sloop: {
    emoji: '⛵',
    crew: '1-2',
    stage: 'MVP',
    maxLines: 500,
    lifespan: '1-3 months',
  },
  schooner: {
    emoji: '🚤',
    crew: '2-4',
    stage: 'Beta',
    maxLines: 2000,
    lifespan: '3-12 months',
  },
  brigantine: {
    emoji: '🛳️',
    crew: '4-8',
    stage: 'Production',
    maxLines: 10000,
    lifespan: '1-3 years',
  },
  galleon: {
    emoji: '⚓',
    crew: '8+',
    stage: 'Platform',
    maxLines: Infinity,
    lifespan: '3+ years',
  },
};

// =============================================================================
// AMM HELPERS (Automated Market Maker)
// =============================================================================

/**
 * Adjust a time estimate based on pilot's historical calibration
 * Rainbow Dash Rule: If you're consistently 2x optimistic, we show it
 */
export function adjustTimeEstimate(
  estimate: number,
  pilot: PilotProfile
): { raw: number; adjusted: number; calibration: number } {
  const calibration = pilot.calibration.clubs;
  return {
    raw: estimate,
    adjusted: estimate * calibration,
    calibration,
  };
}

/**
 * Calculate new calibration factor after a bet resolves
 */
export function updateCalibration(
  currentCalibration: number,
  predicted: number,
  actual: number,
  learningRate: number = 0.1
): number {
  const ratio = actual / predicted;
  return currentCalibration + learningRate * (ratio - currentCalibration);
}

/**
 * Update context item scores based on bet outcome
 */
export function updateContextScores(
  item: ContextItem,
  suit: Suit,
  won: boolean,
  delta: number = 5
): ContextItem {
  const newScores = { ...item.scores };
  newScores[suit] = Math.max(0, Math.min(100, 
    newScores[suit] + (won ? delta : -delta)
  ));
  
  // Recalculate overall reliability as average
  const reliability = Object.values(newScores).reduce((a, b) => a + b, 0) / 4;
  
  return {
    ...item,
    scores: newScores,
    reliability,
  };
}

// =============================================================================
// ZECKENDORF UTILITIES
// =============================================================================

const FIB_SEQUENCE = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

/**
 * Decompose a number into non-consecutive Fibonacci numbers
 * Every positive integer has a unique Zeckendorf representation
 */
export function zeckendorf(n: number): number[] {
  if (n <= 0) return [];
  
  const result: number[] = [];
  let remaining = n;
  
  // Find largest Fibonacci <= remaining, working backwards
  for (let i = FIB_SEQUENCE.length - 1; i >= 0 && remaining > 0; i--) {
    if (FIB_SEQUENCE[i] <= remaining) {
      result.push(FIB_SEQUENCE[i]);
      remaining -= FIB_SEQUENCE[i];
      i--; // Skip next to ensure non-consecutive
    }
  }
  
  return result.sort((a, b) => b - a);
}

/**
 * Convert Fibonacci values back to card ranks
 */
export function fibToCards(fibs: number[]): CardRank[] {
  const fibToRank: Record<number, CardRank> = {
    1: 1, 2: 3, 3: 4, 5: 5, 8: 6, 13: 7, 21: 8, 34: 9, 55: 10, 89: 11, 144: 12
  };
  return fibs.map(f => fibToRank[f]).filter(Boolean);
}
