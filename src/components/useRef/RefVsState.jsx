import { useRef, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function RefCounter() {
  const n = useRef(0)
  const [, force] = useState(0)
  console.log('[useRef vs State] RefCounter render')

  return (
    <div>
      <RenderCounter label="Ref + manual tick" color="#27ae60" />
      <p>Visible bumps only when we choose to re-render</p>
      <div className="controls">
        <button
          type="button"
          onClick={() => {
            n.current += 1
            console.log('[useRef vs State] ref now', n.current)
          }}
        >
          Increment ref only
        </button>
        <button
          type="button"
          onClick={() => {
            force((v) => v + 1)
            console.log('[useRef vs State] forced render to show', n.current)
          }}
        >
          Force re-render (shows {String('ref value in console')})
        </button>
      </div>
      <p className="state-debug">Ref value not shown: open console after force render</p>
    </div>
  )
}

function StateCounter() {
  const [n, setN] = useState(0)
  console.log('[useRef vs State] StateCounter render, n=', n)

  return (
    <div>
      <RenderCounter label="useState" color="#e74c3c" />
      <p>Each click re-renders automatically</p>
      <div className="controls">
        <button type="button" onClick={() => setN((v) => v + 1)}>
          Increment state ({n})
        </button>
      </div>
    </div>
  )
}

export default function RefVsState() {
  return (
    <ExampleLayout
      title="3. Ref vs state — when to use which"
      level="intermediate"
      analogy="State is a town crier (everyone hears); a ref is a notebook (you jot without shouting)."
      whatToWatch={[
        'Left: rapid ref clicks — no paint until you force',
        'Right: every increment schedules a render + DOM update',
        'Rule of thumb: needs UI? useState/useReducer. Secret bookkeeping? ref.',
      ]}
    >
      <ComparisonLayout
        withoutTitle="useState counter"
        withTitle="useRef counter"
        withoutHint="Updates meant for display should flow through state."
        withHint="Great for timers/ids if the number itself is not shown live."
        withoutPanel={<StateCounter />}
        withPanel={<RefCounter />}
      />
    </ExampleLayout>
  )
}
