---
title: Derive View State Instead of Synchronizing Duplicates
impact: HIGH
impactDescription: Prevents drift between source state and rendered state
tags: angular, signals, computed, state
---

## Derive View State Instead of Synchronizing Duplicates

Do not store mutable state that can be derived from existing signals or streams.

**Incorrect (duplicate filtered state):**

```typescript
filteredProducts: Product[] = []

setCategory(category: string) {
  this.selectedCategory.set(category)
  this.filteredProducts = this.products().filter(product => product.category === category)
}
```

**Correct (derived state):**

```typescript
readonly filteredProducts = computed(() =>
  this.products().filter(product => {
    const category = this.selectedCategory()
    return category === 'all' || product.category === category
  })
)
```

Reference: [Angular Signals](https://angular.dev/guide/signals)
