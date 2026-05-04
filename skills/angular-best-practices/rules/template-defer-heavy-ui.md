---
title: Defer Heavy UI Until Needed
impact: MEDIUM-HIGH
impactDescription: Improves initial rendering by delaying expensive widgets
tags: angular, defer, lazy, rendering
---

## Defer Heavy UI Until Needed

Use `@defer` for widgets, charts, editors, and below-the-fold content.

**Incorrect (eager heavy UI):**

```html
<app-sales-chart />
<app-rich-editor />
```

**Correct (deferred loading):**

```html
@defer (on viewport) {
  <app-sales-chart />
} @placeholder {
  <app-chart-skeleton />
}

@defer (when isEditing()) {
  <app-rich-editor />
}
```

Reference: [Angular Deferred Loading](https://angular.dev/guide/defer)
