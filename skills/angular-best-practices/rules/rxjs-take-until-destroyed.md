---
title: Bind Subscriptions to Component Lifecycle
impact: HIGH
impactDescription: Avoids leaks and manual cleanup code
tags: angular, rxjs, lifecycle, cleanup
---

## Bind Subscriptions to Component Lifecycle

Use `takeUntilDestroyed()` for component-scoped subscriptions.

**Incorrect (manual subscription tracking):**

```typescript
private readonly subscriptions: Subscription[] = []

ngOnInit() {
  this.subscriptions.push(this.metricsService.metrics$.subscribe(metrics => this.metrics.set(metrics)))
}
```

**Correct (automatic cleanup):**

```typescript
private readonly destroyRef = inject(DestroyRef)

ngOnInit() {
  this.metricsService.metrics$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(metrics => this.metrics.set(metrics))
}
```

Reference: [Angular RxJS Interop](https://angular.dev/guide/ecosystem/rxjs-interop)
