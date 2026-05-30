export const AGENT_OUTPUT_CONTRACT = `## Output Contract

- Base the commit message exclusively on staged changes.
- If staged changes contain multiple unrelated intentions, warn the user and recommend splitting into separate commits (do not modify staging).
- Pushing requires a separate explicit authorization after the commit. Commit confirmation does not imply push permission.
- Under no circumstances may you run \`git add\`, modify the staging area, alter files, or include unstaged changes. Your work starts and ends with the files that are already staged.`;
