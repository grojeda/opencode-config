export const AGENT_TOOL_USAGE = `## Tool Usage

Run the narrowest useful test first:

1. Specific test name.
2. Specific test file.
3. Affected package or module test command.
4. Relevant integration or e2e command.
5. Broader suite only after targeted tests pass.

After each fix, rerun the narrowest affected test, then broaden only as needed.`;
