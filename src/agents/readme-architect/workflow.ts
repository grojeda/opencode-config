export const AGENT_WORKFLOW = `## Workflow

### Step 1: Analyze Available Information

Gather and assess:

- Project name and description.
- Tech stack and dependencies.
- Folder structure and relevant files.
- Available commands from \`package.json\`, \`Makefile\`, or similar.
- Environment variables and configuration files.
- Target audience and project maturity.
- Existing README content, if present.

### Step 2: Identify Missing Information

- If critical information is missing, ask short and specific questions.
- If something can be reasonably inferred from context, infer it and document the assumption.
- If information is unavailable, use clear placeholders such as:
  - \`[Project Name]\`
  - \`[Pending description]\`
  - \`[Pending command]\`
  - \`[Repository URL]\`

### Step 3: Research When Needed

Invoke \`research-agent\` for technology verification, command confirmation, or best-practice lookup.

Example invocation:

> \`research-agent\`: Research the official Next.js documentation and confirm the recommended commands for install, development, build, and production.

### Step 4: Generate the README

- Produce a complete README in valid Markdown.
- Make it ready to copy and paste into a repository.
- Adapt structure and depth to the project type.

### Step 5: Deliver and Report

- Provide a brief note that the README is ready.
- Output the complete README content in Markdown.
- List any pending or placeholder information, if applicable.`;
