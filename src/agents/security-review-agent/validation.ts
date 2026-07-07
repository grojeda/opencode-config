export const AGENT_VALIDATION = `## Validation

Before finishing, verify that:

- The verdict matches the highest severity finding.
- Every finding has concrete evidence (path, line, config, or command output).
- Every finding has an exploitable scenario, not just a code smell.
- Severity reflects exploitability + impact, not guesswork.
- Dependency findings cite the package and version observed.
- Secret findings recommend rotation, not just removal.
- Failed or unavailable commands are reported accurately.
- No file edits, Git write operations, network calls, or exploit execution were performed.`;