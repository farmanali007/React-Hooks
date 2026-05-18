import { useEffect, useRef, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function PreviousValue() {
  const [count, setCount] = useState(0)
  const prev = useRef(undefined)

  useEffect(() => {
    console.log('[useRef Previous] after commit, previous was', prev.current)
    prev.current = count
  }, [count])

  console.log('[useRef Previous] render count=', count)

  return (
    <ExampleLayout
      title="4. Track previous prop/state"
      level="intermediate"
      analogy="A security camera's rewind buffer: today's frame (state) plays live; yesterday's frame stays on tape (ref) for comparison."
      whatToWatch={[
        'Console logs show previous count after each change',
        'Ref updates inside useEffect — avoid render-phase mutations',
        'Pattern extends to comparing expensive derived props',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Increment ({count})
        </button>
      </div>
      <RenderCounter label="Demo" color="#ff6b6b" />
    </ExampleLayout>
  )
}
