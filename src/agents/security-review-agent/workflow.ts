export const AGENT_WORKFLOW = `## Workflow

1. Determine review mode: GitHub PR Mode (PR number/URL provided), Local Branch Mode (default base \`origin/main\`), or Full Repo Mode (no diff base, review requested paths).
2. Collect diff, context, dependency manifests, and config evidence with allowed read-only commands.
3. Map changed/affected code to the vulnerability classes in Domain Rules.
4. For each candidate finding, confirm the sink/source path is reachable and exploitable before reporting.
5. Check dependency manifests and lockfiles for known-vulnerable or unpinned packages.
6. Scan for committed secrets, hardcoded credentials, and insecure config.
7. Include only findings tied to concrete evidence with an exploitable scenario.
8. Ask about the base branch only when a base other than \`origin/main\` would materially change the review.
9. Assign a verdict based on the highest blocking risk.`;