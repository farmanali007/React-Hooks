import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function PaintLogger({ kind, color }) {
  const box = useRef(null)

  useEffect(() => {
    console.log(`[useLayoutEffect Vs] ${kind}: useEffect ran (after paint)`)
  }, [kind])

  useLayoutEffect(() => {
    console.log(`[useLayoutEffect Vs] ${kind}: useLayoutEffect ran (before paint)`)
    if (box.current) {
      const w = box.current.getBoundingClientRect().width
      console.log(`[useLayoutEffect Vs] ${kind}: measured width ${Math.round(w)}px`)
    }
  }, [kind])

  return (
    <div>
      <RenderCounter label={kind} color={color} />
      <div ref={box} className="state-debug" style={{ padding: '0.5rem', border: '1px dashed var(--border)' }}>
        Box for measurement
      </div>
      <p className="panel-hint" style={{ fontSize: '0.85rem' }}>
        Open the console — layout logs appear before paint logs on each remount.
      </p>
    </div>
  )
}

export default function VsUseEffect() {
  const [mode, setMode] = useState('A')

  return (
    <ExampleLayout
      title="1. useLayoutEffect before paint"
      level="advanced"
      analogy="useEffect is stage crew after the curtain rises; useLayoutEffect is crew adjusting props while the curtain is still down."
      whatToWatch={[
        'Console timeline: layout runs before paint; effect runs after',
        'Flip mode to remount panels and replay the ordering',
        'useLayoutEffect is for DOM work that must complete pre-paint',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setMode((m) => (m === 'A' ? 'B' : 'A'))}>
          Toggle mode ({mode})
        </button>
      </div>
      <ComparisonLayout
        withoutTitle="Schedule A"
        withTitle="Schedule B"
        withoutHint="Both hooks run — compare ordering in the console."
        withHint="Remount triggers the same ordering pattern."
        withoutPanel={<PaintLogger kind={`panel-A-${mode}`} color="#e74c3c" />}
        withPanel={<PaintLogger kind={`panel-B-${mode}`} color="#27ae60" />}
      />
    </ExampleLayout>
  )
}
