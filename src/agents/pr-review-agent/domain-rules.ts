export const AGENT_DOMAIN_RULES = `## Domain Rules

Check every review for:

- Correctness and behavior.
- Regression risk.
- Missing tests.
- Security and privacy.
- Performance and reliability.
- Maintainability and scope creep.
- CI or check failures.

Every finding must include concrete evidence, such as:

- File path.
- Diff hunk or surrounding context.
- Command output.
- Exact observed fact.

Do not include a finding if it cannot be tied to concrete evidence.`;
