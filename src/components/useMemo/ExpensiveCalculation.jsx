import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import ComparisonLayout from './utils/ComparisonLayout'
import RenderCounter from './utils/RenderCounter'
import { expensiveWork } from './utils/expensiveWork'

/**
 * LESSON 2 — Doubling down on expensive CPU work
 * Shows timing difference more clearly with a multiplier input.
 */

function WithoutMemo({ base, multiplier }) {
  console.log('[ExpensiveCalc] WITHOUT render')
  const total = expensiveWork(base * 100_000, 'Expensive WITHOUT') * multiplier

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p>Total: <strong>{total.toFixed(0)}</strong></p>
    </div>
  )
}

function WithMemo({ base, multiplier }) {
  console.log('[ExpensiveCalc] WITH render')

  const total = useMemo(() => {
    return expensiveWork(base * 100_000, 'Expensive WITH') * multiplier
  }, [base, multiplier])

  return (
    <div>
      <RenderCounter label="With" color="#27ae60" />
      <p>Total: <strong>{total.toFixed(0)}</strong></p>
    </div>
  )
}

export default function ExpensiveCalculation() {
  const [base, setBase] = useState(50)
  const [multiplier, setMultiplier] = useState(2)
  const [theme, setTheme] = useState('light')

  return (
    <ExampleLayout
      title="2. Expensive Calculation (CPU-heavy)"
      level="beginner"
      analogy="Like re-weighing every grocery bag when you only changed the store's background music (unrelated state)."
      whatToWatch={[
        'Toggle theme — WITHOUT recalculates, WITH skips work',
        'Change base or multiplier — both recalculate',
        'Notice UI lag on WITHOUT side when bumping theme',
      ]}
    >
      <div className="controls">
        <label>
          Base load:
          <input type="range" min="20" max="80" value={base} onChange={(e) => setBase(Number(e.target.value))} />
          {base}
        </label>
        <label>
          Multiplier:
          <input type="number" min="1" max="5" value={multiplier} onChange={(e) => setMultiplier(Number(e.target.value))} />
        </label>
        <button type="button" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          Toggle theme ({theme}) — unrelated re-render
        </button>
      </div>

      <ComparisonLayout
        withoutPanel={<WithoutMemo base={base} multiplier={multiplier} />}
        withPanel={<WithMemo base={base} multiplier={multiplier} />}
      />
    </ExampleLayout>
  )
}
