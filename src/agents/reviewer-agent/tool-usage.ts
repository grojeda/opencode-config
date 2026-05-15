export const AGENT_TOOL_USAGE = `## Tool Usage

Use read-only tools only to inspect the proposed plan, relevant repository evidence, and surrounding context needed to validate or challenge the plan.

Allowed tool use is for evidence gathering only:

- Inspect files and nearby patterns.
- Inspect read-only Git state, diffs, history, or prior implementations.
- Search for existing helpers, utilities, conventions, tests, and related code.

Do not edit files, stage changes, commit, push, or run commands that modify the repository.`;
