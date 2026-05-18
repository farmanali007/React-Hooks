import { useMemo, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function stress() {
  let x = 0
  for (let i = 0; i < 1_000_000; i++) {
    x += i % 3
  }
  console.log('[useTransition Vs] stress tick', x % 2)
}

function BlockingCounter() {
  const [n, setN] = useState(0)
  stress()
  return (
    <div>
      <RenderCounter label="Blocking bump" color="#e74c3c" />
      <button type="button" onClick={() => setN((c) => c + 1)}>
        Count {n}
      </button>
    </div>
  )
}

function SmoothCounter() {
  const [n, setN] = useState(0)
  const expensive = useMemo(() => {
    stress()
    return n
  }, [n])

  return (
    <div>
      <RenderCounter label="Memoized work" color="#27ae60" />
      <button type="button" onClick={() => setN((c) => c + 1)}>
        Count {expensive}
      </button>
      <p className="state-debug">Lesson pairing: transitions defer state; memo avoids redoing derive.</p>
    </div>
  )
}

export default function VsBlocking() {
  return (
    <ExampleLayout
      title="4. Transitions + memoization mindset"
      level="advanced"
      analogy="Cleaning house before guests arrive vs politely asking them to wait in the garden — both fix crowding, different leverage points."
      whatToWatch={[
        'Left: Every click reruns stress synchronously in render path',
        'Right: stress only loops when `n` changes — pairing idea with useMemo',
        'Real apps combine memoized selectors + transitions + deferred values',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Raw heavy render"
        withTitle="useMemo isolates expensive derive"
        withoutHint="Simulates blocking main-thread math on each interaction."
        withHint="Cheap renders when unrelated siblings update elsewhere."
        withoutPanel={<BlockingCounter />}
        withPanel={<SmoothCounter />}
      />
    </ExampleLayout>
  )
}
