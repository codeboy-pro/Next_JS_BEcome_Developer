# Next.js Day 6 - Chapter 3: Advance Routing

---

## 1. Nested Dynamic Routing

Dynamic routes can be nested inside each other to create complex URL patterns.

**Syntax:** `[paramName]` folder with another `[paramName]` inside

**Example Structure:**
```
products/
  [id]/
    page.js           → /products/123
    reviews/
      [reviewId]/
        page.js       → /products/123/reviews/456
```

**Accessing Params:**
```jsx
// products/[id]/reviews/[reviewId]/page.js
export default function ReviewPage({ params }) {
  const { id, reviewId } = params;
  return <div>Product: {id}, Review: {reviewId}</div>;
}
```

---

## 2. Catch-All Segments & Optional Catch-All

### Catch-All Segments `[...slug]`
- Matches **one or more** segments
- URL `/docs/a/b/c` → `params.slug = ['a', 'b', 'c']`
- **Required** - `/docs` alone will show 404

### Optional Catch-All `[[...slug]]`
- Matches **zero or more** segments
- URL `/docs` → `params.slug = undefined`
- URL `/docs/a/b` → `params.slug = ['a', 'b']`

**Example:**
```
docs/
  [[...slug]]/
    page.js     → Matches /docs, /docs/a, /docs/a/b/c...
```

---

## 3. Route Groups & Private Folders

### Route Groups `(folderName)`
- Organize routes **without affecting URL**
- Wrap folder name in parentheses `()`
- `/app/(auth)/login/page.js` → URL: `/login`

**Example:**
```
(auth)/
  login/page.js      → /login
  signup/page.js     → /signup
  forget/page.js     → /forget
```

### Private Folders `_folderName`
- Prefix with underscore `_`
- **Excluded from routing** completely
- Used for components, utilities, helpers

**Example:**
```
(auth)/
  _components/     → Not routable, for shared components
  _utils/          → Not routable, for utility functions
```

---

## 4. Intercepting Routes - Same & One Level Up

Intercepting routes allow you to show a route within the context of another route (like modals).

### Same Level `(.)`
- Intercepts routes at the **same folder level**
- Syntax: `(.folderName)`

**Example:**
```
dashboards/
  page.js
  reports/
    page.js           → /dashboards/reports (direct)
  (.)reports/
    page.js           → Intercepts /dashboards/reports (modal)
```

### One Level Up `(..)`
- Intercepts routes **one segment up**
- Syntax: `(..)folderName`

**Example:**
```
dashboards/
  (..)profile/
    page.js           → Intercepts /profile from /dashboards
```

---

## 5. Intercepting Routes - Two Levels & Root Level Up

### Two Levels Up `(..)(..)`
- Intercepts routes **two segments up**

**Example:**
```
dashboards/
  section/
    (..)(..)setting/
      page.js         → Intercepts /setting from /dashboards/section
```

### Root Level `(...)`
- Intercepts routes from the **app root**
- Syntax: `(...)folderName`

**Example:**
```
dashboards/
  section/
    (...)admin/
      page.js         → Intercepts /admin from anywhere
```

**Use Cases:** Modals, photo galleries, shopping carts, login overlays

---

## 6. Parallel Routes & Slots

Parallel routes allow rendering multiple pages **simultaneously** in the same layout.

### Slots
- Created with `@folderName` convention
- Passed as **props** to parent layout
- Each slot can have its own loading/error states

**Example Structure:**
```
dashboard_main/
  layout.js
  page.js
  @feed/
    page.js
  @stats/
    page.js
  @tab1/
    page.js
  @tab2/
    page.js
```

**Layout Usage:**
```jsx
// dashboard_main/layout.js
export default function Layout({ children, feed, stats, tab1, tab2 }) {
  return (
    <div>
      {children}
      <div className="grid">
        {feed}
        {stats}
        {tab1}
        {tab2}
      </div>
    </div>
  );
}
```

**Benefits:**
- Independent loading states per slot
- Conditional rendering based on auth/roles
- Complex dashboard layouts

---

## 7. Unmatched Routes & Default Page Convention

When navigating to a slot that doesn't have a matching route, Next.js needs a fallback.

### `default.js`
- Renders when a slot doesn't match the current URL
- Acts as a **fallback** for parallel routes
- Prevents 404 errors for unmatched slots

**Example:**
```
dashboard_main/
  default.js          → Fallback for main content
  @tab1/
    default.js        → Fallback when tab1 route doesn't match
    page.js
    tab1/
      page.js
  @tab2/
    default.js        → Fallback when tab2 route doesn't match
    page.js
```

**When to Use:**
- Soft navigation (client-side) - previous state preserved
- Hard navigation (refresh/direct URL) - `default.js` renders

---

## 8. Custom Not-Found Page

Create a custom 404 page for your application.

### Global Not-Found
Create `not-found.js` in `app/` folder:

```jsx
// app/not-found.js
export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link href="/">Go Home</Link>
    </div>
  );
}
```

### Programmatic Not-Found
Trigger not-found from any page:

```jsx
import { notFound } from 'next/navigation';

export default function ProductPage({ params }) {
  const product = getProduct(params.id);
  
  if (!product) {
    notFound(); // Triggers not-found.js
  }
  
  return <div>{product.name}</div>;
}
```

---

## Quick Reference Table

| Feature | Syntax | Example URL |
|---------|--------|-------------|
| Dynamic Route | `[param]` | `/products/123` |
| Nested Dynamic | `[param]/[nested]` | `/products/123/reviews/1` |
| Catch-All | `[...slug]` | `/docs/a/b/c` (required) |
| Optional Catch-All | `[[...slug]]` | `/docs` or `/docs/a/b` |
| Route Group | `(name)` | No URL impact |
| Private Folder | `_name` | Not routable |
| Intercept Same | `(.)` | Modal overlay |
| Intercept 1 Up | `(..)` | Modal overlay |
| Intercept 2 Up | `(..)(..)` | Modal overlay |
| Intercept Root | `(...)` | Modal overlay |
| Parallel Route/Slot | `@name` | Dashboard sections |
| Default Fallback | `default.js` | Unmatched slots |
| Not Found | `not-found.js` | 404 page |

---

**📅 Date:** December 15, 2025  
**📚 Course:** Next.js - Become Developer  
**📖 Chapter:** 3 - Advance Routing
