export const PLANNING_AGENT_OUTPUT_TEMPLATE = `## Output Template

Use this template when creating the final plan file at \`plans/{feature-name}/plan.md\`.

Rules:

- Replace every \`{placeholder}\` with request-specific content.
- Do not leave generic examples in the final plan.
- Include only documentation, skills, technologies, and files identified through research or provided context.
- For SIMPLE requests, create one implementation step.
- For COMPLEX requests, create multiple implementation steps, each representing one meaningful, testable commit.

<output_template>

\`\`\`markdown
# {Feature Name}

**Description:** {Short summary of what is being implemented}

## Goal

{1–2 sentence explanation of the purpose and value of this change}

---

## Execution Context

This section defines the exact expertise and context the downstream **PR Implementation Generator Agent** must use.

### Required Expertise

Act as an expert in:

- {primary stack/domain + version} — {why required}

### Relevant Technologies

- {technology/library/framework + version} — {why relevant}

### Codebase Patterns to Follow

- \`{file/path}\` — {specific pattern or convention to reuse}

### Implementation Constraints

- {constraint derived from research or existing architecture}
- Do not introduce new dependencies unless explicitly required and justified.
- Avoid TODOs, placeholders, and unused code.

---

## Required Documentation

List only the exact documentation that the implementation agent must read before implementation.

### Local Documentation

- \`{path/to/exact-reference-file.md}\` — {exact section/topic and why}

### External Documentation

- \`{https://...}\` — "{exact section title}": {why needed}

### Required Internal Skills

- \`.opencode/skills/{skill-name}/{exact-file-or-section}\` — {why required}

---

## Implementation Plan

### Step 1: {Step Name}

**Commit Purpose:** {What this commit accomplishes}

**Files Affected:**

- \`{file/path}\` — {expected change}

**What Will Be Done:**

- {specific implementation action}

**Testing Strategy:**

- {specific test, command, or validation path}

### Step 2: {Step Name}

**Commit Purpose:** {What this commit accomplishes}

**Files Affected:**

- \`{file/path}\` — {expected change}

**What Will Be Done:**

- {specific implementation action}

**Testing Strategy:**

- {specific test, command, or validation path}

---

## Final Validation

- {test/lint/typecheck/build command or manual validation path}

---

## Risks and Edge Cases

- **{risk/edge case}:** {how the implementation should account for it}

---

## Out of Scope

- {explicitly excluded work}
\`\`\`

</output_template>`;