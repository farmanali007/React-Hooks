import { useLayoutEffect, useRef, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function MeasureDom() {
  const ref = useRef(null)
  const [rect, setRect] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const box = el.getBoundingClientRect()
    console.log('[useLayoutEffect Measure] DOM rect', box)
    setRect({ width: box.width, height: box.height })
  }, [])

  return (
    <ExampleLayout
      title="2. Measure after DOM commit"
      level="advanced"
      analogy="Tailor measuring pants after you put them on but before you walk onstage — not from the catalogue photo alone."
      whatToWatch={[
        'Resize the window — click Remeasure to log fresh dimensions',
        'Measurements happen before paint so tooltips/portal positions stay aligned',
        'Prefer ResizeObserver for continuous tracking in production',
      ]}
    >
      <div className="controls">
        <button
          type="button"
          onClick={() => {
            const el = ref.current
            if (!el) return
            const box = el.getBoundingClientRect()
            setRect({ width: box.width, height: box.height })
            console.log('[useLayoutEffect Measure] manual remeasure', box)
          }}
        >
          Remeasure
        </button>
      </div>
      <div
        ref={ref}
        className="state-debug"
        style={{ resize: 'horizontal', overflow: 'auto', minWidth: 120, maxWidth: 420, padding: '1rem' }}
      >
        Drag the resize handle → then Remeasure. width×height: {Math.round(rect.width)} × {Math.round(rect.height)}
      </div>
      <RenderCounter label="Measure demo" color="#45b7d1" />
    </ExampleLayout>
  )
}
