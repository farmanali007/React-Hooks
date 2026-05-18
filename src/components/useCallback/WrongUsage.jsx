import { useCallback, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function SimpleBump() {
  const [n, setN] = useState(0)
  console.log('[useCallback Wrong] simple render')

  const inc = useCallback(() => setN((v) => v + 1), [])

  return (
    <div>
      <RenderCounter label="Over-memoized" color="#e74c3c" />
      <p>Childless component — useCallback buys nothing here.</p>
      <button type="button" onClick={inc}>
        +1 ({n})
      </button>
    </div>
  )
}

function SimpleBumpInline() {
  const [n, setN] = useState(0)
  console.log('[useCallback Wrong] simple inline render')
  return (
    <div>
      <RenderCounter label="Plain" color="#27ae60" />
      <button type="button" onClick={() => setN((v) => v + 1)}>
        +1 ({n})
      </button>
    </div>
  )
}

export default function WrongUsage() {
  return (
    <ExampleLayout
      title="4. When useCallback adds noise"
      level="intermediate"
      analogy="Padding every sentence with legalese when texting a friend — technically precise, unnecessarily heavy."
      whatToWatch={[
        'Left: useCallback around a handler passed only to a native button — React was already fast',
        'Right: shorter source without fake optimization',
        'Reach for useCallback when downstream memoization or effects depend on identity',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Needless useCallback"
        withTitle="Plain handler — clearer"
        withoutHint="Extra mental overhead for zero child memo wins."
        withHint="Save useCallback for prop-drilled stable fns or hook deps."
        withoutPanel={<SimpleBump />}
        withPanel={<SimpleBumpInline />}
      />
    </ExampleLayout>
  )
}
