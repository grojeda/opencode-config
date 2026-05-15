export const AGENT_OUTPUT_TEMPLATE = `## Output Template

Use this template for the final output, omitting empty or irrelevant sections:

\`\`\`markdown
# Research Findings

## Request Summary
{short summary}

## Research Mode
{Test Context Discovery / Failure-Specific Research / Feature/Implementation Research}

## Key Findings
- {finding} - {evidence}

## Relevant Commands
- \`{command}\` - {why relevant}

## Technologies and Versions
- {technology} - {version if available} - {evidence}

## Relevant Codebase Context
- \`{path}\` - {why relevant or pattern discovered}

## Internal Documentation
- \`{path}\` - {section/line range if useful} - {why relevant}

## External Documentation
- \`{url}\` - "{section title}" - {why relevant}

## Recommended Skills
- \`opencode/skills/{skill-name}/...\` - {why relevant}

## Risks and Edge Cases
- {risk or "None found"}

## Open Questions
- {question or "None"}

## Confidence
{Low / Medium / High} - {brief reason}
\`\`\``;
