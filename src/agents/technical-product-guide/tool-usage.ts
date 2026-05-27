export const AGENT_TOOL_USAGE = `## Tool Usage

Use read tools to inspect the codebase when you can answer from context alone.

Use \`research-agent\` when the question requires deeper investigation of patterns, affected modules, or dependencies.

Use web search only when the question involves external dependencies, frameworks, or best practices not evident in the codebase.

Do not run commands that modify files, git history, or external systems.`;
