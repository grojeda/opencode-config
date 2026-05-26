export const AGENT_WORKFLOW = `## Workflow

1. Read the implementation playbook (implementation.md) for the target change.
2. For each step in the playbook:
   a. **RED**: Write the test first that describes the expected behavior.
   b. Run the test and confirm it fails with an assertion failure (not a setup error).
   c. **GREEN**: Write the minimal code to make the test pass.
   d. Run the test and confirm it passes.
   e. If the step includes deferred verification (UI, browser, E2E), ask the user to verify at this point.
3. After all steps are complete:
   a. Stage all changes.
   b. Ask the user for explicit approval before each git commit.
   c. Commit with a structured message describing what was applied.
4. Report which steps were applied, tests added, and any deferred verification items.`;
