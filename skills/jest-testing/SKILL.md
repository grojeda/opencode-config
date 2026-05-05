---
name: jest-testing
description: Write, run, debug, and stabilize Jest tests for JavaScript, TypeScript, Node, and React projects.
allowed-tools: Bash(npm:*) Bash(npx:*) Bash(node:*)
---

# Jest Testing

## When to use

Use this skill when writing, running, debugging, or stabilizing Jest tests for JavaScript, TypeScript, Node, and React projects.

For Vite-first projects, consider Vitest unless the project already uses Jest.

## Quick start commands

```bash
# Run the project test script
npm test

# Run in watch mode
npm test -- --watch

# Run one test file
npx jest path/to/file.test.ts

# Run tests matching a name
npx jest -t "test name"

# Run tests related to a changed source file
npx jest --findRelatedTests src/foo.ts

# Generate coverage
npx jest --coverage

# CI run with coverage
npx jest --ci --coverage

# Debug one test serially
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand path/to/test
```

## Test writing rules

- Use arrange/act/assert structure with descriptive test names.
- Prefer behavior over implementation details.
- Isolate state between tests and clean up side effects.
- For React Testing Library, query by role, label, or visible text; use `user-event` for interactions and avoid component internals.
- For Node tests, mock I/O, network, and time; clean up open handles.
- For TypeScript, import from `@jest/globals` when needed; run `tsc --noEmit` if Babel only transpiles and does not type-check.

## Async rules

```ts
await expect(loadUser()).resolves.toEqual({ id: '1' });
await expect(loadUser()).rejects.toThrow('not found');
```

- Return or await promises so Jest can observe failures.
- Use `resolves` and `rejects` for promise expectations.
- Use `expect.assertions(...)` for rejection and callback paths that must assert.
- Do not mix `done` callbacks with promises or `async` functions.

## Mocking

```ts
const load = jest.fn().mockResolvedValue({ id: '1' });
const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

jest.mock('../api', () => ({
  ...jest.requireActual('../api'),
  fetchUser: jest.fn().mockRejectedValue(new Error('offline')),
}));

spy.mockRestore();
```

- Use `jest.fn`, `jest.spyOn`, and `jest.mock` for collaborators and boundaries.
- Use `mockResolvedValue` and `mockRejectedValue` for async dependencies.
- Use `jest.requireActual` for partial mocks.
- Clear or restore mocks with `jest.clearAllMocks()`, `jest.restoreAllMocks()`, or per-mock restore calls.

## Timers

```ts
jest.useFakeTimers();
jest.advanceTimersByTime(1000);
jest.runOnlyPendingTimers();
jest.useRealTimers();
```

- Use `useFakeTimers`, `runAllTimers`, `runOnlyPendingTimers`, and `advanceTimersByTime` for deterministic time-based tests.
- Restore real timers after timer tests.
- Flush pending timers before switching back when code schedules delayed cleanup.

## Debugging workflow

```bash
npx jest path/to/file.test.ts --runInBand --detectOpenHandles
npx jest -t "test name" --runInBand
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand path/to/test
```

- Reproduce with the smallest file or test name filter.
- Run serially with `--runInBand` when debugging shared state, timers, or open handles.
- Check Jest config, transform settings, module aliases, test environment (`node` vs `jsdom`), and setup files.
- Remove `test.only` and `describe.only` before final validation.

## CI and coverage

```bash
npx jest --ci --coverage
npx jest --runInBand --detectOpenHandles
```

- Use `--ci` for non-interactive runs.
- Use coverage to find meaningful gaps, not to force brittle implementation assertions.
- Stabilize CI by mocking network, controlling time, avoiding shared mutable state, and cleaning up handles.

## Anti-patterns

- Testing private implementation details instead of observable behavior.
- Leaving `test.only`, `describe.only`, broad snapshots, or skipped tests in committed code.
- Not awaiting promises or expecting async failures outside the awaited path.
- Mixing `done` with promises or `async` tests.
- Mocking the unit under test instead of its dependencies.
- Depending on real network, wall-clock time, filesystem state, or process globals without cleanup.

## Specific tasks

- **Running Jest tests** [references/running-jest.md](references/running-jest.md)
- **Async tests** [references/async-tests.md](references/async-tests.md)
- **Mocking modules and functions** [references/mocking.md](references/mocking.md)
- **Timer mocks** [references/timer-mocks.md](references/timer-mocks.md)
- **React Testing Library** [references/react-testing-library.md](references/react-testing-library.md)
- **Debugging Jest tests** [references/debugging.md](references/debugging.md)
- **Coverage and CI** [references/coverage-ci.md](references/coverage-ci.md)
- **TypeScript with Jest** [references/typescript.md](references/typescript.md)

## Official references

- https://jestjs.io/docs/getting-started
- https://jestjs.io/docs/cli
- https://jestjs.io/docs/configuration
- https://jestjs.io/docs/asynchronous
- https://jestjs.io/docs/mock-functions
- https://jestjs.io/docs/timer-mocks
- https://jestjs.io/docs/troubleshooting
- https://testing-library.com/docs/guiding-principles
- https://testing-library.com/docs/react-testing-library/intro/
