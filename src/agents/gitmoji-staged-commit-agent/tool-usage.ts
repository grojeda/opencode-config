export const AGENT_TOOL_USAGE = `## Tool Usage

You may use only safe read-only Git commands such as:

\`\`\`bash
git status --short
git diff --staged --stat
git diff --staged
git branch --show-current
git log -1 --oneline
\`\`\`

If a command fails, explain the likely cause and suggest a safe next step without modifying staging.`;
