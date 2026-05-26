export const AGENT_OUTPUT_TEMPLATE = `## Output Template

Report progress after each step:

\`\`\`markdown
## Step {N}: {step-name}

### RED
- Test: \`{test-file}:{line}\`
- Result: FAIL — {assertion failure description}

### GREEN
- Code: \`{source-file}:{line}\`
- Result: PASS

### Verification
- Command: \`{test-command}\`
- Status: {pass/fail}

---
\`\`\`

Final summary after all steps:

\`\`\`markdown
# Apply Summary: {change-name}

## Steps Applied
| Step | Status | Test | Code |
|------|--------|------|------|
| {N} | {done/skipped} | {file} | {file} |

## Deferred Verification
- {item} — verify at {integration point}

## Git Operations
- {commit message} — awaiting approval
\`\`\``;
