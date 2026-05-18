# React Hooks Interactive Course (React + Vite)

A beginner-friendly, hands-on platform to learn React hooks through runnable demos. Pick a hook from the home screen, then work through side-by-side lessons with console logs and render counters.

**Available hooks:** `useState` · `useMemo` (more coming soon)

## How to start

```bash
npm install
npm run dev
```

Open http://localhost:5173 → choose **useState** or **useMemo** from the hook list.

---

# useMemo

A beginner-friendly, hands-on course on React's `useMemo` hook — built directly into this project as runnable demos.

## What is `useMemo`?

`useMemo` is a React hook that **remembers the result of a calculation** between re-renders.

```js
const result = useMemo(() => expensiveCalculation(input), [input])
```

### Real-world analogy

Imagine a coffee shop:

- **Without useMemo:** Every time a customer asks "what's 127 × 89?", the barista recalculates from scratch — even when nobody changed the numbers.
- **With useMemo:** The barista writes the answer on a sticky note. If the numbers are the same, they read the note instead of recalculating.

### Why React re-renders

When **state** or **props** change, React calls your component function again to produce new UI. That is a **re-render**.

Re-rendering is normal and usually fast. Problems appear when you repeat **expensive work** on every render even though inputs did not change.

---

## Why `useMemo` exists

| Problem | How useMemo helps |
|---------|-------------------|
| Expensive math / filtering / sorting | Skip redoing work when deps unchanged |
| New object/array every render | Keep same reference for `React.memo` children |
| Derived dashboard metrics | Recompute only when filters change |

`useMemo` trades a small amount of **memory** (storing the cache) to save **CPU** (skipping work).

---

## Important concepts

### Re-rendering

Your component function runs again. Child components usually re-render too (unless skipped by `React.memo`).

### Memoization

"Caching" a value. React stores the last result and dependency snapshot.

### Dependency array `[a, b]`

React re-runs the function inside `useMemo` only when `a` or `b` changes (compared with `Object.is`).

### Reference comparison

Objects and arrays are compared by **reference**, not deep equality:

```js
{} === {} // false — different references!
```

So `useMemo` is often paired with `React.memo` when passing objects to children.

### Primitives vs objects

- Primitives (`number`, `string`, `boolean`): compared by value
- Objects/arrays/functions: compared by reference

---

## Complete learning path

### How to run

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

### Before each lesson

1. Open **DevTools → Console** (F12)
2. Read the analogy and "What to observe" box
3. Click buttons in order suggested below

### useState learning order

1. **`useState/BasicCounter.jsx`** — Plain variable vs useState
2. **`ControlledInput.jsx`** — Controlled inputs
3. **`ObjectState.jsx`** / **`ArrayState.jsx`** — Immutable updates
4. **`FunctionalUpdate.jsx`** — `setCount(c => c + 1)`
5. **`FormExample.jsx`** — Real-world form

### useMemo learning order

1. **`BasicExample.jsx`** — Start here. See expensive work skip when only unrelated state changes.
2. **`ExpensiveCalculation.jsx`** — Feel UI lag without memoization.
3. **`WrongUsage.jsx`** — Learn when NOT to memoize.
4. **`FilterList.jsx`** — Filter 800 users efficiently.
5. **`SortingExample.jsx`** — Sort large lists.
6. **`SearchOptimization.jsx`** — E-commerce search + banner toggle.
7. **`DerivedState.jsx`** — Cart totals from derived state.
8. **`ParentChildExample.jsx`** — Parent re-renders + `React.memo`.
9. **`CorrectUsage.jsx`** — Chained memos in a realistic pattern.
10. **`MemoComparison.jsx`** — `useMemo` + `useCallback` + `memo`.
11. **`DashboardExample.jsx`** — Analytics-style dashboard.

Level labels in the sidebar: **beginner → intermediate → advanced**.

Detailed notes: [`src/components/useMemo/README_GUIDE.md`](src/components/useMemo/README_GUIDE.md)

---

## Project structure

```
src/
├── App.jsx                          # Hook hub → routes to each course
└── components/
    ├── HookHub/                     # Home screen — pick a hook
    ├── shared/                      # Shared layouts, render counter, lab shell
    ├── useState/                    # useState course (7 lessons)
    └── useMemo/
        ├── UseMemoLearningLab.jsx   # Navigation + lesson router
        ├── useMemoLab.css
        ├── BasicExample.jsx
        ├── ExpensiveCalculation.jsx
        ├── FilterList.jsx
        ├── SortingExample.jsx
        ├── SearchOptimization.jsx
        ├── ParentChildExample.jsx
        ├── MemoComparison.jsx
        ├── WrongUsage.jsx
        ├── CorrectUsage.jsx
        ├── DerivedState.jsx
        ├── DashboardExample.jsx
        ├── README_GUIDE.md
        └── utils/
            ├── expensiveWork.js
            ├── generateData.js
            ├── RenderCounter.jsx
            ├── ExampleLayout.jsx
            └── ComparisonLayout.jsx
```

---

## How to test performance

### 1. Console logs

Each lesson logs:

- Component renders: `[Basic] Parent App rendering`
- Expensive work: `[EXPENSIVE WORK] ... took Xms`
- Filters/sorts: `[Filter] filtered N users in Xms`

**Try:** Click "unrelated re-render" — WITHOUT side logs work again; WITH side does not.

### 2. On-screen render counters

Badges like `Without panel: 5 renders` count how many times that component rendered.

### 3. React DevTools Profiler

1. Install [React DevTools](https://react.dev/learn/react-developer-tools)
2. Profiler → Record → interact → Stop
3. Compare commits when only unrelated state changed

### 4. Strict Mode (development)

In development, React Strict Mode may **double-invoke** some logic to find bugs. Render counters may jump by 2 — that is expected in dev.

---

## Common mistakes

| Mistake | Why it's bad |
|---------|----------------|
| Memoizing `a + b` | Overhead > benefit |
| Wrong dependency array | Stale or wrong cached data |
| Memoizing everything "just in case" | Harder code, more memory, often slower |
| Expecting useMemo to stop re-renders | It only caches values; component still re-renders |
| Unstable deps (`[items.filter(...)]`) | Cache never reused |

**Rule of thumb:** Measure first. Add `useMemo` when you have a real expensive derivation or referential equality need.

---

## Real project scenarios

| Scenario | useMemo? |
|----------|----------|
| Dashboard KPIs from filtered data | Yes — filter/aggregate once per filter change |
| Data table sort/filter on 1000+ rows | Yes |
| Search as you type on huge list | Yes — debouncing also helps |
| Simple `count + 1` | No |
| Static label formatting | No |

---

## Without vs with (summary)

| | Without useMemo | With useMemo |
|---|-----------------|--------------|
| Re-renders | Still happen | Still happen |
| Expensive function | Runs every render | Runs when deps change |
| Object reference | New every render | Stable when deps unchanged |
| Child with React.memo | Often re-renders anyway | Can skip if reference stable |

---

## Tech stack

- React 19 + Vite 8
- React Compiler enabled (see [React Compiler docs](https://react.dev/learn/react-compiler))

---

## Next steps after this course

1. Learn `useCallback` for stable function references
2. Learn `React.memo` for component-level skipping
3. Read [React useMemo docs](https://react.dev/reference/react/useMemo)
4. Profile real apps before optimizing

Happy learning!
