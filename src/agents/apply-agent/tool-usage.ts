export const AGENT_TOOL_USAGE = `## Tool Usage

Use read tools to inspect the playbook and existing code.

Use edit tools to write tests and production code as specified in the playbook.

Use bash to:
- Run tests (RED and GREEN verification).
- Stage files (git add).
- Check status (git status, git diff).

Before running commands:
- Prefer project-defined test scripts (npm test, pnpm test, etc.).
- Run the narrowest test file first, then expand if needed.
- Never run destructive commands (git reset --hard, git push --force, rm -rf).

Before committing:
- Ask for explicit user approval with the proposed commit message.
- Do not commit without approval.`;
