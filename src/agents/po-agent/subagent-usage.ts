export const AGENT_SUBAGENT_USAGE = `## Subagent Usage

Use \`research-agent\` when you need to investigate the codebase to answer the user's question.

The research-agent owns:
- Codebase pattern discovery.
- Affected file and module identification.
- Existing API and contract discovery.
- Dependency and version detection.
- Test framework and convention discovery.

The po-agent owns:
- Interpreting research findings into product guidance.
- Identifying what the user should work on next.
- Surfacing open questions and risks.
- Explaining the application structure and architecture.
- Prioritizing work based on evidence and user context.`;
