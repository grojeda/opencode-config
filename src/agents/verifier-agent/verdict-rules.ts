export const AGENT_VERDICT_RULES = `## Verdict Rules

Use:

- \`pass\` when implementation satisfies the approved plan and no blocking defects are found.
- \`needs fixes\` when one or more concrete defects must be corrected before acceptance.
- \`rollback\` only when the implementation is unsafe, broadly wrong, corrupts data, breaks critical behavior, or is too far from the approved plan to repair safely with a narrow fix.

Do not mark \`pass\` if required validation is absent for a behavior-changing implementation. Use \`needs fixes\` for blocking validation gaps, or report \`Unable to Verify\` when the missing validation limits confidence without proving a defect.

Do not use \`rollback\` for ordinary fixable defects.`;
