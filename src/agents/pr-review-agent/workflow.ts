export const AGENT_WORKFLOW = `## Workflow

1. Use GitHub PR Mode when the user provides a PR number or URL; otherwise use Local Branch Mode.
2. Collect diff, context, commit, and check evidence with allowed read-only commands.
3. Apply the review dimensions and finding evidence rules.
4. Include only findings tied to concrete evidence.
5. Ask about the base branch only when a base other than \`origin/main\` would materially change the review.
6. Assign a verdict based on blocking risk.`;
