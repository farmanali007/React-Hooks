import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

/**
 * LESSON 5 — Stale state vs functional updates setCount(c => c + 1)
 */

function WithoutFunctional() {
  const [count, setCount] = useState(0)
  console.log('[Functional] WITHOUT render, count =', count)

  const addThree = () => {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
    console.log('[Functional] WITHOUT: three setCount(count+1) with same stale count')
  }

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p className="big-count">{count}</p>
      <button type="button" onClick={addThree}>+3 (direct)</button>
      <p className="hint">Often only adds 1 — all three use the same old count.</p>
    </div>
  )
}

function WithFunctional() {
  const [count, setCount] = useState(0)
  console.log('[Functional] WITH render, count =', count)

  const addThree = () => {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    console.log('[Functional] WITH: three functional updates queue correctly')
  }

  return (
    <div>
      <RenderCounter label="With useState" color="#27ae60" />
      <p className="big-count">{count}</p>
      <button type="button" onClick={addThree}>+3 (functional)</button>
      <p className="hint">Adds 3 — each updater receives the latest pending value.</p>
    </div>
  )
}

export default function FunctionalUpdate() {
  return (
    <ExampleLayout
      title="5. Functional Updates"
      level="intermediate"
      analogy="Asking 'what is count + 1?' three times in one breath vs asking 'take whatever count is NOW and add 1' three times in a queue."
      whatToWatch={[
        'Click +3 on LEFT — count often jumps by only 1',
        'Click +3 on RIGHT — count jumps by 3',
        'Use setCount(c => c + 1) when new state depends on old state',
      ]}
    >
      <ComparisonLayout
        withoutTitle="setCount(count + 1)"
        withTitle="setCount(c => c + 1)"
        withoutHint="Multiple updates in one event may use the same stale snapshot."
        withHint="React queues updaters and passes the latest value to each function."
        withoutPanel={<WithoutFunctional />}
        withPanel={<WithFunctional />}
      />
    </ExampleLayout>
  )
}
