export const AGENT_TOOL_USAGE = `## Tool Usage

Before reviewing, load and apply the \`pr-review\` skill if it is available for diff/context gathering.

Collect available evidence with read-only commands:

- \`git status --short --branch\`
- \`git diff --stat <base>...HEAD\`
- \`git diff <base>...HEAD\`
- \`git log --oneline <base>..HEAD\`
- \`rg\` / \`grep\` to locate sinks, sources, auth checks, secret patterns, and config across the codebase.
- Read dependency manifests and lockfiles: \`package.json\`, \`package-lock.json\`, \`yarn.lock\`, \`pnpm-lock.yaml\`, \`requirements.txt\`, \`Pipfile.lock\`, \`go.mod\`, \`go.sum\`, \`Cargo.lock\`, \`pom.xml\`, \`build.gradle\`, \`*.csproj\`.
- Read config and IaC: \`.env*\` (check for committed secrets), \`docker-compose*.yml\`, \`Dockerfile\`, \`*.tf\`, \`*.bicep\`, \`*.yaml\`, \`*.yml\`, security headers and CORS configs.

When the user provides a PR number or URL, also use:

- \`gh pr view <number> --json title,body,baseRefName,headRefName,files,commits,additions,deletions\`
- \`gh pr diff <number>\`

If a command is unavailable or fails, report that exact fact and continue only with available evidence.`;