# Debugging Jest Tests

Start by reproducing the smallest failing case, then inspect configuration and environment mismatches before adding workarounds.

## Commands

```bash
# Run one file serially
npx jest path/to/file.test.ts --runInBand

# Run one test name serially
npx jest -t "loads user" --runInBand

# Diagnose open handles
npx jest path/to/file.test.ts --runInBand --detectOpenHandles

# Clear Jest cache
npx jest --clearCache

# Debug with Node inspector
node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand path/to/file.test.ts
```

For npm scripts, pass flags after `--`:

```bash
npm test -- path/to/file.test.ts --runInBand --detectOpenHandles
```

## Config Checklist

- `testEnvironment`: use `node` for backend code and `jsdom` for DOM or React tests.
- `transform`: ensure TypeScript, JSX, ESM, Babel, or SWC files are transformed correctly.
- `moduleNameMapper`: verify path aliases, CSS modules, images, and package aliases.
- `setupFiles`: check code that must run before the test framework is installed.
- `setupFilesAfterEnv`: check matchers, Testing Library cleanup, and per-test hooks.
- `testMatch` or `testRegex`: confirm the intended files are included once.

## Open Handles

Use `--detectOpenHandles` to find unclosed servers, sockets, timers, database clients, subscriptions, and file watchers.

```ts
afterAll(async () => {
  await server.close();
  await db.disconnect();
});
```

Diagnose and close handles before considering `--forceExit`.

## Common Causes

- Missing `await` for promises that fail after the test ends.
- Fake timers left enabled after a test.
- Global mocks or spies not restored.
- Import path aliases working in TypeScript but not mapped in Jest.
- ESM/CommonJS settings differing between app runtime and Jest.
- DOM tests running under `node` instead of `jsdom`.

## Do

- Reproduce with one file and one test name before broad changes.
- Run serially with `--runInBand` when investigating shared state.
- Clear cache after transform, config, or dependency-resolution changes.
- Inspect setup files for hidden global state.

## Don't

- Don't use `--forceExit` as the fix for leaked resources.
- Don't debug order-dependent failures only through the full suite.
- Don't ignore transform warnings; they often explain syntax and ESM failures.
- Don't leave inspector or focused-test commands in package scripts.

## Official Sources

- https://jestjs.io/docs/troubleshooting
- https://jestjs.io/docs/cli
- https://jestjs.io/docs/configuration
