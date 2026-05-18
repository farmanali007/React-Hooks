import { useState, useMemo, useCallback, memo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import RenderCounter from './utils/RenderCounter'

/**
 * LESSON 7 — React.memo vs useMemo vs useCallback
 *
 * - useMemo: cache a VALUE (object, array, number from calculation)
 * - useCallback: cache a FUNCTION reference
 * - React.memo: skip re-render of a component if props unchanged
 */

const ListItem = memo(function ListItem({ item, onSelect }) {
  console.log(`[MemoComparison] ListItem ${item.id} rendered`)
  return (
    <li>
      <button type="button" onClick={() => onSelect(item.id)}>
        {item.label}
      </button>
    </li>
  )
})

export default function MemoComparison() {
  const [selected, setSelected] = useState(null)
  const [unrelated, setUnrelated] = useState(0)

  const items = useMemo(
    () => [
      { id: 1, label: 'Apple' },
      { id: 2, label: 'Banana' },
      { id: 3, label: 'Cherry' },
    ],
    [],
  )

  const handleSelectBad = (id) => setSelected(id)

  const handleSelectGood = useCallback((id) => setSelected(id), [])

  return (
    <ExampleLayout
      title="7. React.memo + useMemo + useCallback Together"
      level="advanced"
      analogy="Three tools in a kitchen: useMemo stores the recipe result, useCallback stores the same spatula, React.memo tells the sous-chef not to replate if nothing changed."
      whatToWatch={[
        'Bump unrelated — BAD column: every ListItem re-renders',
        'GOOD column: ListItems skip (stable items + useCallback handler)',
        'Read console for per-item render logs',
      ]}
    >
      <button type="button" onClick={() => setUnrelated((u) => u + 1)}>
        Unrelated parent re-render ({unrelated})
      </button>
      <p>Selected: {selected ?? 'none'}</p>

      <div className="comparison-grid">
        <section className="panel panel-bad">
          <h3>Without useCallback</h3>
          <RenderCounter label="Parent" color="#e74c3c" />
          <ul>
            {items.map((item) => (
              <ListItem key={item.id} item={item} onSelect={handleSelectBad} />
            ))}
          </ul>
        </section>

        <section className="panel panel-good">
          <h3>With useCallback + useMemo</h3>
          <RenderCounter label="Parent" color="#27ae60" />
          <ul>
            {items.map((item) => (
              <ListItem key={item.id} item={item} onSelect={handleSelectGood} />
            ))}
          </ul>
        </section>
      </div>
    </ExampleLayout>
  )
}
