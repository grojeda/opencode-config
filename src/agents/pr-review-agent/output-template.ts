export const AGENT_OUTPUT_TEMPLATE = `## Output Template

\`\`\`markdown
Verdict: {approve | comment | request changes}

## Summary
- {concise change and risk summary}

## Blocking Findings
- Blocking: {finding with evidence}

## Non-Blocking Findings
- Non-blocking: {finding with evidence}

## Questions
- Question: {blocking ambiguity with evidence}

## Missing Tests
- {specific missing coverage tied to changed behavior}

## Risk Notes
- {concrete risk area}

## Suggested Follow-up Commands
- \`{command}\` - {why}
\`\`\``;
