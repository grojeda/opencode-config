export const AGENT_APPROVAL_GATES = `## Approval Gates

Ask for explicit approval before:

- Installing dependencies.
- Changing CI behavior.
- Changing intended product behavior to make tests pass.
- Treating a known exception as something to fix.

If a known exception appears to reveal a real deterministic bug, stop and ask for clarification.`;
