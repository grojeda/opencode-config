# Angular Component Tests

Component tests should create the component in a test DOM, drive change detection intentionally, and assert behavior visible through the component class, DOM, outputs, or injected collaborators.

## Basic Setup

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let fixture: ComponentFixture<UserCardComponent>;
  let component: UserCardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserCardComponent], // standalone component
    });

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
  });

  it('renders the name', async () => {
    fixture.componentRef.setInput('name', 'Ada');
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Ada');
  });
});
```

## Imports vs Declarations

```ts
TestBed.configureTestingModule({
  imports: [StandaloneWidgetComponent],
});

TestBed.configureTestingModule({
  declarations: [NgModuleDeclaredComponent],
});
```

Use `imports` for standalone components, directives, and pipes. Use `declarations` for non-standalone declarables owned by the testing module.

## Fixture and DOM Queries

```ts
fixture.detectChanges(); // run change detection now

const host: HTMLElement = fixture.nativeElement;
const button = host.querySelector('button')!;

const titleDe = fixture.debugElement.query(By.css('h1'));
expect(titleDe.nativeElement.textContent).toContain('Profile');

const linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
const firstRouterLink = linkDes[0].injector.get(RouterLink);
```

Use `fixture.whenStable()` when pending Angular async rendering, promises, timers, or async pipes must settle before assertions.

## Inputs, Events, and Outputs

```ts
it('updates from an input event', async () => {
  const input: HTMLInputElement = fixture.nativeElement.querySelector('input');

  input.value = 'Grace';
  input.dispatchEvent(new Event('input'));
  await fixture.whenStable();

  expect(component.name()).toBe('Grace');
});

it('emits on click', () => {
  let selected: string | undefined;
  component.selected.subscribe(value => (selected = value));

  fixture.debugElement.query(By.css('button')).triggerEventHandler('click');

  expect(selected).toBe('save');
});
```

## Test Host Pattern

```ts
@Component({
  imports: [UserCardComponent],
  template: `<app-user-card [name]="name" (selected)="selected = $event" />`,
})
class TestHost {
  name = 'Ada';
  selected?: string;
}
```

Use a host when the important behavior is parent binding, projected content, or output handling.

## Shallow Testing Cautions

Stubs and `overrideComponent` can keep a test focused. Use `NO_ERRORS_SCHEMA` sparingly because it can hide misspelled elements, inputs, and directives that Angular would otherwise catch.

## Do

- Configure `TestBed` before `createComponent`; creation freezes the configuration for that spec.
- Prefer real DOM assertions for template behavior and class-only tests for pure class logic.
- Dispatch the matching DOM event after mutating form element values.
- Query with `By.directive` when directive instances or injectors matter.

## Don't

- Don't expect `createComponent()` alone to perform all binding work before assertions.
- Don't put standalone components in `declarations`.
- Don't overuse shallow schemas when a small stub component would preserve useful compiler checks.
- Don't mutate component state and assert the DOM without running or awaiting change detection.

## Official Sources

- https://angular.dev/guide/testing/components-basics
- https://angular.dev/guide/testing/components-scenarios
- https://angular.dev/guide/testing/utility-apis
