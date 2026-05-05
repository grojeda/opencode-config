# Mocking and TestBed

Use the smallest test double that keeps the behavior under test observable. Prefer provider overrides for injected collaborators and Jasmine spies for interaction checks.

## Jasmine Spies

```ts
const userApi = jasmine.createSpyObj<UserApi>('UserApi', ['load', 'save']);
userApi.load.and.returnValue(of({ id: '42', name: 'Ada' }));

spyOn(window, 'confirm').and.returnValue(true);
```

Use `jasmine.createSpyObj` for collaborator objects and `spyOn` for existing methods owned by the test environment.

## Provider `useValue`

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [UserCardComponent],
    providers: [{ provide: UserApi, useValue: userApi }],
  });
});

it('calls the API', () => {
  const api = TestBed.inject(UserApi);

  component.save();

  expect(api.save).toHaveBeenCalledWith(component.user());
});
```

`TestBed.inject()` retrieves services from the testing module injector. It is correct for root or TestBed-level providers.

## Component Injector Providers

If a component declares its own provider, the component injector gets a different instance. Read it from the fixture's `DebugElement` injector.

```ts
fixture = TestBed.createComponent(UserDetailComponent);

const api = fixture.debugElement.injector.get(UserApi);
expect(api).toBeTruthy();
```

## Override Component Metadata

```ts
TestBed.configureTestingModule({
  imports: [UserDetailComponent],
}).overrideComponent(UserDetailComponent, {
  set: {
    providers: [{ provide: UserApi, useValue: userApi }],
  },
});
```

Use `overrideComponent` before `createComponent()` to replace component-level providers or shallow nested imports.

## HTTP Testing Controller

```ts
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
  });
});

it('flushes HTTP', () => {
  service.loadUser('42').subscribe(user => expect(user.name).toBe('Ada'));

  const http = TestBed.inject(HttpTestingController);
  http.expectOne('/api/users/42').flush({ name: 'Ada' });
  http.verify();
});
```

Mock HTTP at the HTTP layer when the public API uses `HttpClient`; do not let unit tests call the network.

## Do

- Provide test doubles with `useValue` when the dependency behavior should be controlled.
- Use `TestBed.inject()` for TestBed/root providers and `fixture.debugElement.injector.get()` for component providers.
- Call `overrideComponent` before component creation.
- Restore browser globals if the test replaces properties that Jasmine does not automatically restore.

## Don't

- Don't inject a real dependency that opens network connections, prompts users, or depends on browser state unless that behavior is the target.
- Don't spy on methods after the component has already called them during creation.
- Don't use `TestBed.inject()` to read a service provided only in the component metadata.
- Don't leave unverified HTTP requests after a spec.

## Official Sources

- https://angular.dev/guide/testing/services
- https://angular.dev/guide/testing/components-scenarios
- https://angular.dev/guide/testing/utility-apis
