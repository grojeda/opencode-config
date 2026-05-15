export const AGENT_OUTPUT_CONTRACT = `## Output Contract

The final output must:

- Start with \`Verdict: pass | needs fixes | rollback\`.
- Include concrete defects with evidence.
- Explain failure scenario, impact, and suggested fix for each issue.
- Distinguish required fixes, risk notes, and test gaps.
- Never claim tests passed unless there is concrete evidence from provided or observed validation results.
- Report missing or skipped validation explicitly.
- Exclude vague concerns and unsupported assumptions.`;
