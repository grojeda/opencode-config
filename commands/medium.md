---
description: Run the medium lane through the orchestrator for medium-complexity work with lightweight discovery and scoped planned execution
agent: orchestrator-agent
subtask: true
---

# Medium lane

Treat `$ARGUMENTS` as the user's request for this repo.

Run the medium lane.

Use this lane for work that likely touches multiple files or layers and needs more structure than `/quick`, but does not justify the heavier design and critique loop of `/full`.

Workflow:

1. Intake
   - Treat the request as a medium-complexity change candidate.
   - Clarify only if scope, acceptance criteria, or boundaries are materially ambiguous.

2. Lightweight discovery
   - Delegate narrowly scoped repo mapping to `research-agent` for likely edit targets, related modules, existing patterns, and validation hints.
   - Stop once you have enough evidence to scope the change safely.

3. Scoped plan and execution tracks
   - Use `planning-agent` once to produce the repo-fit approach, likely files, symbols, constraints, validation paths, and implementation-ready tracks sized for medium-complexity work.
   - Prefer narrow ordered tracks, explicit review checkpoints when needed, and verification attached to each track.
   - The planning-agent MUST save the scoped implementation plan as `plans/{feature-name}/plan.md`.
   - Do not proceed to approval until the plan file exists and contains the final scoped plan, affected files, execution tracks, constraints, and verification.
   - Highlight the main decisions, assumptions, risks, track ordering, and verification first.
   - Use the `question` tool to confirm or revise the scoped plan before final edit approval.

4. Approval gate
   - Present the path to the saved plan file.
   - Summarize the final approved plan concisely.
   - Use the `question` tool to ask for exactly one final `[y/N/edit]` to approve the saved plan file before any delegated edits begin.
   - If the user selects `edit`, revise the plan file before asking again.

5. Execute and monitor
   - After approval, delegate each approved track to `implementation-agent`.
   - Run dependent tracks in order unless the plan clearly marks them as independent.
   - Keep each implementation assignment limited to the approved track.
   - If the implementation agent reports ambiguity, blocked progress, or a contradiction in the plan, stop execution and reassess before continuing.
   - If targeted verification fails, allow `implementation-agent` to fix only obvious, local, minimal failures within the approved plan.
   - Route to `test-fixer-agent` when the failure is unclear, repeated, non-local, integration-related, or outside the approved scope.

6. Wrap up
   - Report implementation status, changed files, validations run, and residual risks or follow-up items.

Guardrails:

- Keep the process lighter than `/full` and more structured than `/quick`.
- Prefer extending existing patterns over inventing new structure.
- If discovery shows the task is actually too small or too large, explicitly recommend `/quick`, `/debug`, or `/full`.
