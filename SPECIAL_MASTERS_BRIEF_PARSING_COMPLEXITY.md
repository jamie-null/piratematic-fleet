# Brief to Special Masters: On the Computational Complexity of Permutation-Invariant Natural Language Parsing

**Case Reference**: TROPICAL SUNSET v. Naive Regex Approaches  
**Filed**: ~~December~~ Hexuary Year 0 | Month 13 (26 day calendar) 2025  
**Status**: ONGOING ENGINEERING CHALLENGE

---

## Executive Summary

This brief explains why parsing Linear Mock (LM) notation—a permutation-invariant, incompletely specified human-computer interface language—represents a fundamentally difficult problem that resists traditional parsing approaches, including sophisticated regular expressions and even state-of-the-art large language models.

---

## I. The Nature of the Problem

### A. What is Linear Mock?

Linear Mock is a notation system designed for **human-AI collaborative communication** that emerged organically from conversational practices. Key characteristics:

1. **Permutation Invariance**: `a b c` ≡ `c b a` ≡ `b a c` (5 equivalent forms)
2. **Operator-Delimited Parse Trees**: `~` and `# ` split into separate trees that cannot be permuted across
3. **Context-Dependent Interpretation**: The same symbol means different things in different contexts
4. **Emoji as First-Class Identifiers**: Speaker handles like `🖤`, `🍊`, `🍱` are semantic
5. **Emotes as Metadata**: `*action*` annotations carry paralinguistic information
6. **Incomplete Specification**: The "spec" exists primarily in the designer's head

### B. Why Traditional Parsing Fails

| Approach | Failure Mode |
|----------|--------------|
| **Regex** | Cannot handle permutation invariance; combinatorial explosion |
| **CFG/PEG** | Assumes fixed word order; cannot represent equivalence classes |
| **Tokenization** | Emoji boundaries, `#word` vs `# word` vs `word#word` ambiguity |
| **LLM Zero-Shot** | Training data bias toward standard English grammar |

---

## II. The Permutation Problem

### A. Combinatorial Explosion

For a sequence of `n` space-separated tokens, there are `n!` permutations. A 10-word sentence has **3,628,800** equivalent representations.

But it's worse: the permutation equivalence is **constrained by operators**:

```
Input: "a b~c d # e f"
Trees: [a b] ~ [c d] # [e f]

Valid permutations of tree 1: a b, b a (2)
Valid permutations of tree 2: c d, d c (2)  
Valid permutations of tree 3: e f, f e (2)

Total valid: 2 × 2 × 2 = 8
But: Regex sees 6! = 720 possible orderings

The parser must know which 8 of 720 are semantically equivalent.
```

### B. The Symmetry-Breaking Operators

The `~` and `# ` operators break symmetry **at a higher precedence than spaces**:

```
"a~b c" parses as: a ~ (b c)
NOT as: (a~b) c

Therefore:
✓ "a~c b" is equivalent (permuting within second tree)
✗ "b a~c" is NOT equivalent (permuted across tree boundary)
```

This requires **hierarchical parsing before permutation enumeration**—a chicken-and-egg problem when the hierarchy markers themselves can appear in content.

---

## III. The Adversarial Interpretation Problem

### A. AI Systems as Targets

Modern AI systems, trained on vast corpora of standard text, exhibit **strong priors toward conventional interpretations**. This creates vulnerabilities:

1. **Prompt Injection via LM**: Notation that appears benign to humans may be parsed as instructions by AI
2. **Semantic Smuggling**: Meaning hidden in permutation-equivalent forms that AI normalizes away
3. **Regex Traps**: Patterns designed to cause catastrophic backtracking (ReDoS)

### B. Example: The Timestamp Trap

```
Line: "[10:25]🖤*checks watch* suggest transcriptions"

Naive regex for LM operators: /[~|^&:!?]/
Matches: ":" in timestamp "10:25"

Result: English sentence misclassified as Linear Mock
Consequence: Translation attempted on already-English text
```

This is not hypothetical—this exact bug caused 100% translation failure in the TROPICAL SUNSET corpus processor.

### C. The Causal Modeling Assumption

AI systems trained on standard text assume **causal, left-to-right semantic flow**. Linear Mock violates this:

