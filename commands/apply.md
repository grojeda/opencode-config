---
description: Execute the implementation playbook step-by-step with RED→GREEN discipline
agent: orchestrator-agent
subtask: true
---

# Spec-First: Apply Implementation

Treat `$ARGUMENTS` as the change name (e.g., "oauth2-auth").

Run the apply workflow.

## Workflow

1. Read the implementation playbook from `openspec/changes/{change-name}/implementation.md`.
2. Delegate to `apply-agent` to execute step-by-step:
   - RED: write failing test, confirm assertion failure.
   - GREEN: write minimal code, confirm test passes.
   - Commit after explicit user approval.
3. Report progress after each step.
4. After all steps, delegate to `verifier-agent` for final audit.

## Guardrails

- Apply-agent must not deviate from the playbook.
- Every git commit requires explicit user approval.
- If a step fails, stop and report — do not improvise.
