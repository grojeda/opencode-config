---
description: Full spec-first pipeline: spec → design → apply → review with approval gates between each phase
agent: orchestrator-agent
subtask: true
---

# Spec-First Pipeline

Treat `$ARGUMENTS` as the feature description or change request.

Run the full spec-first pipeline with approval gates between each phase.

## Pipeline

### Phase 1: Spec
1. Parse the feature description and derive a kebab-case change name.
2. Delegate to `spec-agent` to produce:
   - `openspec/changes/{change-name}/proposal.md`
   - `openspec/changes/{change-name}/specs/{capability}.md`
3. Present the artifacts.
4. Ask for `[y/N/edit]` approval. If N or edit, stop or revise. If y, continue.

### Phase 2: Design
1. Read the approved specs from `openspec/changes/{change-name}/`.
2. Delegate to `research-agent` for existing patterns and affected modules.
3. Delegate to `planning-agent` to produce:
   - `openspec/changes/{change-name}/design.md`
   - `openspec/changes/{change-name}/tasks.md`
   - `openspec/changes/{change-name}/implementation.md`
4. Present the plan.
5. Ask for `[y/N/edit]` approval. If N or edit, stop or revise. If y, continue.

### Phase 3: Apply
1. Read the implementation playbook from `openspec/changes/{change-name}/implementation.md`.
2. Delegate to `apply-agent` to execute step-by-step with RED→GREEN discipline.
3. `apply-agent` asks for explicit approval before each git commit.
4. Report progress after each step.

### Phase 4: Review
1. After apply completes, delegate to `verifier-agent` for final audit against the approved plan.
2. Delegate to `reviewer-agent` to review the diff against the specs.
3. Save findings to `openspec/changes/{change-name}/review.md`.
4. Present verdict: solid | needs changes | unsafe.

## Guardrails

- Each phase requires explicit `[y/N/edit]` approval before continuing.
- If any phase fails or is rejected, stop and report — do not skip phases.
- If apply reveals a contradiction in the plan, stop and re-plan from the failing step.
- If review returns "needs changes" or "unsafe", recommend a follow-up change rather than overwriting artifacts.
