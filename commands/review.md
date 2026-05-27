---
description: Review the implemented change across multiple dimensions
agent: orchestrator-agent
subtask: true
---

# Spec-First: Review Implementation

Treat `$ARGUMENTS` as the change name (e.g., "oauth2-auth").

Run the review workflow.

## Workflow

1. Read the specs from `openspec/changes/{change-name}/specs/`.
2. Get the diff of implemented changes vs parent branch.
3. Delegate to `reviewer-agent` to review across dimensions:
   - Correctness and bugs.
   - Spec alignment (does code match acceptance criteria?).
   - Maintainability and patterns.
   - Test coverage.
   - Security triage (recommend `/security` if auth, input, crypto touched).
   - Performance triage (recommend `/performance` if queries, loops, hot paths touched).
4. Save review findings to `openspec/changes/{change-name}/review.md`.
5. Present findings with verdict: solid | needs changes | unsafe.

## Guardrails

- Review is diff-scoped by default.
- Do not perform deep SAST or profiling — triage only.
- If review finds follow-up work, recommend a new change rather than overwriting artifacts.