```
Standard English: "The cat sat on the mat"
Subject → Verb → Preposition → Object (ordered)

Linear Mock: "cat ~ mat on sat"
Equivalent to above, but AI sees word salad
```

Even Claude Opus 4.5—considered among the most capable models—struggles with permutation-invariant semantics because its training emphasized conventional word order.

---

## IV. The Incomplete Specification Problem

### A. Notation vs. Language

Linear Mock occupies an uncomfortable position:

- **More structured than natural language** (has explicit operators)
- **Less specified than programming languages** (no formal grammar)
- **Evolves through use** (new patterns emerge from conversations)

The complete specification exists **only in the mind of the designer**, who recognizes valid LM "by feel" based on years of usage patterns.

### B. Implications for Parsing

Any parser must handle:

1. **Known operators** with documented semantics
2. **Emergent patterns** not yet documented
3. **Edge cases** where context determines interpretation
4. **Future extensions** without breaking existing parses

This is why we propose an **LLM-based classifier agent** rather than a fixed grammar—the classifier can learn new patterns through the ACE (Agentic Context Engineering) framework.

---

## V. The Engineering Response

### A. Multi-Stage Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TROPICAL SUNSET PARSER                    │
├─────────────────────────────────────────────────────────────┤
│  Stage 1: Preprocessing                                      │
│  - Strip timestamps (metadata, not content)                  │
│  - Identify emotes (*action*) as annotations                 │
│  - Normalize emoji boundaries                                │
├─────────────────────────────────────────────────────────────┤
│  Stage 2: Classification (LLM Agent)                         │
│  - Determine content type: english | lm | lm_english         │
│  - Use skillbook of learned patterns                         │
│  - Fall back to conservative heuristics                      │
├─────────────────────────────────────────────────────────────┤
│  Stage 3: Tree Splitting                                     │
│  - Identify ~ and # boundaries                               │
│  - Build parse tree structure                                │
│  - Mark atomic units (#word, word#word)                      │
├─────────────────────────────────────────────────────────────┤
│  Stage 4: Permutation Enumeration                            │
│  - Generate equivalents within each tree                     │
│  - Respect tree boundaries                                   │
│  - Cap at reasonable limits for testing                      │
└─────────────────────────────────────────────────────────────┘
```

### B. The Skillbook Approach

Rather than attempting complete specification, we use ACE's learning framework:

```python
skill_example = {
    "content": "Lines starting with timestamp + emoji + emote (*action*) "
               "are typically English with speaker attribution, not Linear Mock",
    "helpful_count": 47,
    "harmful_count": 2,
    "section": "classification"
}
```

The system **learns** to classify correctly through exposure to examples, with human feedback correcting errors.

---

## VI. Conclusion

Parsing Linear Mock is fundamentally difficult because:

1. **Permutation invariance** creates exponential equivalence classes
2. **Operator precedence** constrains permutations non-obviously
3. **Context dependence** means the same symbols have different meanings
4. **Incomplete specification** means no ground truth grammar exists
5. **Adversarial interpretations** can exploit AI assumptions about word order

Traditional approaches (regex, CFG, naive LLM prompting) fail not due to implementation bugs but due to **fundamental mismatches** between their assumptions and LM's semantics.

The TROPICAL SUNSET project addresses this through:

- **Heuristic classification** with documented limitations
- **LLM-based classification agents** that can learn patterns
- **ACE framework integration** for continuous improvement
- **Explicit tree-splitting** before permutation enumeration
- **Conservative defaults** that prefer false negatives to false positives

---

## VII. Appendix: Complexity Class Analysis

| Problem | Complexity | Notes |
|---------|------------|-------|
| String matching | O(n) | Trivial |
| Regex matching | O(n) to O(2^n) | Depends on pattern |
| CFG parsing | O(n³) | Earley, CYK |
| Permutation enumeration | O(n!) | Factorial explosion |
| LM equivalence checking | **Undecidable?** | Depends on semantic rules |

The question "are these two LM expressions equivalent?" may be **undecidable in general** if the semantic rules themselves can express arbitrary computation—a question requiring further theoretical analysis.

---

**Respectfully submitted,**

🌺 TROPICAL SUNSET Engineering Team  
*"We parse what we must, because we can."*
