# Coverage and CI

Use CI mode for deterministic, non-interactive runs. Use coverage to reveal untested behavior and risk, not to force brittle implementation assertions.

## Commands

```bash
# CI run with coverage
npx jest --ci --coverage

# Limit parallelism on constrained CI workers
npx jest --ci --coverage --maxWorkers=50%
npx jest --ci --coverage --maxWorkers=2

# Run serially when diagnosing shared-state or resource issues
npx jest --ci --runInBand

# With package scripts
npm test -- --ci --coverage
```

Do not use watch mode in CI.

## Coverage Config

Use `collectCoverageFrom` to define what production files count toward coverage.

```js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
};
```

Use `coverageThreshold` for explicit expectations.

```js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
```

## CI Stability

- Disable watch mode and interactive prompts.
- Mock real network calls and external services.
- Control time with fake timers or fixed dates.
- Seed or mock randomness when assertions depend on generated values.
- Clean up process globals, environment variables, servers, and database clients.
- Avoid tests that depend on execution order or local filesystem leftovers.

## Workers

Jest parallelizes test files by default. Lower workers when CI is CPU or memory constrained.

```bash
npx jest --ci --maxWorkers=50%
```

Use `--runInBand` for debugging, not as the default solution for every flaky test unless the suite has unavoidable shared resources.

## Do

- Review uncovered branches to identify meaningful behavioral gaps.
- Exclude generated files, barrels, types, and framework glue when they distort signal.
- Keep CI commands non-interactive and deterministic.
- Treat coverage thresholds as guardrails, not the only definition of quality.

## Don't

- Don't write tests that assert private implementation only to satisfy coverage.
- Don't let coverage include files that cannot reasonably be unit tested.
- Don't use watch mode in CI.
- Don't hide flakiness by reducing workers without understanding shared state.

## Official Sources

- https://jestjs.io/docs/cli#--ci
- https://jestjs.io/docs/cli#--coverageboolean
- https://jestjs.io/docs/configuration#collectcoveragefrom-array
- https://jestjs.io/docs/configuration#coveragethreshold-object
