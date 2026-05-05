# Async and Timers

Make every asynchronous path visible to Jasmine and Angular. Choose one async style per spec: `async`/`await`, `fakeAsync` with clock control, or Jasmine `done` for callback-only APIs.

## Prefer Native Async When Possible

```ts
it('renders loaded data', async () => {
  fixture.componentRef.setInput('id', '42');

  await fixture.whenStable();

  expect(fixture.nativeElement.textContent).toContain('Ada');
});
```

Use `fixture.whenStable()` to wait for Angular-tracked async work and rendering to settle before DOM assertions.

## Zone.js Utilities in Karma/Jasmine Projects

Angular docs now prefer native async strategies or fake timers where possible. Existing Karma/Jasmine projects still commonly use Zone.js testing utilities.

```ts
import { fakeAsync, tick, flushMicrotasks, discardPeriodicTasks } from '@angular/core/testing';

it('shows the delayed message', fakeAsync(() => {
  component.showLater();

  tick(500);
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain('Ready');
}));

it('flushes promise work', fakeAsync(() => {
  component.loadFromPromise();

  flushMicrotasks();
  fixture.detectChanges();

  expect(component.loaded()).toBeTrue();
}));
```

Use `discardPeriodicTasks()` when a spec intentionally starts an interval and the component does not destroy it during the test.

## Jasmine `done` for Callbacks

```ts
it('handles callback APIs', done => {
  service.loadWithCallback((error, result) => {
    try {
      expect(error).toBeNull();
      expect(result.name).toBe('Ada');
      done();
    } catch (assertionError) {
      done.fail(assertionError);
    }
  });
});
```

Use `done` only when the API does not expose a promise, observable, or timer you can control more directly.

## HTTP and Timers

```ts
it('loads a user', () => {
  service.loadUser('42').subscribe(user => expect(user.name).toBe('Ada'));

  const req = http.expectOne('/api/users/42');
  req.flush({ name: 'Ada' });
  http.verify();
});
```

Flush mocked HTTP requests explicitly. Flush timers and microtasks explicitly when using `fakeAsync`.

## Do

- Return, await, flush, or complete every async path under test.
- Use `fixture.whenStable()` before assertions that depend on asynchronous Angular rendering.
- Use `tick()` for timers inside `fakeAsync` instead of waiting in real time.
- Verify and clean up HTTP testing controllers, subscriptions, intervals, and browser global overrides.

## Don't

- Don't mix `async`/`await`, returned promises, `fakeAsync`, and `done` in the same spec.
- Don't add arbitrary sleeps such as `setTimeout(done, 1000)` to hide races.
- Don't leave unflushed timers, periodic tasks, HTTP requests, or unresolved promises.
- Don't use `fakeAsync` for APIs that Zone.js cannot patch in the project environment.

## Official Sources

- https://angular.dev/guide/testing/components-scenarios
- https://angular.dev/guide/testing/utility-apis
- https://angular.dev/guide/testing/zone-js-testing-utilities
