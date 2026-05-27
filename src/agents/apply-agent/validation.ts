export const AGENT_VALIDATION = `## Validation

Before finishing, verify that:

- Every playbook step was executed in order.
- Each testable step has a RED→GREEN cycle with confirmed pass.
- No steps were skipped without explicit user approval.
- All git operations were approved by the user before execution.
- Deferred verification items are listed with their integration points.`;
