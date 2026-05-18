import { useState, useEffect } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function WithoutEffect({ count }) {
  // eslint-disable-next-line react-hooks/immutability -- teaching: side effect during render
  document.title = `Count: ${count}`
  console.log('[useEffect] WITHOUT — set title during render (side effect in render body)')
  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p>Title set during render — can cause warnings / inconsistent timing.</p>
      <p>Count prop: {count}</p>
    </div>
  )
}

function WithEffect({ count }) {
  useEffect(() => {
    document.title = `Count: ${count}`
    console.log('[useEffect] WITH — effect ran after paint, count =', count)
  }, [count])

  return (
    <div>
      <RenderCounter label="With useEffect" color="#27ae60" />
      <p>Title updated in effect — correct place for side effects.</p>
      <p>Count prop: {count}</p>
    </div>
  )
}

export default function BasicEffect() {
  const [count, setCount] = useState(0)
  const [tick, setTick] = useState(0)

  return (
    <ExampleLayout
      title="1. What is useEffect?"
      level="beginner"
      analogy="Render is cooking dinner; useEffect is doing the dishes after guests see the plate — not during the cooking."
      whatToWatch={[
        'Change count — WITH panel effect runs (console log)',
        'Bump tick — WITHOUT runs title on every parent render',
        'Check browser tab title',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
        <button type="button" onClick={() => setTick((t) => t + 1)}>Parent tick ({tick})</button>
      </div>
      <ComparisonLayout
        withoutTitle="Side effect in render (wrong)"
        withTitle="useEffect (correct)"
        withoutHint="Mutating document/window during render is discouraged."
        withHint="Effects run after React commits UI to the screen."
        withoutPanel={<WithoutEffect count={count} />}
        withPanel={<WithEffect count={count} />}
      />
    </ExampleLayout>
  )
}
