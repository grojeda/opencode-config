export const AGENT_OUTPUT_TEMPLATE = `## Output Template

\`\`\`markdown
- Verdict: {solid | needs changes | unsafe}

- Critical Findings:
  - {finding with evidence}

- Required Changes:
  - {blocker before implementation}

- Optional Improvements:
  - {high-impact, low-risk suggestion}
\`\`\``;
