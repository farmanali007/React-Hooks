import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import RenderCounter from './utils/RenderCounter'

/**
 * LESSON 8 — When NOT to use useMemo
 *
 * Memoizing cheap work costs memory + comparison overhead
 * and makes code harder to read — often slower overall!
 */

function cheapAdd(a, b) {
  return a + b
}

export default function WrongUsage() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(2)
  const [clicks, setClicks] = useState(0)

  const wrongSum = useMemo(() => {
    console.log('[WrongUsage] useMemo ran for cheap add — unnecessary!')
    return cheapAdd(a, b)
  }, [a, b])

  const rightSum = cheapAdd(a, b)

  return (
    <ExampleLayout
      title="8. Wrong Usage — Over-memoizing"
      level="beginner"
      analogy="Hiring a warehouse to store yesterday's answer to 2+2. The storage costs more than doing the math again."
      whatToWatch={[
        'Both sums are correct — performance is NOT always better',
        'Click unrelated — wrong useMemo still runs dependency check',
        'Rule: only memoize when work is measurably expensive OR referential equality matters',
      ]}
    >
      <RenderCounter label="Component" />
      <div className="controls">
        <label>
          a: <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          b: <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
        <button type="button" onClick={() => setClicks((c) => c + 1)}>
          Unrelated clicks: {clicks}
        </button>
      </div>

      <div className="lesson-box bad-box">
        <h4>Wrong: useMemo for trivial math</h4>
        <p>Sum (memoized): {wrongSum}</p>
        <code>{'useMemo(() => a + b, [a, b])'}</code>
      </div>

      <div className="lesson-box good-box">
        <h4>Right: just calculate</h4>
        <p>Sum (plain): {rightSum}</p>
        <code>const sum = a + b</code>
      </div>
    </ExampleLayout>
  )
}
