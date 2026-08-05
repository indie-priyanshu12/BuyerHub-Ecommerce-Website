# Requirements: E-Commerce Product Multi-Filter Sidebar

## 1. Project Overview

Build the core browsing interface for a high-traffic marketplace store. Users must be able to
filter a large product inventory using three simultaneous, combinable filter criteria, see
results update instantly (no submit button), and sort the filtered results without re-filtering
the underlying dataset.

This document is the authoritative spec for an AI coding agent implementing this feature. Treat
every requirement below as a testable acceptance criterion, not a suggestion.

---

## 2. Scope

**In scope:**
- Filter sidebar (category, price range, star rating)
- Product grid rendering
- Filter → sort pipeline logic
- Empty-state handling
- Sort dropdown

**Out of scope (do not build unless asked):**
- Backend/API/database — assume a static/mock in-memory product array unless told otherwise
- Cart, checkout, product detail pages
- Auth, pagination/infinite scroll (unless explicitly requested later)
- Search-by-keyword bar

---

## 3. Data Model

Define a `Product` type/interface. Minimum required fields:

```ts
interface Product {
  id: string | number;
  name: string;
  imageUrl: string;
  price: number;        // numeric, not formatted string
  rating: number;        // 0–5, can be fractional (e.g., 4.5)
  category: string;      // e.g., "Electronics", "Apparel", "Footwear"
}
```

The master inventory array (`allProducts`) is the single source of truth and must **never be
mutated** by filtering or sorting. All operations produce new derived arrays.

---

## 4. Filter State Shape

```ts
interface FilterState {
  categories: string[];      // selected category names; [] = no filter applied
  minPrice: number | null;   // null = no lower bound
  maxPrice: number | null;   // null = no upper bound
  minRating: number | null;  // 1–5, null = no rating filter
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';
```

State lives in the parent/container component (or a store) and is passed down to both the
sidebar (controls) and the grid (consumer). This is a controlled, unidirectional data flow:
**Sidebar → State → Filter/Sort Pipeline → Grid**.

---

## 5. Functional Requirements

### 5.1 Sidebar — Category Checklist
- Render a checkbox per unique category (derive the list from `allProducts`, don't hardcode).
- Multiple categories can be selected simultaneously (OR logic within this filter group).
- Toggling a checkbox updates `filters.categories` immediately.

### 5.2 Sidebar — Price Range Slider
- Dual-handle (min and max) range slider.
- Bounds of the slider should be derived from the actual min/max price in `allProducts` (don't
  hardcode a fixed range).
- Dragging either handle updates `filters.minPrice` / `filters.maxPrice` live, in real time (not
  only on release), so the grid updates as the user drags.
- Display the currently selected min/max values as text near the slider.

### 5.3 Sidebar — Minimum Star Rating
- Radio button group, values 1 through 5 stars.
- Only one rating can be selected at a time (single-select, not multi).
- Include a way to clear/deselect (e.g., a "0 / Any" option or a visible reset), since radio
  groups alone can't be unclicked.
- Selecting "N stars" means "N stars and above" (`product.rating >= N`).

### 5.4 Product Grid
- Renders one card per matching product after filter + sort pipeline runs.
- Each card shows: image thumbnail, product name, price (formatted as currency), star rating
  (visual, e.g., stars or "X.X ★").
- Grid re-renders **instantly** on any filter or sort state change — no submit/apply button,
  no debounce delay that feels laggy to the user.

### 5.5 Empty State
- If the filter pipeline returns zero products, the grid is replaced (not just left empty) with
  a message: **"No items match your criteria."** and a **"Reset filters"** button.
- "Reset filters" clears `FilterState` back to its initial/default (no filters applied) value,
  which restores the full inventory.

### 5.6 Sort Dropdown
- Positioned top-right of the product grid area (not inside the sidebar).
- Options (minimum required):
  - `Default` (original inventory order, or unsorted)
  - `Price: Low to High` → ascending by `price`
  - `Price: High to Low` → descending by `price`
  - `Top Rated First` → descending by `rating`
- Changing the dropdown updates `sortOption` and re-renders instantly, applied on top of the
  **already-filtered** result set (see pipeline order in §6).

---

## 6. Core Processing Logic (Backend/Logic Layer)

### 6.1 Filter Function
Write a single pure function, e.g.:

```ts
function filterProducts(products: Product[], filters: FilterState): Product[]
```

Rules:
- A product passes only if it satisfies **all three** filter groups simultaneously (AND logic
  across category / price / rating). Within categories, it's OR logic (matches any selected
  category).
