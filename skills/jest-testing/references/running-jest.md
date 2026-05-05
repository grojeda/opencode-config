# Running Jest Tests

Start with the project's package scripts so you run the same config, environment, and flags as the team. Use `npx jest` when the repo exposes Jest directly or you need a one-off CLI flag.

## Commands

```bash
# Run the project test script
npm test

# Run all Jest tests directly
npx jest

# Run one test file
npm test -- path/to/user.test.ts
npx jest path/to/user.test.ts

# Run tests matching a name
npm test -- -t "loads user"
npx jest -t "loads user"

# Run tests related to source files
npx jest --findRelatedTests src/user.ts src/api.ts

# Watch tests related to changed files
npm test -- --watch
npx jest --watch

# Watch all tests, even without changed files
npm test -- --watchAll
npx jest --watchAll

# Run tests changed since a branch or commit
npx jest --changedSince=origin/main
```

## Narrowing Strategy

- Reproduce the failing file first: `npx jest path/to/file.test.ts`.
- Narrow to a test name with `-t "partial test name"`.
- Use `--findRelatedTests path/to/source.ts` when validating a focused source change.
- Run the owning suite or package script before finishing.
- Run the full suite only when the change can affect broad behavior, shared setup, config, or many packages.

## Do

- Prefer `npm test -- ...` when package scripts add config, env vars, or workspace routing.
- Keep filters in the command line rather than committing `test.only`.
- Remove `test.only`, `describe.only`, and temporary skips before final validation.
- Use `--runInBand` when diagnosing shared state or order-dependent failures.

## Don't

- Don't immediately run a slow full suite when one failing file identifies the problem.
- Don't leave `test.only` or `describe.only` in final code.
- Don't assume `npx jest` is equivalent to `npm test` if the project script wraps Jest.
- Don't use watch mode in CI or non-interactive verification.

## Official Sources

- https://jestjs.io/docs/cli
- https://jestjs.io/docs/getting-started
