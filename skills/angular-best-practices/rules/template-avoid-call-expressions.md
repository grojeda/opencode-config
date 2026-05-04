---
title: Avoid Calling Expensive Methods from Templates
impact: HIGH
impactDescription: Prevents repeated work during change detection
tags: angular, template, performance, computed
---

## Avoid Calling Expensive Methods from Templates

Do not filter, sort, or allocate data inside template call expressions.

**Incorrect (method called on each check):**

```html
<li *ngFor="let item of getVisibleItems()">{{ item.name }}</li>
```

**Correct (precomputed collection):**

```typescript
readonly visibleItems = computed(() => this.items().filter(item => item.visible))
```

```html
@for (item of visibleItems(); track item.id) {
  <li>{{ item.name }}</li>
}
```

Reference: [Angular Control Flow](https://angular.dev/guide/templates/control-flow)
