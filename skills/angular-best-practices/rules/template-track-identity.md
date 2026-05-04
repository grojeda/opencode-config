---
title: Track Identity in Repeated Lists
impact: HIGH
impactDescription: Preserves DOM nodes and avoids unnecessary re-renders
tags: angular, template, for, ngfor, track
---

## Track Identity in Repeated Lists

Always track a stable key for repeated items.

**Incorrect (no identity tracking):**

```html
<li *ngFor="let user of users">{{ user.name }}</li>
```

**Correct (explicit stable identity):**

```html
@for (user of users(); track user.id) {
  <li>{{ user.name }}</li>
}
```

Reference: [Angular Control Flow](https://angular.dev/guide/templates/control-flow)
