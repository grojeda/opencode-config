---
description: Generate a structured learning path for any technical project by researching the codebase and producing Markdown files organized by depth level
agent: orchestrator-agent
subtask: false
permissions:
  read: allow
  edit: allow
  bash:
    "mkdir *": allow
    "dir *": allow
    "ls *": allow
    "find *": allow
  task:
    "*": deny
    "research-agent": allow
  websearch: allow
  webfetch: allow
  question: allow
---

# Technical Learning Path Generator

Treat `$ARGUMENTS` as optional context or focus area for the learning path. If no arguments are provided, generate a learning path for the entire project.

## Workflow

1. **Research the project** using `research-agent` to inspect:
   - Repository structure and README.
   - Package or dependency files.
   - Application entry points.
   - Routing, API, CLI, job, or UI entry files.
   - Core domain logic.
   - Configuration files.
   - Tests, if useful for understanding behavior.

   The research should answer:
   - What is this project and what problem does it solve?
   - What are the main technologies?
   - How does execution start?
   - What are the main flows?
   - Which files are essential for understanding the project?
   - Which code snippets best explain the project?

2. **Identify project characteristics:**
   - Project type, main technologies, architecture.
   - Entry points, core modules, data flow.
   - Important implementation patterns.
   - Project size and complexity to determine how many depth-level files to create.

3. **Create the `learning-path/` folder** if it does not exist.

4. **Generate Markdown files** inside `learning-path/` organized by depth level:

   ```
   learning-path/
     01-foundations.md
     02-core-concepts.md
     03-internals-and-advanced-flow.md
   ```

   - For small projects: create fewer files.
   - For large or complex projects: create more files.

5. **Each Markdown file must include:**
   - A clear title and short overview.
   - A list of learning goals.
   - Technical explanations with real code snippets or precise file references.
   - A final section called `Next steps`.

6. **Include real code evidence** for every important explanation:
   - A real code snippet from the project, or
   - A precise file path and function/class/module name, or
   - A short explanation of how the code supports the concept.

   Use this format:

   ```markdown
   ## Concept: Request Handling

   The request flow starts in `src/server/routes/users.ts`.

   ```ts
   router.get("/users/:id", getUserById);
   ```

   This shows that user lookup requests are routed through `getUserById`, which is implemented in `src/controllers/userController.ts`.
   ```

7. **Validate generated files** before finishing:
   - Confirm every file has a `Next steps` section.
   - Confirm every file contains at least one real code snippet or precise file reference.
   - Confirm no file contains `[object Object]`, placeholder URLs, or invented code.
   - Confirm the prose is in Spanish (except code snippets, file paths, and technical terms).
   - If any file fails validation, regenerate it before proceeding.

8. **After creating all files**, respond with:
   - The list of Markdown files created.
   - A short summary of what each file covers.
   - Confirmation that no existing code was modified.

## Depth Levels

### Level 1 — Foundations

Explain:

- What the project does.
- The main technologies used.
- How the project is organized.
- The main entry points.
- The minimum mental model needed to understand the repository.
- Key files and folders.

### Level 2 — Core Concepts

Explain:

- Main modules and responsibilities.
- Important runtime flows.
- How data moves through the system.
- Main abstractions, services, handlers, models, components, or controllers.
- Important dependencies between files.

### Level 3 — Internals and Advanced Flow

Explain:

- Deeper implementation details.
- Non-obvious architectural choices.
- Important edge cases.
- Error handling.
- Integration points.
- Performance, security, state management, or scalability considerations where relevant.

## Writing Style

- Write all generated Markdown files in clear technical Spanish.
- The tone should be educational, direct, and practical.
- Do not write for absolute beginners. Assume the reader understands programming fundamentals, command-line usage, APIs, databases, and general software development concepts.
- Do explain project-specific concepts carefully.
- Keep code snippets, file paths, and technical terms (e.g., "handler", "middleware", "endpoint") in their original form. Only the explanatory prose must be in Spanish.

## Guardrails

- Only read and analyze files. Never modify existing source code, documentation, configuration, tests, or any other project files.
- Only create new Markdown files inside `learning-path/`.
- Use only real code snippets found in the repository. Do not invent code.
- Do not generate hypothetical examples unless explicitly marked as hypothetical.
- Do not run destructive commands, delete, rename, or move files.
- Do not install dependencies unless explicitly authorized.
- Do not claim that a file contains something unless it was verified through research.
- Prefer snippets that reveal structure, flow, or important behavior. Keep snippets short and focused.
- Always include the file path before or after each snippet.
