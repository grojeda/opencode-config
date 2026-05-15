# Scripts

## validate:config

Validates the internal TypeScript configuration used for agent metadata and routing.

It checks that agents, models, permissions, and task routing are coherent.

This script does not write files.

## generate:agents

Renders the TypeScript-authored agents into `agents/*.md`.

`src/` is the source of truth. `agents/` is the generated, auditable OpenCode runtime output.

Run this after changing agent source files:

```bash
pnpm generate:agents
```

Review the resulting `agents/*.md` diff before committing.

## check:agents

Regenerates `agents/*.md` and fails if the generated output differs from the committed files.

```bash
pnpm generate:agents && git diff --exit-code agents
```

This script writes files only when the generated output is stale.

## typecheck

Runs the TypeScript compiler in no-emit mode.

It checks that the TypeScript layer is structurally correct.

This script does not write files.

## test

Runs the Vitest prompt test suite.

It validates agent registry completeness, prompt invariants, permissions, and synchronization between TypeScript source and `agents/*.md`.

This script does not write files.

## preview:agent

Prints one rendered agent markdown file to the terminal.

It is useful for manual inspection only. It is intentionally not part of `check` or CI because it prints a full prompt.

Example:

```bash
pnpm preview:agent planning-agent
```

This script does not write files.

## check

Runs the safe validation pipeline:

```bash
pnpm typecheck && pnpm validate:config && pnpm test
```

This script does not write files.

## precommit

Runs the local Husky pre-commit validation:

```bash
pnpm check:agents && pnpm test
```

If generated agents are stale, this script fails after regenerating them. Review the `agents/*.md` diff, stage it, and commit again.

## ci

Runs the CI validation pipeline:

```bash
pnpm check:agents && pnpm typecheck && pnpm validate:config && pnpm test
```
