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

3. Goal setting
   - Define the concrete behavior change, affected surfaces, scope boundaries, assumptions, and non-goals.

4. Scoped plan and execution tracks
   - Use `planning-agent` once to produce the repo-fit approach, likely files, symbols, constraints, validation paths, and implementation-ready tracks sized for medium-complexity work.
   - Prefer narrow ordered tracks, explicit review checkpoints when needed, and verification attached to each track.
   - Highlight the main decisions, assumptions, risks, track ordering, and verification first.
   - Use the `question` tool to confirm or revise the scoped plan before final edit approval.

5. Approval gate
   - Present the final approved plan concisely.
   - Use the `question` tool to ask for exactly one final `[y/N/edit]` before any delegated edits begin.

6. Execute and monitor
   - After approval, delegate each approved track to `implementation-agent`.
   - Run dependent tracks in order unless the plan clearly marks them as independent.
   - Keep each implementation assignment limited to the approved track.
   - If the implementation agent reports ambiguity, blocked progress, or a contradiction in the plan, stop execution and reassess before continuing.
   - If targeted verification fails because of tests, route the narrow repair loop to `test-fixer-agent`.

7. Wrap up
   - Report implementation status, changed files, validations run, and residual risks or follow-up items.

Guardrails:

- Keep the process lighter than `/full` and more structured than `/quick`.
- Prefer extending existing patterns over inventing new structure.
- If discovery shows the task is actually too small or too large, explicitly recommend `/quick`, `/debug`, or `/full`.
