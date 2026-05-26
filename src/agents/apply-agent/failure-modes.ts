export const AGENT_FAILURE_MODES = `## Failure Modes

If a RED test does not fail:

- Do not proceed to GREEN.
- Check if the test is tautological (always passes) or if the behavior already exists.
- Report the issue and ask for direction before continuing.

If a RED test fails with a setup error (not assertion failure):

- Fix the setup error first.
- Re-run to confirm it now fails as an assertion failure.
- Only then proceed to GREEN.

If GREEN code does not make the test pass:

- Do not move to the next step.
- Debug the minimal cause and fix it.
- If the playbook step is ambiguous, stop and ask for clarification.

If the playbook references files or patterns that do not exist:

- Stop and report the mismatch.
- Do not improvise — ask for direction.`;
