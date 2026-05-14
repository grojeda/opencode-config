# Migration Scripts

## validate:config

Validates the internal TypeScript configuration that is still used for agent metadata and routing experiments.

It checks that agents, models, permissions, and task routing are coherent.

This script does not write files.

## typecheck

Runs the TypeScript compiler in no-emit mode.

It checks that the TypeScript layer is structurally correct.

This script does not write files.

## preview:planning-agent

Prints the current experimental modular `planning-agent` markdown to the terminal.

It is useful to inspect what the TypeScript authoring layer would produce before adding an agent build step.

This script does not write files.

## check

Runs the safe validation pipeline:

```bash
pnpm typecheck && pnpm validate:config && pnpm preview:planning-agent
```
