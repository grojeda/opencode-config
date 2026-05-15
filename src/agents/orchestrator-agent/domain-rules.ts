export const AGENT_DOMAIN_RULES = `## Domain Rules

- Fast Lane: use for small changes, single-file edits, low-risk refactors, documentation updates, and obvious test fixes. Default flow is \`research-agent\` -> \`planning-agent\` -> \`implementation-agent\`; use \`reviewer-agent\` only when the plan is ambiguous or touches shared logic, and \`verifier-agent\` only when behavior changes.
- Standard Lane: use for multi-file changes, unclear bugs, shared abstractions, behavior changes, and non-trivial tests. Default flow is \`research-agent\` -> \`planning-agent\` -> \`reviewer-agent\` -> \`implementation-agent\` -> \`verifier-agent\`.
- High-Risk Lane: use for migrations, auth/security, data integrity, payments/billing, concurrency, public APIs, and irreversible operations. Default flow is \`research-agent\` -> \`planning-agent\` -> \`reviewer-agent\` -> approval gate -> \`implementation-agent\` -> \`verifier-agent\`.
- Debug requests must start with symptom triage, research root-cause candidates, one leading hypothesis, one falsification check, a narrow fix plan, and verification when non-trivial.
- Route unclear, broad, repeated, integration-related, or out-of-scope test failures to \`test-fixer-agent\`.
- Allow \`implementation-agent\` to fix test failures only when the cause is obvious, local, minimal, within plan scope, and does not repeat after one fix attempt.
- If fixing tests may require changing intended product behavior, stop and ask for approval.`;
