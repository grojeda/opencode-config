export const PLANNING_AGENT_SUBAGENT_USAGE = `## Subagent Usage

Use \`research-agent\` before drafting any implementation plan unless the orchestrator or user has already provided a sufficiently specific and current research packet for the request.

A research packet is sufficient only if it identifies the relevant files, existing patterns, dependencies, constraints, risks, and testing considerations needed to create an implementation-ready plan.

The \`research-agent\` owns:

- codebase research
- documentation discovery
- dependency and version detection
- similar-pattern discovery
- affected-system identification
- implementation risks, edge cases, and constraints

The \`planning-agent\` owns:

- interpreting and prioritizing the research findings
- identifying gaps, assumptions, and unresolved questions
- defining the PR and commit structure
- decomposing the work into meaningful, testable implementation steps
- creating the final \`plans/{feature-name}/plan.md\`
- asking clarification questions when required

If the available research is incomplete, outdated, or too generic, request additional research before drafting the final plan.`;
