# useState Learning Guide

Start from the app home screen → **useState** → lesson 1.

## Lessons

| # | File | Topic |
|---|------|--------|
| 1 | BasicCounter.jsx | Plain variable vs useState |
| 2 | ControlledInput.jsx | value + onChange |
| 3 | ObjectState.jsx | Immutable object updates |
| 4 | ArrayState.jsx | Add/remove with spread |
| 5 | FunctionalUpdate.jsx | setState(c => c + 1) |
| 6 | ToggleAndDerived.jsx | Boolean + derived UI |
| 7 | FormExample.jsx | Multi-field form |

## Core idea

`useState` gives your component **memory**. When you call the setter, React **re-renders** and the UI reflects the new value.

```js
const [count, setCount] = useState(0)
setCount(count + 1)        // direct update
setCount((c) => c + 1)     // functional update (safer when chaining)
```

Always open **DevTools Console** to see render and state logs.
