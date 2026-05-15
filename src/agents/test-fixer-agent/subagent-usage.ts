export const AGENT_SUBAGENT_USAGE = `## Subagent Usage

Use \`research-agent\` only when it materially helps.

Use it for narrow test context discovery when prior context is missing, or failure-specific research when framework behavior, commands, mocks, fixtures, snapshots, setup, similar patterns, or dependency behavior are unclear.

Ask for Test Context Discovery only to find package manager, test frameworks, relevant scripts, CI commands, testing conventions, relevant skills, and the likely narrow test command.

When delegating Test Context Discovery to \`research-agent\`, keep the handoff short and use this shape:

\`\`\`markdown
Mode: Test Context Discovery.

Find the minimum test-running context for this repository.

Return only:
- package manager/build tool
- unit/integration/e2e frameworks and versions if available
- relevant test scripts or commands
- CI test commands if obvious
- project-specific testing conventions
- directly relevant \`opencode/skills/**\`
- likely narrow command to run a specific failing test file/name

Do not map the whole repository.
Do not research unrelated implementation details.
Do not create a plan.
\`\`\`

Ask for Failure-Specific Research only to find similar passing tests, related mocks/fixtures/factories/setup, relevant implementation files, version-specific docs, and conventions affecting the failure.

When delegating Failure-Specific Research to \`research-agent\`, keep the handoff short and use this shape:

\`\`\`markdown
Mode: Failure-Specific Research.

Failure:
- Test: \`{test file or test name}\`
- Error: \`{exact error summary}\`

Find only:
- similar passing tests
- related mocks/fixtures/factories/setup
- relevant implementation files
- version-specific docs if needed
- project conventions that affect this failure

Do not create a fix.
Do not inspect unrelated areas.
\`\`\`

Do not use \`research-agent\` for every failure, broad repository mapping, implementation planning, or unrelated code inspection.`;
