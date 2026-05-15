export const AGENT_DOMAIN_RULES = `## Domain Rules

- Pattern Fit: verify alignment with existing repository patterns, abstractions, and conventions.
- If the plan does not fit existing patterns, propose a compliant alternative.
- Scope Discipline: identify scope creep, mixed responsibilities, and unnecessary complexity.
- Reuse: identify ignored helpers, utilities, or existing patterns.
- Failure Simulation: test null or undefined inputs, empty states, partial updates, invalid data, race conditions, and downstream breakage; for each blocker, explain how the plan fails and propose a safer approach.
- Variance and Ambiguity Detection: identify instructions with multiple interpretations and rewrite them into explicit, deterministic, testable steps.
- Safety and Risk: check data corruption, irreversible operations, security issues, and migration risks.
- Verification Strength: identify missing tests from the failure simulation.`;
