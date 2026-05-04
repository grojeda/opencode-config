---
name: angular-best-practices
description: Angular engineering guidelines for standalone apps, signals, RxJS, templates, routing, and rendering performance. Use this skill when writing, reviewing, or refactoring Angular code to keep components predictable, efficient, and easy to maintain.
license: MIT
metadata:
  author: German Rodriguez
  version: "1.0.0"
---

# Angular Best Practices

Practical Angular guidance for agents and LLMs. Focuses on modern Angular patterns: standalone APIs, signals, controlled RxJS usage, template efficiency, lazy routing, and predictable state flow.

## When to Apply

Use this skill when:

- Creating Angular components, directives, pipes, or services
- Refactoring Angular applications toward standalone APIs
- Reviewing code for change-detection or template performance issues
- Implementing data loading with RxJS or router-based flows
- Splitting features into lazy-loaded routes

## Rule Categories by Priority

| Priority | Category                   | Impact      | Prefix      |
| -------- | -------------------------- | ----------- | ----------- |
| 1        | Change Detection and State | CRITICAL    | `change-`   |
| 2        | Templates and Rendering    | HIGH        | `template-` |
| 3        | RxJS and Async Flows       | HIGH        | `rxjs-`     |
| 4        | Routing and Bundle Size    | MEDIUM-HIGH | `routing-`  |
| 5        | Forms and Component APIs   | MEDIUM      | `forms-`    |

## Quick Reference

### 1. Change Detection and State (CRITICAL)

- `change-onpush-signals` - Prefer `OnPush` with signals or computed state
- `change-derive-state` - Derive view state instead of synchronizing duplicate state

### 2. Templates and Rendering (HIGH)

- `template-avoid-call-expressions` - Avoid calling expensive methods from templates
- `template-track-identity` - Always track identity in repeated lists
- `template-defer-heavy-ui` - Use `@defer` for heavy below-the-fold UI

### 3. RxJS and Async Flows (HIGH)

- `rxjs-switchmap-cancel` - Use `switchMap` for latest-only request flows
- `rxjs-take-until-destroyed` - Bind subscriptions to component lifecycle

### 4. Routing and Bundle Size (MEDIUM-HIGH)

- `routing-lazy-standalone` - Lazy load standalone screens with `loadComponent` or `loadChildren`
- `routing-resolver-critical-data` - Resolve critical route data before rendering when the screen depends on it

### 5. Forms and Component APIs (MEDIUM)

- `forms-typed-reactive` - Prefer typed reactive forms for non-trivial forms

## How to Use

Read rule files under `rules/` for focused guidance and examples:

```text
rules/change-onpush-signals.md
rules/template-track-identity.md
```

Each rule includes:

- What to do and why it matters
- Incorrect example
- Correct example
- Reference link

## Full Guide

See `AGENTS.md` for the compiled Angular guide.
