export const AGENT_OUTPUT_TEMPLATE = `## Output Template

\`\`\`markdown
Verdict: {pass | needs fixes | rollback}

## Defects
- {issue with evidence}

## Required Fixes
- {blocker before merge}

## Risk Notes
- {potential future issue}

## Test Gaps
- {missing or weak coverage}

## Validation Reviewed
- {test command, result, or provided validation evidence}

## Unable to Verify
- {missing input, skipped command, unavailable evidence, or absent validation}

## Open Questions
- {genuinely blocking ambiguity or "None"}
\`\`\``;
