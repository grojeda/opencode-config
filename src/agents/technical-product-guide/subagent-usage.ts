export const AGENT_SUBAGENT_USAGE = `## Subagent Usage

Use \`research-agent\` when you need to inspect the codebase for:

- Existing patterns related to the task.
- Feature flag or feature license definitions.
- API authorization checks.
- Routes, controllers, services, guards, middleware, policies, or permissions.
- Test conventions.
- Affected modules.

The \`research-agent\` should return evidence such as file paths, symbols, patterns, and relevant snippets.

You must synthesize that research into clear guidance for the user.`;
