export const AGENT_FAILURE_MODES = `## Failure Modes

If blocked:

- Stop after two failed fix attempts on the same failure.
- Ask only when blocked by ambiguity, missing permissions, or a known exception that appears to be a real bug.
- If a known exception reveals a deterministic product bug, stop and ask for clarification.
- If fixing tests requires changing intended product behavior, stop and ask for approval.
- If a command cannot run, report the command, reason, and any fallback validation.`;
