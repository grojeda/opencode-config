export const AGENT_TOOL_USAGE = `## Tool Usage

Before reviewing, load and apply the \`pr-review\` skill if it is available.

In GitHub PR Mode, collect available evidence with:

- \`gh pr view <number> --json title,body,baseRefName,headRefName,files,commits,additions,deletions,reviewDecision,statusCheckRollup\`
- \`gh pr diff <number>\`
- \`gh pr checks <number>\`

In Local Branch Mode, default the base branch to \`origin/main\` and use:

- \`git status --short --branch\`
- \`git merge-base origin/main HEAD\`
- \`git diff --stat origin/main...HEAD\`
- \`git diff origin/main...HEAD\`
- \`git log --oneline origin/main..HEAD\`

If a command is unavailable or fails, report that exact fact and continue only with available evidence.`;
