---
title: Prefer Typed Reactive Forms for Non-Trivial Forms
impact: MEDIUM
impactDescription: Improves safety and maintainability of complex form flows
tags: angular, forms, typed, reactive
---

## Prefer Typed Reactive Forms for Non-Trivial Forms

Use typed reactive forms when validation or submission flow matters.

**Incorrect (untyped controls):**

```typescript
form = new FormGroup({
  name: new FormControl(""),
  email: new FormControl(""),
});
```

**Correct (typed controls):**

```typescript
form = new FormGroup({
  name: new FormControl<string>("", { nonNullable: true }),
  email: new FormControl<string>("", { nonNullable: true }),
});
```

Reference: [Angular Typed Forms](https://angular.dev/guide/forms/typed-forms)
