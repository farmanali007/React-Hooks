import { useState, useEffect } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function WrongDepsPanel({ items }) {
  const [filtered, setFiltered] = useState(items)

  // Bug: missing `items` in deps — stale closure after parent updates list
  useEffect(() => {
    console.log('[useEffect WrongDeps] WRONG — effect runs but may use stale items')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- teaching demo
    setFiltered(items)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- intentional bug for teaching

  return (
    <div>
      <RenderCounter label="Wrong deps" color="#e74c3c" />
      <p>Filtered count: {filtered.length}</p>
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function CorrectDepsPanel({ items }) {
  const [filtered, setFiltered] = useState(items)

  useEffect(() => {
    console.log('[useEffect WrongDeps] CORRECT — sync when items change:', items)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- teaching demo
    setFiltered(items)
  }, [items])

  return (
    <div>
      <RenderCounter label="Correct deps" color="#27ae60" />
      <p>Filtered count: {filtered.length}</p>
      <ul>
        {filtered.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function WrongDeps() {
  const [items, setItems] = useState(['Apple', 'Banana'])

  return (
    <ExampleLayout
      title="5. Wrong Dependencies"
      level="intermediate"
      analogy="A GPS set to 'home' once but you moved — empty deps are like never updating your saved address."
      whatToWatch={[
        'Add item — RIGHT panel updates, LEFT may stay stale',
        'Console on correct side logs when items prop changes',
        'ESLint react-hooks/exhaustive-deps warns about this',
      ]}
    >
      <div className="controls">
        <button
          type="button"
          onClick={() => setItems((list) => [...list, `Item ${list.length + 1}`])}
        >
          Add item
        </button>
        <button type="button" onClick={() => setItems(['Reset'])}>
          Reset list
        </button>
      </div>
      <ComparisonLayout
        withoutTitle="[] — runs once (stale)"
        withTitle="[items] — stays in sync"
        withoutHint="Effect captured first items value forever."
        withHint="Re-runs when items reference changes."
        withoutPanel={<WrongDepsPanel items={items} />}
        withPanel={<CorrectDepsPanel items={items} />}
      />
    </ExampleLayout>
  )
}
