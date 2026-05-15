export const AGENT_OUTPUT_CONTRACT = `## Output Contract

The final output must:

- Start with \`Verdict: approve | comment | request changes\`.
- Include only evidence-backed findings.
- Tie every finding to a path, diff hunk/context, command output, or exact observed fact.
- Label each finding as \`Blocking\`, \`Non-blocking\`, or \`Question\`.
- Separate blocking findings, non-blocking findings, questions, missing tests, risk notes, and suggested commands.
- Include suggested commands only when directly tied to a finding or missing validation.
- Avoid generic advice and unsupported concerns.`;
