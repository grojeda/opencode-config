---
title: Lazy Load Standalone Screens
impact: MEDIUM-HIGH
impactDescription: Shrinks initial bundles by splitting routes
tags: angular, routing, standalone, lazy
---

## Lazy Load Standalone Screens

Prefer lazy route entry points for feature screens.

**Incorrect (eager route import):**

```typescript
import { AdminComponent } from './admin/admin.component'

export const routes: Routes = [
  { path: 'admin', component: AdminComponent }
]
```

**Correct (lazy route component):**

```typescript
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  }
]
```

Reference: [Angular Routing](https://angular.dev/guide/routing)
