import { useDeferredValue, useMemo, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const ITEMS = Array.from({ length: 4000 }, (_, i) => `task-${i}`)

function filterWithBusyWork(query) {
  let burn = 0
  for (let i = 0; i < 1_200_000; i++) {
    burn += i % 5
  }
  const q = query.trim().toLowerCase()
  console.log('[useDeferredValue SlowFilter] recomputed for', q, 'burn', burn % 3)
  if (!q) return ITEMS.slice(0, 40)
  return ITEMS.filter((t) => t.includes(q)).slice(0, 40)
}

export default function SlowFilter() {
  const [query, setQuery] = useState('task-5')
  const deferredQuery = useDeferredValue(query)

  const visible = useMemo(() => filterWithBusyWork(deferredQuery), [deferredQuery])

  return (
    <ExampleLayout
      title="1. Defer the expensive filter"
      level="advanced"
      analogy="Voice assistant playback: your words appear instantly in the caption bar while the heavier translation trails a half-beat behind."
      whatToWatch={[
        'Typing in the box stays instant — the list uses the deferred snapshot',
        'Open React Profiler to see deferred re-render as a separate lane',
        'When deferredQuery catches up, expensive recomputation logs once',
      ]}
    >
      <div className="controls">
        <label>
          Search
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>
      <p className="state-debug">
        Live query: <strong>{query}</strong> · Deferred: <strong>{deferredQuery}</strong>
      </p>
      <RenderCounter label="Page" color="#f368e0" />
      <ul style={{ columns: 2, fontSize: '0.85rem' }}>
        {visible.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </ExampleLayout>
  )
}
