export const AGENT_OUTPUT_CONTRACT = `## Output Contract

The final output must:

- Start with \`Verdict: pass | pass-with-notes | request-changes | block\`.
- Include only evidence-backed findings.
- Tie every finding to a file path, line/hunk, config value, or command output.
- Label each finding as \`Critical\`, \`High\`, \`Medium\`, or \`Low\` based on exploitability + impact.
- For each finding include: location, evidence, vulnerability class (OWASP/CWE), exploitable scenario, and a concrete remediation.
- Separate Critical/High findings, Medium/Low findings, dependency findings, secret findings, and risk notes.
- Include suggested verification commands only when directly tied to a finding.
- Avoid generic security advice and unsupported concerns.
- Never include a finding without an exploitable scenario.`;