- **Null/empty handling (graceful bypass):**
  - `filters.categories.length === 0` → do not filter by category; all categories pass.
  - `filters.minPrice === null && filters.maxPrice === null` → do not filter by price.
    If only one bound is set, only apply that bound.
  - `filters.minRating === null` → do not filter by rating.
  - If **all** filters are empty/null, `filterProducts` must return the full, unmodified
    `allProducts` array (equivalent objects, safe to treat as a passthrough) — do not silently
    drop items due to a bug in bypass logic.
- Must not mutate the input array or its elements.

### 6.2 Sort Function
Separate, composable pure function:

```ts
function sortProducts(products: Product[], sortOption: SortOption): Product[]
```

- Operates only on the array it's given — it must be called **after** `filterProducts`, never
  before, and never against `allProducts` directly.
- Returns a **new sorted array** (use `.slice()`/spread before `.sort()` — never sort in place
  in a way that mutates the filtered array reference unexpectedly if that array is reused
  elsewhere).

### 6.3 Pipeline Composition
The grid's visible product list is always derived as:

```ts
const visibleProducts = sortProducts(filterProducts(allProducts, filters), sortOption);
```

This composition should be recomputed reactively whenever `filters` or `sortOption` changes
(e.g., via `useMemo` in React, or equivalent reactive computed value in another framework), not
via manual re-fetch or imperative DOM updates.

---

## 7. Non-Functional Requirements

- **Reactivity:** All updates (checkbox, slider drag, radio select, sort change) must reflect in
  the grid on the same render pass / next tick — no perceptible lag, no manual refresh.
- **Performance:** Filtering/sorting should be efficient for large inventories (assume hundreds
  to low thousands of products); avoid O(n²) patterns like re-deriving category lists inside the
  filter loop per item.
- **Separation of concerns:** Filtering/sorting logic must be decoupled from rendering — pure
  functions that could be unit-tested independently of any UI framework.
- **Sticky sidebar:** Sidebar remains visible/fixed in viewport while the product grid scrolls
  independently.
- **Responsive layout:** Sidebar + grid should degrade sensibly on smaller viewports (e.g.,
  sidebar collapses to a toggleable drawer on mobile) — implement if framework/environment
  supports it; otherwise note as a follow-up.

---

## 8. Acceptance / Test Scenarios

An AI agent implementing this should self-check against these scenarios:

1. No filters applied → full inventory shown, in default order.
2. Select one category → only that category's products shown.
3. Select two categories → products from either category shown (union, not intersection).
4. Set price range → only products within bounds (inclusive) shown.
5. Select minimum rating of 4 → only products with rating ≥ 4 shown.
6. Combine category + price + rating → only products satisfying all three simultaneously shown.
7. Tighten filters until no product matches → empty-state message + "Reset filters" button
   appears, grid disappears.
8. Click "Reset filters" from empty state → all filters clear, full inventory returns.
9. Apply filters, then change sort dropdown → filtered subset re-orders correctly; no items are
   added back or dropped due to sorting.
10. Change sort with no filters applied → full inventory re-orders correctly.
11. Rapidly toggle multiple filters → grid state always reflects the latest combination (no
    stale/race-condition renders).

---

## 9. Suggested Implementation Notes (non-binding)

- Framework-agnostic logic (§6) should live in a separate module (e.g., `filterLogic.ts`) from
  UI components, so it's independently testable.
- If using React: hold `filters` and `sortOption` in the nearest common parent, compute
  `visibleProducts` with `useMemo([allProducts, filters, sortOption])`.
- Mock data: generate a reasonably sized (~30–100 item) sample product array with varied
  categories, prices, and ratings to properly exercise edge cases (min/max price extremes,
  0 results, single-category-only products, etc.).
