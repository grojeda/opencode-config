---
title: Resolve Critical Route Data Before Rendering
impact: MEDIUM
impactDescription: Avoids empty-screen boot and scattered init fetching
tags: angular, routing, resolver, data-loading
---

## Resolve Critical Route Data Before Rendering

If a screen cannot render meaningfully without initial data, resolve that data at the route level.

**Incorrect (fetch after mount):**

```typescript
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id')!
  this.ordersService.getOrder(id).subscribe(order => this.order.set(order))
}
```

**Correct (route-level resolver):**

```typescript
export const orderResolver: ResolveFn<Order> = route => {
  return inject(OrdersService).getOrder(route.paramMap.get('id')!)
}
```

Reference: [Angular Routing Data Resolvers](https://angular.dev/guide/routing/common-router-tasks#pre-fetching-component-data)
