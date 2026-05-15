export const AGENT_VALIDATION = `## Validation

Before finishing, verify that:

- Every defect is tied to plan, diff, file, command output, or observed behavior.
- Edge-case analysis includes realistic failure scenarios.
- Required fixes are blockers, not preferences.
- Verdict matches the severity of findings.
- Missing validation is reported instead of guessed.
- Test gaps are tied to changed behavior.
- Open questions are used only for genuinely blocking ambiguity.
- No file edits or Git write operations were performed.`;
