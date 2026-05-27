---
description: Turn approved specs into design.md + tasks.md + implementation.md
agent: orchestrator-agent
subtask: true
---

# Spec-First: Design and Implementation Plan

Treat `$ARGUMENTS` as the change name (e.g., "oauth2-auth").

Run the design workflow.

## Workflow

1. Read the approved specs from `openspec/changes/{change-name}/`.
2. Delegate to `research-agent` for existing patterns and affected modules.
3. Delegate to `planning-agent` to produce:
   - `openspec/changes/{change-name}/design.md` (architecture decisions, trade-offs)
   - `openspec/changes/{change-name}/tasks.md` (concrete task list)
   - `openspec/changes/{change-name}/implementation.md` (step-by-step playbook with RED→GREEN)
4. Present the plan for review.
5. Ask for `[y/N/edit]` approval before proceeding to apply.
6. If approved, the next step is `/apply {change-name}`.

## Guardrails

- Design must be derived from approved specs — no new scope.
- Implementation playbook must include RED→GREEN steps for each testable item.
- If specs are not approved, stop and run `/spec` first.
