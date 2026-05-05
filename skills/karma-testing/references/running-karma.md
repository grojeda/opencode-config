# Running Karma Tests

Start with the project's package script so you use the same Angular, Karma, browser launcher, and reporter configuration as the team. Use `ng test` or `npx karma start` when you need a specific Angular CLI or Karma CLI flag.

## Commands

```bash
# Run the project test script
npm test

# Run Angular tests through the Angular CLI
ng test

# Run once instead of watch mode
ng test --watch=false

# CI-friendly Angular/Karma run
ng test --no-watch --no-progress --browsers=ChromeHeadless

# Start Karma directly with a config file and exit after one run
npx karma start karma.conf.js --single-run
```

## Focused Narrowing

Use focused specs only as a temporary local diagnostic tool. Remove them before final validation.

```ts
// Focus a suite temporarily
fdescribe('UserCardComponent', () => {
  fit('renders the user name', () => {
    // ...
  });
});

// Skip intentionally only when the skip is part of committed project policy
xdescribe('legacy flow', () => {});
xit('documents a temporarily skipped behavior', () => {});
```

## Practical Strategy

- Reproduce the smallest failing spec first with watch mode when working locally.
- Use the browser reporter to click a suite or spec row and rerun only that selection.
- Switch to `--no-watch` or `--watch=false` before reporting final results.
- Use `ChromeHeadless` for CI and non-interactive runs.

## Do

- Prefer `npm test` when the package script wraps `ng test` with project-specific flags.
- Use `ng test --no-watch --no-progress --browsers=ChromeHeadless` for CI-like validation.
- Keep narrowing in the command or browser runner when possible.
- Remove `fit` and `fdescribe` before finishing.

## Don't

- Don't leave watch mode running as a final validation command.
- Don't assume `npx karma start` is equivalent to `ng test` in Angular CLI projects.
- Don't commit focused specs or accidental skips.
- Don't run broad suites before reproducing a known failing spec or component area.

## Official Sources

- https://angular.dev/guide/testing/karma
- https://karma-runner.github.io/6.4/intro/configuration.html
