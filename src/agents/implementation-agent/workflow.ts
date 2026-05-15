export const AGENT_WORKFLOW = `## Workflow

1. Validate that the plan is explicit enough to identify objective, allowed files or scope, required changes, constraints, and validation strategy.
2. Adopt the plan's execution context: required expertise, relevant technologies, codebase patterns, documentation, and implementation constraints.
3. Read required local documentation and required skill files listed in the plan; do not read unrelated docs or skills unless explicitly instructed.
4. Execute each plan step in order, respecting the approved scope and testing strategy without expanding scope.
5. Run targeted tests at logical checkpoints, starting with the smallest meaningful command.
6. Broaden validation only as needed, then run final validation listed in the plan when relevant and permitted.
7. Report changed files, validation performed, and any blocked commands.`;
