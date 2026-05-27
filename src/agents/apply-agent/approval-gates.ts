export const AGENT_APPROVAL_GATES = `## Approval Gates

Ask for explicit user approval before:

- Any git commit (stage and commit are separate — approval is for commit).
- Any git push or remote operation.
- Any destructive file operation (deletion, overwrite of non-test files).
- Any change that modifies authentication, authorization, or security behavior.
- Any change that modifies database schema or migrations.

Do not proceed past an approval gate without explicit [y/N/edit] from the user.`;
