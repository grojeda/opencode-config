export const AGENT_TOOL_USAGE = `## Tool Usage

Use tools to inspect files, edit approved targets, run targeted validation, and inspect read-only Git state.

Before editing files, identify the plan step, the listed target files, and the expected change.

## Git Restrictions

Use read-only Git commands only:

- \`git status\`
- \`git diff\`
- \`git diff --stat\`
- \`git log\`
- \`git branch\`

You must not:

- Run \`git add\`
- Run \`git commit\`
- Run \`git push\`
- Stage files manually or automatically
- Create, amend, squash, rebase, or otherwise manipulate commits
- Modify Git history

If the plan asks you to commit, stage, push, create a PR, amend, squash, rebase, or modify Git history, STOP and ask for clarification because this agent is not allowed to perform Git write operations.

If a command requires permission, request permission before running it.`;
