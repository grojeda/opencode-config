# Angular Best Practices

**Version 1.0.0**  
German Rodriguez  
May 2026

> **Note:**  
> This guide is optimized for agents and LLMs that generate, review, or refactor Angular code. Humans can use it too, but the guidance is written to produce consistent automated decisions.

---

## Abstract

Practical Angular guidance centered on modern standalone applications. The rules prioritize predictable change detection, efficient templates, safe RxJS flows, lazy delivery, and typed forms.

---

## Table of Contents

1. [Change Detection and State](#1-change-detection-and-state) — **CRITICAL**
   - 1.1 [Prefer OnPush with Signals or Computed State](#11-prefer-onpush-with-signals-or-computed-state)
   - 1.2 [Derive View State Instead of Synchronizing Duplicates](#12-derive-view-state-instead-of-synchronizing-duplicates)
2. [Templates and Rendering](#2-templates-and-rendering) — **HIGH**
   - 2.1 [Avoid Calling Expensive Methods from Templates](#21-avoid-calling-expensive-methods-from-templates)
   - 2.2 [Track Identity in Repeated Lists](#22-track-identity-in-repeated-lists)
   - 2.3 [Defer Heavy UI Until Needed](#23-defer-heavy-ui-until-needed)
3. [RxJS and Async Flows](#3-rxjs-and-async-flows) — **HIGH**
   - 3.1 [Use switchMap for Latest-Only Request Flows](#31-use-switchmap-for-latest-only-request-flows)
   - 3.2 [Bind Subscriptions to Component Lifecycle](#32-bind-subscriptions-to-component-lifecycle)
4. [Routing and Bundle Size](#4-routing-and-bundle-size) — **MEDIUM-HIGH**
   - 4.1 [Lazy Load Standalone Screens](#41-lazy-load-standalone-screens)
   - 4.2 [Resolve Critical Route Data Before Rendering](#42-resolve-critical-route-data-before-rendering)
5. [Forms and Component APIs](#5-forms-and-component-apis) — **MEDIUM**
   - 5.1 [Prefer Typed Reactive Forms for Non-Trivial Forms](#51-prefer-typed-reactive-forms-for-non-trivial-forms)

---

## 1. Change Detection and State

Impact: CRITICAL

Angular gets easier to reason about when state updates are explicit and rendering does not depend on broad mutable objects or incidental change detection.

### 1.1 Prefer OnPush with Signals or Computed State

Use `ChangeDetectionStrategy.OnPush` for feature components and feed the template with signals, inputs, observables via `async`, or computed state. This reduces unnecessary checks and makes update paths visible.

**Incorrect:**

```typescript
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {
  items: CartItem[] = []

  addItem(item: CartItem) {
    this.items.push(item)
  }
}
```

**Correct:**

```typescript
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  readonly items = signal<CartItem[]>([])
  readonly total = computed(() => this.items().reduce((sum, item) => sum + item.price, 0))

  addItem(item: CartItem) {
    this.items.update(items => [...items, item])
  }
}
```

Prefer immutable updates. Do not rely on mutating arrays or objects in place and hoping the template refreshes correctly.

Reference: [Angular Signals](https://angular.dev/guide/signals)

### 1.2 Derive View State Instead of Synchronizing Duplicates

Do not store state that can be derived from other state. Duplicate mutable state drifts and adds maintenance cost.

**Incorrect:**

```typescript
export class ProductsComponent {
  readonly products = signal<Product[]>([])
  readonly selectedCategory = signal<string>('all')
  filteredProducts: Product[] = []

  setCategory(category: string) {
    this.selectedCategory.set(category)
    this.filteredProducts = this.products().filter(product => category === 'all' || product.category === category)
  }
}
```

**Correct:**

```typescript
export class ProductsComponent {
  readonly products = signal<Product[]>([])
  readonly selectedCategory = signal<string>('all')
  readonly filteredProducts = computed(() =>
    this.products().filter(product => {
      const category = this.selectedCategory()
      return category === 'all' || product.category === category
    })
  )
}
```

Reference: [Angular Signals](https://angular.dev/guide/signals)

## 2. Templates and Rendering

Impact: HIGH

Angular templates run often. Small mistakes there become repeated work across the whole screen.

### 2.1 Avoid Calling Expensive Methods from Templates

Avoid method calls in templates when the method performs filtering, sorting, mapping, or allocation. Compute once with signals, observables, or cached properties.

**Incorrect:**

```html
<li *ngFor="let item of getVisibleItems()">
  {{ item.name }}
</li>
```

```typescript
getVisibleItems() {
  return this.items.filter(item => item.visible)
}
```

**Correct:**

```typescript
readonly visibleItems = computed(() => this.items().filter(item => item.visible))
```

```html
@for (item of visibleItems(); track item.id) {
  <li>{{ item.name }}</li>
}
```

Reference: [Angular Control Flow](https://angular.dev/guide/templates/control-flow)

### 2.2 Track Identity in Repeated Lists

Always track stable identity in repeated collections. Without tracking, Angular recreates DOM nodes more often than necessary.

**Incorrect:**

```html
<li *ngFor="let user of users">
  {{ user.name }}
</li>
```

**Correct:**

```html
@for (user of users(); track user.id) {
  <li>{{ user.name }}</li>
}
```

If the project still uses `*ngFor`, provide `trackBy`.

Reference: [Angular Control Flow](https://angular.dev/guide/templates/control-flow)

### 2.3 Defer Heavy UI Until Needed

Use `@defer` for expensive widgets, charts, editors, or below-the-fold sections. Do not block initial paint on features the user may never open.

**Incorrect:**

```html
<app-sales-chart />
<app-rich-editor />
```

**Correct:**

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

## 3. RxJS and Async Flows

Impact: HIGH

Bad RxJS chains create duplicate requests, stale UI, and subscription leaks.

### 3.1 Use switchMap for Latest-Only Request Flows

When new user input should cancel prior requests, use `switchMap`. This is common in search, filters, and route-driven queries.

**Incorrect:**

```typescript
this.searchControl.valueChanges.subscribe(term => {
  this.http.get<SearchResult[]>('/api/search', { params: { q: term } }).subscribe(results => {
    this.results.set(results)
  })
})
```

**Correct:**

```typescript
this.searchControl.valueChanges.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  switchMap(term => this.http.get<SearchResult[]>('/api/search', { params: { q: term } }))
).subscribe(results => this.results.set(results))
```

Reference: [RxJS switchMap](https://rxjs.dev/api/operators/switchMap)

### 3.2 Bind Subscriptions to Component Lifecycle

Prefer `takeUntilDestroyed()` instead of manual subscription arrays or forgetting cleanup.

**Incorrect:**

```typescript
export class DashboardComponent implements OnDestroy {
  private readonly subscriptions: Subscription[] = []

  ngOnInit() {
    this.subscriptions.push(
      this.metricsService.metrics$.subscribe(metrics => {
        this.metrics.set(metrics)
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
```

**Correct:**

```typescript
export class DashboardComponent {
  private readonly destroyRef = inject(DestroyRef)

  ngOnInit() {
    this.metricsService.metrics$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(metrics => this.metrics.set(metrics))
  }
}
```

Reference: [Angular RxJS Interop](https://angular.dev/guide/ecosystem/rxjs-interop)

## 4. Routing and Bundle Size

Impact: MEDIUM-HIGH

Feature delivery should follow navigation intent. Ship less code up front.

### 4.1 Lazy Load Standalone Screens

For feature routes, prefer lazy entry points with `loadComponent` or `loadChildren`. Do not eagerly import every screen into the root routing config.

**Incorrect:**

```typescript
import { AdminComponent } from './admin/admin.component'

export const routes: Routes = [
  { path: 'admin', component: AdminComponent }
]
```

**Correct:**

```typescript
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  }
]
```

Reference: [Angular Routing](https://angular.dev/guide/routing)

### 4.2 Resolve Critical Route Data Before Rendering

If a route cannot render meaningfully without initial data, use a resolver or route-level data loading rather than booting an empty screen and immediately fetching.

**Incorrect:**

```typescript
export class OrderDetailComponent {
  readonly order = signal<Order | null>(null)

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!
    this.ordersService.getOrder(id).subscribe(order => this.order.set(order))
  }
}
```

**Correct:**

```typescript
export const orderResolver: ResolveFn<Order> = route => {
  return inject(OrdersService).getOrder(route.paramMap.get('id')!)
}

export const routes: Routes = [
  {
    path: 'orders/:id',
    loadComponent: () => import('./order-detail.component').then(m => m.OrderDetailComponent),
    resolve: { order: orderResolver }
  }
]
```

Reference: [Angular Routing Data Resolvers](https://angular.dev/guide/routing/common-router-tasks#pre-fetching-component-data)

## 5. Forms and Component APIs

Impact: MEDIUM

Typed forms and explicit component contracts reduce runtime surprises.

### 5.1 Prefer Typed Reactive Forms for Non-Trivial Forms

For forms with validation, dynamic rules, or submission workflows, use typed reactive forms. Template-driven forms are acceptable for simple inputs, but they do not scale as well.

**Incorrect:**

```typescript
form = new FormGroup({
  name: new FormControl(''),
  email: new FormControl('')
})
```

**Correct:**

```typescript
form = new FormGroup({
  name: new FormControl<string>('', { nonNullable: true }),
  email: new FormControl<string>('', { nonNullable: true })
})
```

Reference: [Angular Typed Forms](https://angular.dev/guide/forms/typed-forms)
