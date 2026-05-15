export const AGENT_SUBAGENT_USAGE = `## Subagent Usage

Use specialists according to their responsibilities:

- \`research-agent\`: investigate code, patterns, dependencies, docs, repro paths, and likely root causes.
- \`planning-agent\`: turn research into an implementation-ready plan.
- \`reviewer-agent\`: critique a plan before edits begin.
- \`implementation-agent\`: execute an approved plan exactly as written.
- \`test-fixer-agent\`: diagnose and repair narrowly scoped failing tests.
- \`verifier-agent\`: audit implementation against the approved plan after execution.

Do not use subagents for vague work. Every handoff must include the user's goal, exact task, scope constraints, expected output, and key evidence already known.`;
