---
title: Prefer OnPush with Signals or Computed State
impact: CRITICAL
impactDescription: Reduces unnecessary change detection and clarifies update paths
tags: angular, signals, onpush, change-detection
---

## Prefer OnPush with Signals or Computed State

Use `ChangeDetectionStrategy.OnPush` for feature components and drive templates with signals, computed values, or observables consumed with `async`.

**Incorrect (mutable state with default change detection):**

```typescript
items: CartItem[] = []

addItem(item: CartItem) {
  this.items.push(item)
}
```

**Correct (immutable updates with signals):**

```typescript
readonly items = signal<CartItem[]>([])
readonly total = computed(() => this.items().reduce((sum, item) => sum + item.price, 0))

addItem(item: CartItem) {
  this.items.update(items => [...items, item])
}
```

Reference: [Angular Signals](https://angular.dev/guide/signals)
