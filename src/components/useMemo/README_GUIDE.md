# useMemo Learning Guide (In-Project)

This folder is a **hands-on mini-course**. Read this file alongside the live demos.

## Quick start

1. Run `npm run dev` from the project root.
2. Open http://localhost:5173
3. Open **DevTools → Console** (F12).
4. Start with **Lesson 1: Basic** in the sidebar.

## Recommended learning order

| Order | File | Level | What you learn |
|-------|------|-------|----------------|
| 1 | `BasicExample.jsx` | Beginner | Core idea: cache expensive result |
| 2 | `ExpensiveCalculation.jsx` | Beginner | CPU lag on unnecessary work |
| 3 | `WrongUsage.jsx` | Beginner | When NOT to use useMemo |
| 4 | `FilterList.jsx` | Intermediate | Filtering large lists |
| 5 | `SortingExample.jsx` | Intermediate | Sorting large arrays |
| 6 | `SearchOptimization.jsx` | Intermediate | E-commerce search pattern |
| 7 | `DerivedState.jsx` | Intermediate | Derived values from props/state |
| 8 | `ParentChildExample.jsx` | Intermediate | Referential equality + `React.memo` |
| 9 | `CorrectUsage.jsx` | Intermediate | Chained memos, real patterns |
| 10 | `MemoComparison.jsx` | Advanced | `useCallback` + `useMemo` + `memo` |
| 11 | `DashboardExample.jsx` | Advanced | Multi-metric dashboard |

## Shared utilities

- `utils/expensiveWork.js` — fake slow calculation + console timing
- `utils/generateData.js` — large fake datasets
- `utils/RenderCounter.jsx` — visual render count per component
- `utils/ComparisonLayout.jsx` — side-by-side without vs with panels

## How to read each example

Every comparison example has:

1. **WITHOUT panel** (red) — work runs every render
2. **WITH panel** (green) — work runs only when dependencies change
3. **Console logs** — prefix like `[Basic]`, `[Filter]`, `[EXPENSIVE WORK]`
4. **Render counters** — purple/red/green badges on screen

### The mental model

```
State changes → React re-renders component → function body runs again
```

`useMemo` does **not** stop re-renders. It **reuses the previous computed value** when dependencies are unchanged.

## Dependency array rules

```js
useMemo(() => compute(a, b), [a, b])
```

React compares each dependency with `Object.is` (like `===` for primitives).

- Missing deps `[]` → runs once per mount (until deps would change — there are none)
- Wrong deps → stale/wrong cached value (bug!)
- Unstable deps (new object every render) → memo never hits cache

## React DevTools Profiler

1. Install React DevTools browser extension
2. DevTools → **Profiler** tab → Record
3. Click "unrelated re-render" buttons
4. Compare flame graph: WITH panel should show less work

## Note about React Compiler

This project has the **React Compiler** enabled. In production it may auto-optimize some patterns. These lessons use explicit `useMemo` so you can **see and learn** the behavior in console logs.
