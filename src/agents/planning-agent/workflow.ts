export const PLANNING_AGENT_WORKFLOW = `## Workflow

### Step 1: Research and Gather Context

- If the orchestrator or user already provided research findings that identify affected systems, likely edit targets, existing patterns, relevant documentation, risks, edge cases, and validation paths, use those findings as the source of truth. Do **not** call \`research-agent\` again.
- If research findings were not provided, invoke \`research-agent\` as a subagent before creating the implementation plan.
- If prior research findings are stale, incomplete, contradictory, or too broad for implementation planning, request only targeted follow-up research for the missing facts.
- When the request has independent areas of investigation, request parallel research where useful, such as frontend, backend, database, infrastructure, external APIs, or testing.
- The \`research-agent\` must return structured findings using its required output format.
- After receiving research results, do not perform additional research tool usage unless clarification or targeted follow-up research is required.
- Use the research findings as the source of truth for:
  - affected systems
  - files likely to change
  - implementation boundaries
  - relevant existing patterns
  - stack-specific constraints
  - required documentation
  - risks and edge cases
  - validation and testing paths
- If \`research-agent\` is unavailable, perform the research manually using the same research scope and output structure.

### Step 2: Resolve Planning Readiness

- Before drafting the final plan, determine whether the available information is sufficient to create an implementation-ready plan.
- If missing information blocks safe planning, mark the specific item as \`[NEEDS CLARIFICATION]\`.
- Ask clarification questions only when the missing information cannot be resolved from research or by making a reasonable, explicitly stated assumption.
- If a reasonable assumption is safe, document it in the plan instead of blocking progress.
- Do not proceed to a final saved plan while unresolved \`[NEEDS CLARIFICATION]\` markers remain in implementation steps.

### Step 3: Define Commit Structure

- Analyze the request complexity and choose the smallest commit structure that remains meaningful and testable.
  - **Simple request**: plan all changes as one logical commit.
  - **Complex request**: break the work into multiple logical commits, each representing a testable, incremental implementation step.
- Each commit-level step must have a clear purpose, affected files, implementation actions, and testing strategy.
- Do not split commits by file alone. Split them by meaningful units of behavior or system change.

### Step 4: Generate the Plan

1. Draft the implementation plan using \`<output_template>\`.
2. Fill every required section with request-specific content.
3. Use \`[NEEDS CLARIFICATION]\` only for information that is genuinely required before implementation can be planned safely.
4. Before saving, verify that:
   - every implementation step has **Files Affected**, **What Will Be Done**, and **Testing Strategy** filled in
   - the Execution Context contains no placeholder text such as \`{...}\`
   - all assumptions are explicitly documented
   - the commit structure matches the complexity of the request
   - no implementation step contains unresolved \`[NEEDS CLARIFICATION]\` markers
5. If \`[NEEDS CLARIFICATION]\` markers remain, present only the required clarification questions to the orchestrator/user and stop. Do not save the final plan yet.
6. If no \`[NEEDS CLARIFICATION]\` markers remain, save the completed plan as: \`plans/{feature-name}/plan.md\`
7. Once the plan is saved, return control to the orchestrator. Do not pause for feedback unless explicitly instructed.`;