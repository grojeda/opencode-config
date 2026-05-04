---
title: Use switchMap for Latest-Only Request Flows
impact: HIGH
impactDescription: Prevents stale responses from overwriting newer UI state
tags: angular, rxjs, switchmap, http
---

## Use switchMap for Latest-Only Request Flows

When later input invalidates earlier requests, cancel the old request chain with `switchMap`.

**Incorrect (nested subscriptions):**

```typescript
this.searchControl.valueChanges.subscribe(term => {
  this.http.get<SearchResult[]>('/api/search', { params: { q: term } }).subscribe(results => {
    this.results.set(results)
  })
})
```

**Correct (latest request wins):**

```typescript
this.searchControl.valueChanges.pipe(
  debounceTime(200),
  distinctUntilChanged(),
  switchMap(term => this.http.get<SearchResult[]>('/api/search', { params: { q: term } }))
).subscribe(results => this.results.set(results))
```

Reference: [RxJS switchMap](https://rxjs.dev/api/operators/switchMap)
