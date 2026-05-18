import { useState, useMemo, memo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import ComparisonLayout from './utils/ComparisonLayout'
import RenderCounter from './utils/RenderCounter'

/**
 * LESSON 6 — Parent re-renders force child re-renders.
 * useMemo helps when you pass OBJECT/ARRAY props to memoized children.
 */

const SlowChild = memo(function SlowChild({ stats }) {
  console.log('[ParentChild] SlowChild rendered — stats:', stats.label)
  return (
    <div className="child-box">
      <RenderCounter label="Child" color="#9b59b6" />
      <p>Total: {stats.total}</p>
      <p>Average: {stats.average.toFixed(1)}</p>
    </div>
  )
})

function buildStats(numbers) {
  console.log('[ParentChild] buildStats CALCULATING...')
  const total = numbers.reduce((sum, n) => sum + n, 0)
  return { label: 'stats', total, average: total / numbers.length }
}

function WithoutMemoPanel({ numbers }) {
  console.log('[ParentChild] WITHOUT parent panel render')
  const stats = buildStats(numbers)

  return (
    <div>
      <RenderCounter label="Parent (without)" color="#e74c3c" />
      <SlowChild stats={stats} />
    </div>
  )
}

function WithMemoPanel({ numbers }) {
  console.log('[ParentChild] WITH parent panel render')

  const stats = useMemo(() => buildStats(numbers), [numbers])

  return (
    <div>
      <RenderCounter label="Parent (with)" color="#27ae60" />
      <SlowChild stats={stats} />
    </div>
  )
}

export default function ParentChildExample() {
  const [numbers] = useState([10, 20, 30, 40, 50])
  const [parentClicks, setParentClicks] = useState(0)

  return (
    <ExampleLayout
      title="6. Parent–Child Re-renders + React.memo"
      level="intermediate"
      analogy="You hand your friend a NEW piece of paper with the same answer written on it. They think it's new work. useMemo hands them the SAME paper (same reference) so React.memo skips re-render."
      whatToWatch={[
        'Child uses React.memo — skips render if props are referentially equal',
        'WITHOUT: new stats object every parent render → child always re-renders',
        'WITH: same stats reference when numbers unchanged → child skips',
        'Click parent button — watch child render counter',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setParentClicks((c) => c + 1)}>
          Re-render parent only ({parentClicks})
        </button>
        <p className="hint">Numbers array never changes — only parent state does.</p>
      </div>

      <ComparisonLayout
        withoutPanel={<WithoutMemoPanel numbers={numbers} />}
        withPanel={<WithMemoPanel numbers={numbers} />}
      />
    </ExampleLayout>
  )
}
