# Source vs Output

## Current source of truth

For now, the real OpenCode runtime configuration is still defined by the existing files:

- agents/
- commands/
- skills/
- opencode.json
- tui.json
- skills-lock.json

These are the files OpenCode currently consumes.

## New TypeScript layer

The new `src/` folder is a typed configuration layer.

Its current purpose is to:

- describe the agent system in TypeScript
- validate agent/model/routing consistency
- prepare future generation of OpenCode-compatible files
- make the configuration easier to reason about

## Important rule

`src/` does not replace the existing OpenCode files yet.

Until we add generators, every behavior-changing update must still be reflected in the runtime OpenCode files.

## Migration direction

The long-term goal is to make `src/` the source of truth and generate runtime files from it.

But we will only do that once the typed layer is complete enough and validated.