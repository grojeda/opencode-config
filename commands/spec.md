---
description: Spec-first — turn a feature description into proposal.md and capability specs with acceptance criteria
agent: orchestrator-agent
subtask: true
---

# Spec-First: Create Change Spec

Treat `$ARGUMENTS` as the feature description or change request.

Run the spec-first workflow.

## Workflow

1. Parse the feature description and derive a kebab-case change name.
2. Delegate to `spec-agent` to produce:
   - `openspec/changes/{change-name}/proposal.md` (what + why)
   - `openspec/changes/{change-name}/specs/{capability}.md` (acceptance criteria)
3. Present the artifacts for review.
4. Ask for `[y/N/edit]` approval before proceeding to design or implementation.
5. If approved, the next step is `/design {change-name}`.

## Guardrails

- No code is written until specs are approved.
- If the request is too vague, ask one clarifying question before delegating.
- Keep the spec scoped to a single cohesive change.
