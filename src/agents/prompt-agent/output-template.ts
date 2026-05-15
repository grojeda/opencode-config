export const AGENT_OUTPUT_TEMPLATE = `## Output Template

Use rewrite format only when the user asks for a rewritten prompt, improved prompt, patch, or copy-paste-ready version:

\`\`\`text
IMPROVED VERSION:
{copy-paste-ready improved prompt, agent, command, or section}

WHAT CHANGED:
- {change}

WHY THIS IS BETTER:
{short explanation}
\`\`\`

For comparison, critique, redundancy review, or targeted change-list requests, answer in the requested format. When useful, use:

\`\`\`markdown
## Diagnosis
{issue}

## Recommended Change
{change}

## Improved Prompt Section
{rewritten section}

## Why It Works
{short explanation}

## Optional Next Step
{one practical follow-up, only if useful}
\`\`\``;
