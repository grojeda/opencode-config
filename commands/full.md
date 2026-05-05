---
description: Run full lane through the orchestrator with discovery, critique, planned implementation tracks, and approval gates
agent: orchestrator-agent
subtask: true
---

# Full lane

Treat `$ARGUMENTS` as the user's request for this repo.

Run full lane.

Use this lane for broader, riskier, or more architecture-sensitive feature work that needs explicit discovery, design checkpoints, critique, and narrow implementation delegation.

Workflow:

1. Intake
   - Clarify only what materially changes scope, acceptance criteria, or risk.

2. Discovery
   - Delegate codebase mapping to `research-agent`.
   - Ask for existing patterns, likely edit points, validation paths, and major risk areas.

3. Plan
   - Use `planning-agent` to draft a concrete implementation approach that fits existing repo patterns, including likely edit targets, validation approach, main tradeoffs, and major risks.
   - Prefer extending current abstractions over introducing new ones.
   - Present the main decisions, tradeoffs, and open risks first.
   - Use the `question` tool to confirm or revise the plan before critique.

4. Adversarial review
   - Send the plan to `reviewer-agent`.
   - If the work is unusually complex, you may use a second `reviewer-agent` pass.
   - Incorporate only evidence-backed objections and call out unresolved tradeoffs.
   - Present the reviewed plan concisely.
   - Use the `question` tool to confirm whether to proceed, revise, or stop before execution planning.

5. Execution plan
   - Delegate track planning to `planning-agent` using the approved plan and repo evidence.
   - Prefer narrow tracks with explicit ordering, dependencies, review checkpoints, exact files, symbols, constraints, and verification.
   - Expect an implementation-ready plan with as many narrow tracks as needed.
   - The final reviewed execution plan MUST be saved as `plans/{feature-name}/plan.md`.
   - The file must include the approved approach, review-driven changes, track ordering, dependencies, exact files, constraints, and verification.
   - Do not proceed to final approval until this file exists and represents the current final plan.

6. Approval gate
   - Present the path to the saved final execution plan.
   - Summarize track ordering, dependencies, verification, and unresolved risks.
   - Use the `question` tool to ask for exactly one final `[y/N/edit]` to approve the saved plan file before delegated edits begin.
   - If the user selects `edit`, revise the plan file and repeat the approval gate.

7. Execution
   - After approval, allocate the approved tracks to `implementation-agent`.
   - Execute dependent tracks in order unless the plan clearly marks them as independent.
   - Keep each implementation assignment limited to the exact approved track.
   - If any implementation pass reveals ambiguity or a contradiction in the plan, stop execution, reassess, and revise the plan before continuing.

8. Diagnostics and docs
   - If the approved workflow needs narrow test repair, delegate to `test-fixer-agent`.
   - If the approved workflow needs post-implementation auditing, delegate to `verifier-agent`.
   - If a specialized cleanup or documentation agent is implied by the request but unavailable in this repo, note the gap explicitly instead of inventing hidden process.

9. Wrap up
   - Use `verifier-agent` when the lane includes substantial implementation risk.
   - Report changed files, validations run, residual risks, and obvious next steps.

Guardrails:

- Preserve the granularity of the approved plan instead of collapsing it into broad workstreams.
- Prefer simple sequential execution when that reduces coordination risk.
- Do not merge multiple micro-tracks into a broader implementation assignment just to reduce the number of runs.
