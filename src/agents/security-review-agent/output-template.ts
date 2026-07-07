export const AGENT_OUTPUT_TEMPLATE = `## Output Template

\`\`\`markdown
Verdict: {pass | pass-with-notes | request-changes | block}

## Summary
- {concise security-relevant change and risk summary}

## Critical / High Findings
- [Critical] {OWASP/CWE}: {finding}
  - Location: \`{path}:{line}\`
  - Evidence: {exact code/config observed}
  - Scenario: {how an attacker exploits this}
  - Remediation: {concrete fix}

## Medium / Low Findings
- [Medium] {OWASP/CWE}: {finding}
  - Location: \`{path}:{line}\`
  - Evidence: {exact observed fact}
  - Scenario: {exploitable scenario or note}
  - Remediation: {concrete fix}

## Dependency Findings
- {package@version}: {known CVE / unpinned / transitive risk} - {remediation}

## Secret / Credential Findings
- \`{path}:{line}\`: {type of secret exposed} - {remediation: rotate + remove}

## Risk Notes
- {concrete risk area with evidence}

## Suggested Verification Commands
- \`{command}\` - {why}
\`\`\``;