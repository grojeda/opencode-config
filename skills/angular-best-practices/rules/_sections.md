# Sections

This file defines the section order and filename prefixes for Angular rules.

---

## 1. Change Detection and State (change)

**Impact:** CRITICAL  
**Description:** Keep updates explicit, derived, and cheap to render.

## 2. Templates and Rendering (template)

**Impact:** HIGH  
**Description:** Avoid repeated template work and defer expensive UI when possible.

## 3. RxJS and Async Flows (rxjs)

**Impact:** HIGH  
**Description:** Structure observable flows to avoid stale data, duplicate requests, and leaks.

## 4. Routing and Bundle Size (routing)

**Impact:** MEDIUM-HIGH  
**Description:** Deliver feature code only when users navigate into it.

## 5. Forms and Component APIs (forms)

**Impact:** MEDIUM  
**Description:** Typed forms and explicit contracts reduce runtime mistakes.
