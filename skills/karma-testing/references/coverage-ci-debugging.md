# Coverage, CI, and Debugging

Use CI runs that execute once, launch a headless browser, and fail clearly. Use browser debugging for rendering and event issues because Karma runs specs in a real browser.

## Coverage Commands

```bash
# Generate Angular coverage output
ng test --coverage

# CI-style coverage run
ng test --coverage --no-watch --no-progress --browsers=ChromeHeadless
```

Angular writes coverage reports under `coverage/`. Open the generated `index.html` report when you need line-by-line gaps.

## Karma Coverage Thresholds

```js
coverageReporter: {
  dir: require('path').join(__dirname, './coverage/my-project'),
  subdir: '.',
  reporters: [
    { type: 'html' },
    { type: 'text-summary' },
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
}
```

Use `coverageReporter.check` in Karma-configured projects when coverage thresholds should fail the run.

## CI Command

```bash
ng test --no-watch --no-progress --browsers=ChromeHeadless
```

For direct Karma runs, use `singleRun` or the CLI flag.

```bash
npx karma start karma.conf.js --single-run --browsers ChromeHeadless
```

## Debug Workflow

```bash
# Let Karma print more runner and launcher details
npx karma start karma.conf.js --log-level debug

# Angular/Karma browser debugging workflow
ng test
```

1. Reveal the Karma browser window.
2. Click **DEBUG** to open a debug tab and rerun tests there.
3. Open browser DevTools.
4. Find the spec or source file in Sources.
5. Set breakpoints and refresh the debug tab.

## Common Failure Checks

- Remove `fit` and `fdescribe`; enable `failOnSkippedTests` if the project wants CI to catch skipped/focused specs.
- Browser launcher errors: confirm the launcher plugin is installed and the configured browser exists in CI.
- Polyfill or setup errors: check test setup files before editing specs.
- Timeouts or hangs: look for unflushed HTTP requests, pending timers, intervals, unresolved promises, or missing `done()` callbacks.
- Browser-only failures: debug in the Karma browser instead of assuming Node behavior.

## Do

- Use `ChromeHeadless`, `--no-watch`, and `--no-progress` for CI.
- Keep coverage thresholds in committed config only when the team enforces them.
- Use `--log-level debug` for launcher and Karma server diagnostics.
- Verify there are no focused specs before final validation.

## Don't

- Don't use watch mode in CI.
- Don't raise timeouts until you have checked launcher, setup, and unflushed async work.
- Don't commit temporary debugging flags or focused specs.
- Don't treat coverage as proof of behavior; use it to find untested code paths.

## Official Sources

- https://angular.dev/guide/testing/karma
- https://angular.dev/guide/testing/code-coverage
- https://angular.dev/guide/testing/debugging
- https://karma-runner.github.io/6.4/config/configuration-file.html
