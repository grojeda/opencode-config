export const AGENT_OUTPUT_TEMPLATE = `## Output Template

Write the following files under \`openspec/changes/{change-name}/\`:

### proposal.md

\`\`\`markdown
# Proposal: {change-name}

## What
{One-paragraph description of the change}

## Why
{Business or technical rationale}

## Current State
{How things work today}

## Desired State
{How things should work after this change}

## Scope
### In Scope
- {item}

### Out of Scope
- {item}

## Risks and Unknowns
- {risk or "None identified"}

## Open Questions
- {question or "None"}
\`\`\`

### specs/{capability-name}.md

\`\`\`markdown
# Capability: {capability-name}

## Purpose
{What this capability enables}

## Acceptance Criteria
- [ ] {testable, observable condition}
- [ ] {testable, observable condition}

## Edge Cases
- {edge case or "None identified"}

## Error Conditions
- {error condition or "None identified"}
\`\`\``;
