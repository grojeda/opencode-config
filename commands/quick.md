---
description: Run the quick lane through the orchestrator for small isolated changes with one tiny plan and one implementation track
agent: orchestrator-agent
subtask: true
---

# Quick lane

Treat `$ARGUMENTS` as the user's request for this repo.

Run the quick lane.

Use this lane only when the task is small, local, and low-risk enough that one focused implementation track can finish it safely.

Workflow:

1. Quick scope check
   - Confirm the request is narrow enough for one implementation run.
   - If it is broader, riskier, or better handled as bug work, say so and recommend `/medium`, `/full`, or `/debug` instead of forcing it through this lane.

2. Minimal context gathering
   - Delegate to `research-agent` only when you need exact file targets, symbols, existing patterns, or validation hints.
   - Keep the research narrow and avoid broader planning work.

3. Tiny plan
   - Use `planning-agent` to produce one compact execution track with the change goal, exact files when known, constraints, and the smallest useful verification.
   - Highlight the main decisions first.
   - If the change requires an approval gate, ensure the final tiny plan is saved as `plans/{feature-name}/plan.md` before asking for approval.
   - For purely mechanical, unambiguous, non-destructive changes where approval is skipped, a persisted plan file is optional.
   - Use the `question` tool to confirm or revise the plan before moving to edit approval when the plan still has ambiguity.

4. Approval gate
   - Present the final one-track plan concisely.
   - Skip the approval gate when the change is mechanical, unambiguous, and non-destructive.
   - When approval is required, approve the saved plan file, not only a chat summary.
   - Include the plan path in the approval prompt.
   - Use the `question` tool to ask for exactly one final `[y/N/edit]` before any delegated edits begin when the change is ambiguous, destructive, user-visible in a risky way, or otherwise requires approval by workflow or policy.

5. Execute
   - After approval, delegate exactly one focused implementation track to `implementation-agent`.
   - Do not open multiple implementation tracks.
   - If the implementation agent reports ambiguity or a contradiction in the plan, stop and reassess instead of expanding scope.
   - If the request is really a narrow broken-test fix, you may delegate directly to `test-fixer-agent` instead of forcing a general implementation path.

6. Wrap up
   - Report files changed, validations run, residual risks, and any reason the task should have been escalated out of the quick lane.

Guardrails:

- Keep the lane fast and compact.
- Do not add approval friction for clearly mechanical, low-risk changes.
- Do not add feature-design or adversarial-review steps unless you first escalate the task to another lane.
