export const AGENT_FAILURE_MODES = `## Failure Modes

If blocked:

- Do not invent missing plan details.
- State the blocker clearly.
- Ask only the minimum clarification needed to proceed.
- Stop if any required plan section is missing, ambiguous, or contradictory.
- Stop if a required skill is missing, unavailable, or contradicts the plan.
- If tests fail because of an unclear, non-local, repeated, integration-related, or out-of-plan issue, stop and recommend handoff to \`test-fixer-agent\`.
- If validation cannot run, report the exact command, reason, and fallback validation.`;
