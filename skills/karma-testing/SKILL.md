---
name: karma-testing
description: Write, run, debug, and stabilize Karma/Jasmine tests, especially Angular unit and component tests.
allowed-tools: Bash(npm:*) Bash(npx:*) Bash(ng:*)
---

# Karma and Angular Testing

## When to use

Use this skill when writing, running, debugging, or stabilizing Karma/Jasmine tests, especially Angular unit, service, and component tests in existing projects.

Angular now defaults to Vitest for new apps, but Karma remains relevant for existing Karma/Jasmine projects.

## Quick start

```bash
npm test
npx karma start
ng test
```

## Angular/Karma commands

```bash
# Run Angular tests in watch mode
ng test

# Run once for local validation or CI
ng test --watch=false

# Headless CI-friendly run
ng test --no-watch --no-progress --browsers=ChromeHeadless

# Generate coverage output
ng test --coverage

# Run with debugging support
ng test --debug

# Add Karma config to an Angular workspace when supported
ng generate config karma

# Run Karma directly once
npx karma start karma.conf.js --single-run
```

## Test writing rules

- Test user-visible behavior and public service contracts, not private implementation details.
- Use `TestBed` and `ComponentFixture` deliberately; avoid heavyweight Angular setup for pure logic that can be constructed directly.
- For standalone components, put dependencies in `imports`, not `declarations`.
- Call `fixture.detectChanges()` intentionally when you want Angular change detection and lifecycle hooks to run.
- Use `await fixture.whenStable()` for async template updates before asserting rendered output.
- Use `DebugElement` and `By.css` when they make DOM querying or directive inspection clearer.
- Test services with `TestBed.inject(...)` when Angular DI matters, or isolated construction when it does not.
- Use Angular HTTP testing utilities for HTTP clients when applicable; do not hit real endpoints.

## Mocking and spies

```ts
const api = jasmine.createSpyObj('ApiService', ['load']);
api.load.and.returnValue(of([{ id: 1 }]));

TestBed.configureTestingModule({
  providers: [{ provide: ApiService, useValue: api }],
});

spyOn(window, 'alert');
```

- Prefer `jasmine.createSpyObj`, `spyOn`, and provider `useValue` mocks for collaborators.
- Avoid real network, time, storage, routing, or browser globals unless the test explicitly owns and restores them.

## Async and timing

- Choose `async`/`await` or `fakeAsync`/`tick` for a test; avoid mixing patterns.
- Do not use arbitrary sleeps. Wait for Angular stability, flush test controllers, or advance fake time deterministically.
- Keep async assertions inside the awaited path so failures are reported by the test runner.

## Debugging workflow

```bash
ng test --debug
ng test --watch=false --browsers=ChromeHeadless
npx karma start karma.conf.js --single-run --log-level debug
```

- Reproduce the smallest failing spec file or focused suite first.
- Remove focused specs (`fit`, `fdescribe`) before final validation.
- Check browser launcher errors, missing polyfills, async leaks, and unflushed HTTP requests.
- Inspect `karma.conf.js`, Angular builder options, and test setup files when failures differ between local and CI.

## CI and coverage

```bash
ng test --no-watch --no-progress --browsers=ChromeHeadless --coverage
```

- Use headless browsers and single-run mode in CI.
- Keep coverage thresholds meaningful; do not chase line coverage by testing implementation details.
- Stabilize tests by controlling time, network, random data, viewport-sensitive behavior, and global state.

## Anti-patterns

- Asserting private fields, internal method calls, or incidental DOM structure.
- Calling `detectChanges()` repeatedly without understanding what each call triggers.
- Mixing `done`, promises, `async`/`await`, and `fakeAsync` in the same spec.
- Leaving focused or skipped tests in committed code.
- Depending on real network, wall-clock time, local storage, or browser globals without cleanup.
- Ignoring console errors from Angular templates or unhandled promise rejections.

## References

- https://karma-runner.github.io/6.4/index.html
- https://karma-runner.github.io/6.4/intro/installation.html
- https://karma-runner.github.io/6.4/intro/configuration.html
- https://karma-runner.github.io/6.4/config/configuration-file.html
- https://angular.dev/guide/testing/karma
- https://angular.dev/guide/testing/components-basics
- https://angular.dev/guide/testing/services
- https://angular.dev/guide/testing/utility-apis
- https://angular.dev/guide/testing/code-coverage
- https://angular.dev/guide/testing/debugging
