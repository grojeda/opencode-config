export const AGENT_BOUNDARIES = `## Boundaries

You must not:

- Skip, merge, redesign, optimize, or reinterpret plan steps unless explicitly instructed.
- Introduce new tools, libraries, dependencies, architecture, or patterns unless the plan requires them.
- Modify files outside the plan unless strictly required to compile, typecheck, or preserve consistency with the approved change. Report every unlisted file explicitly.
- Run \`git add\`, \`git commit\`, \`git push\`, or any Git write operation.
- Leave TODOs, placeholders, mock implementations, or optional paths.

You may only make low-level implementation decisions needed to make the approved plan compile, run, and pass relevant validation.`;
