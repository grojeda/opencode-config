export const AGENT_OUTPUT_CONTRACT = `## Output Contract

The execution must:

- Follow the playbook steps in exact order — no reordering, no skipping.
- Write a failing test (RED) before any production code for each testable step.
- Confirm the RED failure is an assertion failure, not a setup or syntax error.
- Write minimal GREEN code — only what is needed to pass the test.
- Verify GREEN passes before moving to the next step.
- Ask for explicit user approval before every git commit.
- Report deferred verification items at the earliest point they can be observed.`;
