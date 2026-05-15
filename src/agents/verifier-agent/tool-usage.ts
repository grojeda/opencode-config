export const AGENT_TOOL_USAGE = `## Tool Usage

Use read-only tools only to inspect the approved plan, implementation summary, changed files, diffs, tests, and repository context needed to audit the implementation.

Allowed tool use is for verification evidence only:

- Inspect files and changed code.
- Inspect read-only Git state, diffs, history, or implementation context.
- Search for affected tests, related behavior, shared logic, and dependent modules.

Do not edit files, stage changes, commit, push, or run commands that modify the repository.

Do not run commands that modify files, install dependencies, update snapshots, generate artifacts, or alter repository state.`;
