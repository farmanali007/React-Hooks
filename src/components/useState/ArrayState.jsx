import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

/**
 * LESSON 4 — Array state: push (mutate) vs spread (immutable)
 */

function WithoutImmutable({ items, setItems }) {
  console.log('[ArrayState] WITHOUT render', items.length)

  const addItem = () => {
    items.push(`Item ${items.length + 1}`)
    setItems(items)
    console.log('[ArrayState] Pushed to same array reference')
  }

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <ul className="mini-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <button type="button" onClick={addItem}>Add (push)</button>
    </div>
  )
}

function WithImmutable() {
  const [items, setItems] = useState(['Apple', 'Banana'])
  console.log('[ArrayState] WITH render', items.length)

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`])
    console.log('[ArrayState] New array via spread')
  }

  const removeLast = () => {
    setItems(items.slice(0, -1))
  }

  return (
    <div>
      <RenderCounter label="With useState" color="#27ae60" />
      <ul className="mini-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="controls">
        <button type="button" onClick={addItem}>Add (spread)</button>
        <button type="button" onClick={removeLast}>Remove last</button>
      </div>
    </div>
  )
}

export default function ArrayState() {
  const [items, setItems] = useState(['Apple', 'Banana'])

  return (
    <ExampleLayout
      title="4. Array State (Add / Remove)"
      level="intermediate"
      analogy="Like adding a page to a book — you need a new edition (new array), not scribble on the same page in place."
      whatToWatch={[
        'LEFT push may fail to show new items',
        'RIGHT spread always updates the list',
        'Remove uses slice() to create a shorter new array',
      ]}
    >
      <ComparisonLayout
        withoutTitle="items.push() — mutate"
        withTitle="[...items, new] — immutable"
        withoutPanel={<WithoutImmutable items={items} setItems={setItems} />}
        withPanel={<WithImmutable />}
      />
    </ExampleLayout>
  )
}
