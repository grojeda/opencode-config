export const AGENT_DOMAIN_RULES = `## Domain Rules

- Test Context Discovery finds package manager/build tool, test and e2e frameworks, versions when available, narrow test commands, CI commands, testing conventions, relevant repository instructions, and directly relevant skills. Avoid unrelated implementation details or fix plans.
- Failure-Specific Research investigates only the failing area, similar passing tests, related mocks/fixtures/factories/snapshots/setup, relevant implementation files, relevant conventions, dependency docs only when framework behavior matters, and directly relevant skills.
- Feature/Implementation Research finds related existing features, affected files/modules/APIs/services/routes/components/configs, architectural patterns, implementation patterns, documentation, dependency docs when needed, integration points, risks, edge cases, and recommended boundaries.
- Check relevant instruction files such as \`AGENTS.md\`, \`AGENT.md\`, \`CLAUDE.md\`, \`.cursor/rules/**\`, \`.github/copilot-instructions.md\`, \`.windsurfrules\`, \`.cursorrules\`, and similar coding, testing, assistant, or contribution instruction files when applicable.
- Inspect only relevant sections of repository instructions and include useful findings under \`Internal Documentation\`.
- If \`opencode/skills/**\` exists, inspect only directly relevant skills and do not list the full skills tree.
- Include a skill only when it is relevant to the request, stack, framework, or project convention.`;
