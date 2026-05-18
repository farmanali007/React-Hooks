import { useDeferredValue, useMemo, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const DATA = Array.from({ length: 3000 }, (_, i) => `item-${i}`)

function work(query) {
  let x = 0
  for (let i = 0; i < 900_000; i++) {
    x += i % 4
  }
  const q = query.trim().toLowerCase()
  console.log('[useDeferredValue Vs] filter', q, 'noise', x % 2)
  if (!q) return DATA.slice(0, 25)
  return DATA.filter((d) => d.includes(q)).slice(0, 25)
}

function ImmediatePanel() {
  const [query, setQuery] = useState('item-10')
  const rows = useMemo(() => work(query), [query])
  console.log('[useDeferredValue Vs] ImmediatePanel render')

  return (
    <div>
      <RenderCounter label="Immediate" color="#e74c3c" />
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul style={{ fontSize: '0.8rem', maxHeight: 220, overflow: 'auto' }}>
        {rows.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  )
}

function DeferredPanel() {
  const [query, setQuery] = useState('item-10')
  const deferred = useDeferredValue(query)
  const rows = useMemo(() => work(deferred), [deferred])
  console.log('[useDeferredValue Vs] DeferredPanel render')

  return (
    <div>
      <RenderCounter label="Deferred" color="#27ae60" />
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul style={{ fontSize: '0.8rem', maxHeight: 220, overflow: 'auto' }}>
        {rows.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  )
}

export default function VsNoDefer() {
  return (
    <ExampleLayout
      title="2. Side-by-side: tied vs deferred work"
      level="advanced"
      analogy="Highway on-ramp metering: deferred side lets cars (keystrokes) merge smoothly instead of slamming the main lanes every time."
      whatToWatch={[
        'Left: typing may feel sticky because render + filter happen in lockstep',
        'Right: input updates immediately while list trails slightly',
        'CPU throttle in DevTools makes the contrast obvious',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Filter on every keystroke"
        withTitle="useDeferredValue(query)"
        withoutHint="Heavy useMemo tied directly to raw input."
        withHint="Expensive memo keys off deferred snapshot."
        withoutPanel={<ImmediatePanel />}
        withPanel={<DeferredPanel />}
      />
    </ExampleLayout>
  )
}
