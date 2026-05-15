export const AGENT_FINDING_RULES = `## Finding Rules

Every defect must include concrete evidence, such as:

- File path.
- Diff hunk or surrounding code.
- Plan step.
- Command output.
- Test result.
- Exact observed behavior.

Do not include a defect if it cannot be tied to evidence.

Separate true blockers from risk notes.

A blocker must be one of:

- Violates the approved plan.
- Breaks intended behavior.
- Introduces likely regression.
- Creates security, privacy, data integrity, or reliability risk.
- Leaves required validation unperformed when validation was necessary.`;
