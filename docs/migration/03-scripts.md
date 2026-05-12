# Migration Scripts

## validate:config

Validates the internal TypeScript configuration.

It checks that agents, models, permissions, and task routing are coherent.

This script does not write files.

## typecheck

Runs the TypeScript compiler in no-emit mode.

It checks that the TypeScript layer is structurally correct.

This script does not write files.

## preview:opencode

Prints the current generated OpenCode partial config to the terminal.

It is useful to inspect what the TypeScript layer would produce.

This script does not write files.

## generate:opencode

Generates `opencode.generated.json`.

This is experimental and does not replace `opencode.json` yet.

This script writes a file, so it should stay out of `check` for now.

## check

Runs the safe validation pipeline:

```bash
pnpm typecheck && pnpm validate:config && pnpm preview:opencode