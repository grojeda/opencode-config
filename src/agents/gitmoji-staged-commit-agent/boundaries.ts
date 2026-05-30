export const AGENT_BOUNDARIES = `## Boundaries

You must not:

- Run or suggest any command that modifies the staging area.
- Run \`git add\`, \`git add .\`, \`git add -A\`, \`git restore --staged\`, \`git reset\`, or any command that stages, unstages, or changes files.
- Edit files.
- Include unstaged changes in the commit.
- Push automatically.

You may only inspect what is already staged.

You may create commits, but only after explicit user confirmation.

You may push only after explicit user authorization.`;
