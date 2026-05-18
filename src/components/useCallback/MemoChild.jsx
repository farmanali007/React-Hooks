import { memo, useCallback, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const Row = memo(function Row({ id, label, onSelect }) {
  console.log('[useCallback MemoChild] Row render', id)
  return (
    <li>
      <button type="button" onClick={() => onSelect(id)}>
        {label}
      </button>
    </li>
  )
})

export default function MemoChild() {
  const [active, setActive] = useState('a')
  const [query, setQuery] = useState('')

  const onSelect = useCallback((id) => {
    console.log('[useCallback MemoChild] select', id)
    setActive(id)
  }, [])

  console.log('[useCallback MemoChild] parent render')

  const items = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
    { id: 'c', label: 'Gamma' },
  ].filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <ExampleLayout
      title="3. Lists + memo rows + stable handler"
      level="intermediate"
      analogy="Rehearsing a choir: if only the sopranos change verse, the tenors should not clear their throats again — stable callbacks keep idle rows silent."
      whatToWatch={[
        'Typing filter re-renders parent + visible rows only',
        'onSelect is stable — inactive memo rows skip work when possible',
        'Combine with virtualisation for huge lists in real apps',
      ]}
    >
      <div className="controls">
        <label>
          Filter:&nbsp;
          <input value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
      </div>
      <p className="state-debug">Active: {active}</p>
      <RenderCounter label="List parent" color="#e056fd" />
      <ul>
        {items.map((item) => (
          <Row key={item.id} id={item.id} label={item.label} onSelect={onSelect} />
        ))}
      </ul>
    </ExampleLayout>
  )
}
