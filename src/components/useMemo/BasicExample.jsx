import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import ComparisonLayout from './utils/ComparisonLayout'
import RenderCounter from './utils/RenderCounter'
import { expensiveWork, resetCalcCount } from './utils/expensiveWork'

/**
 * LESSON 1 — The simplest useMemo case
 *
 * WHAT: useMemo(() => compute(), [deps]) caches the RETURN VALUE of compute().
 * WHY: Parent state changes → whole component re-runs → lines run again.
 * WITHOUT useMemo: expensiveWork() runs every render.
 * WITH useMemo: expensiveWork() runs only when `number` changes.
 */

function WithoutMemo({ number }) {
  console.log('%c[Basic] WITHOUT panel rendering', 'color: #e74c3c')
  const result = expensiveWork(5_000_000, 'Basic WITHOUT')

  return (
    <div>
      <RenderCounter label="Without panel" color="#e74c3c" />
      <p>Input: <strong>{number}</strong></p>
      <p>Result: {result.toFixed(2)}</p>
    </div>
  )
}

function WithMemo({ number }) {
  console.log('%c[Basic] WITH panel rendering', 'color: #27ae60')

  const result = useMemo(() => {
    return expensiveWork(5_000_000, `Basic WITH n=${number}`) + number
  }, [number])

  return (
    <div>
      <RenderCounter label="With panel" color="#27ae60" />
      <p>Input: <strong>{number}</strong></p>
      <p>Result: {result.toFixed(2)}</p>
    </div>
  )
}

export default function BasicExample() {
  const [number, setNumber] = useState(5)
  const [unrelated, setUnrelated] = useState(0)

  console.log('%c[Basic] Parent App rendering', 'color: #3498db; font-weight: bold')

  return (
    <ExampleLayout
      title="1. Basic Expensive Calculation"
      level="beginner"
      analogy="A calculator that re-adds 1+1 every time you blink (re-render), even when the numbers didn't change. useMemo says: only recalculate when the numbers change."
      whatToWatch={[
        'Open DevTools Console (F12)',
        'Click "Bump unrelated counter" — WITHOUT side recalculates; WITH side does not',
        'Change the number input — BOTH sides recalculate (dependency changed)',
        'Watch orange [EXPENSIVE WORK] logs',
      ]}
    >
      <div className="controls">
        <label>
          Number (dependency):
          <input
            type="number"
            value={number}
            onChange={(e) => {
              resetCalcCount()
              setNumber(Number(e.target.value))
            }}
          />
        </label>
        <button type="button" onClick={() => setUnrelated((u) => u + 1)}>
          Bump unrelated counter ({unrelated}) — causes re-render only
        </button>
        <button type="button" className="btn-secondary" onClick={resetCalcCount}>
          Reset calc counter in console
        </button>
      </div>

      <ComparisonLayout
        withoutPanel={<WithoutMemo number={number} />}
        withPanel={<WithMemo number={number} />}
      />
    </ExampleLayout>
  )
}
