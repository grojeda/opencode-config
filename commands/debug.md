---
description: Run the debug lane using the repo agents from evidence to root cause to a narrow fix
agent: orchestrator-agent
subtask: true
---

Treat `$ARGUMENTS` as the user's bug report or debugging request for this repo.

Run the debug lane using the agents defined in `agents/`.

Use this lane when the work is primarily about understanding symptoms, finding a root cause, and driving the smallest safe fix.

Workflow:

1. Triage
   - Start with an evidence-first debugging pass. Summarize the symptom, expected vs actual behavior, likely regression signal, and current definition of done.
   - Ask only the minimum clarifying questions needed to avoid debugging the wrong problem.

2. Map the failure
   - Delegate to `research-agent` for entrypoints, suspect files, repro paths, relevant tests, existing patterns, and ranked root-cause candidates unless the user already supplied enough evidence.
   - Keep the output concise and evidence-based. Prefer one likely path over broad exploration.

3. Hypothesis
   - State the most likely root cause and the evidence supporting it.
   - Name one falsification check so the fix does not become guesswork.
   - Present the hypothesis concisely with the main decision first.
   - Use the `question` tool to confirm or revise the hypothesis before finalizing the fix plan when the evidence is incomplete or multiple plausible interpretations remain.

4. Fix plan
   - Use `planning-agent` to write the smallest targeted change set with exact files, symbols, constraints against drive-by refactors, and the most relevant verification.
   - The plan must be implementation-ready and stay within a single narrow fix.
   - The fix plan MUST be saved as `plans/{feature-name}/plan.md` before approval.
   - The saved plan must include the root-cause hypothesis, affected files, exact fix scope, constraints, and verification.

5. Critique
   - Use `reviewer-agent` when the risk is non-trivial, the fix touches shared code, or the hypothesis depends on subtle assumptions.
   - Present the fix plan concisely, including affected files, verification, and any review-driven changes.
   - Use the `question` tool to confirm whether to proceed, revise, or stop before final edit approval.

6. Approval gate
   - Present the path to the saved fix plan.
   - Summarize the final approved plan concisely.
   - Use the `question` tool to ask for exactly one final `[y/N/edit]` to approve the saved plan file before any delegated edits begin.
   - If the user selects `edit`, revise the plan file before asking again.

7. Execution
   - After approval, delegate the plan to `implementation-agent`.
   - If implementation reveals that the plan is incomplete, ambiguous, or contradicted by the codebase, stop and re-plan from evidence instead of improvising.
   - If the main failure is a broken or incomplete test rather than product code, hand off the minimal repair loop to `test-fixer-agent`.
   - If implementation causes targeted tests to fail, allow `implementation-agent` to fix only obvious, local, minimal failures within the approved plan; route to `test-fixer-agent` when the failure is unclear, repeated, non-local, integration-related, or outside the approved scope.

8. Verify and wrap
   - Use `verifier-agent` to audit the implemented change against the approved plan when the change is non-trivial.
   - Confirm the most relevant repro path or failing test is addressed.
   - Report what was fixed, what remains uncertain, validations run, and any follow-up checks.

Guardrails:

- Keep the narrative evidence-first.
- Prefer one primary hypothesis over a long list.
- Do not broaden the fix into unrelated cleanup unless the evidence shows it is required.
- Keep delegation aligned with actual agent responsibilities:
  - `research-agent` for investigation
  - `planning-agent` for the fix plan
  - `reviewer-agent` for adversarial critique
  - `implementation-agent` for approved edits
  - `test-fixer-agent` for targeted failing-test repair
  - `verifier-agent` for post-implementation audit
