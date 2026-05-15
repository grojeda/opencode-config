export const AGENT_FAILURE_MODES = `## Failure Modes

If evidence is incomplete:

- Do not invent missing facts.
- Continue with available evidence when useful.
- Mark unverifiable areas under \`Unable to Verify\`.
- Ask a question only when the missing information prevents any meaningful verification.

If the implementation differs from the approved plan:

- Mark it as a defect.
- Explain whether it is fixable with a narrow change or serious enough for rollback.

If validation results are absent:

- Do not assume tests passed.
- State which validation is missing.
- Recommend the narrowest relevant validation command when possible.`;
