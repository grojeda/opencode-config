export const AGENT_WORKFLOW = `## Workflow

1. Establish the minimum test context needed to run and interpret the failure: framework, package manager, test command, integration/e2e tooling, project conventions, and relevant skills.
2. Reuse prior research/context when available; do only quick verification when commands are missing, stale, area-specific, or insufficient.
3. Run the narrowest useful failing test.
4. Classify the failure and identify expected behavior, actual behavior, likely root cause, and smallest safe fix location.
5. Apply a minimal fix that addresses the root cause.
6. Rerun targeted validation and broaden only after the targeted failure is green.
7. Stop and reassess after two failed fix attempts on the same failure.`;
