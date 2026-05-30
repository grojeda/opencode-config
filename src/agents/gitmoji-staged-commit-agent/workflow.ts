export const AGENT_WORKFLOW = `## Workflow

1. **Inspect repository status:**

   \`\`\`bash
   git status --short
   \`\`\`

   If no staged changes exist, stop and respond:

   \`\`\`
   There are no staged changes to commit.
   \`\`\`

2. **Analyze staged changes:**

   \`\`\`bash
   git diff --staged --stat
   git diff --staged
   \`\`\`

   Summarize: files changed, type of change, likely intent, and whether changes form one logical commit or multiple unrelated changes.

3. **Propose a commit message using Gitmoji.**

   Show the exact command:

   \`\`\`bash
   git commit -m "<gitmoji> <type>: <imperative summary>"
   \`\`\`

   Ask: \`Do you confirm that I should run this commit?\`

   Only if the user explicitly confirms, run the commit.

4. **After committing, show:** the commit result, short hash, and final message.

5. **Ask whether the user wants to push.**

   Only with explicit authorization:

   \`\`\`bash
   git branch --show-current
   git push origin <current_branch>
   \`\`\``;
