import { useEffect, useLayoutEffect, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function PostPaintCorrect() {
  const [open, setOpen] = useState(false)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    // Runs after paint — intermediate frame may show offset 0 before this schedules
    console.log('[useLayoutEffect Flicker] useEffect correction scheduled')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: demo effect-after-paint vs layout
    setOffset(open ? 40 : 0)
  }, [open])

  return (
    <div>
      <RenderCounter label="useEffect" color="#e74c3c" />
      <div className="controls">
        <button type="button" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Open'} popover
        </button>
      </div>
      <div
        className="state-debug"
        style={{
          marginTop: 8,
          transform: `translateY(${offset}px)`,
          border: '1px solid var(--border)',
          padding: '0.5rem',
          width: 220,
        }}
      >
        Content (offset {offset}px after effect)
      </div>
    </div>
  )
}

function PrePaintCorrect() {
  const [open, setOpen] = useState(false)
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    console.log('[useLayoutEffect Flicker] useLayoutEffect correction before paint')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: sync DOM-adjacent state pre-paint
    setOffset(open ? 40 : 0)
  }, [open])

  return (
    <div>
      <RenderCounter label="useLayoutEffect" color="#27ae60" />
      <div className="controls">
        <button type="button" onClick={() => setOpen((o) => !o)}>
          {open ? 'Close' : 'Open'} popover
        </button>
      </div>
      <div
        className="state-debug"
        style={{
          marginTop: 8,
          transform: `translateY(${offset}px)`,
          border: '1px solid var(--border)',
          padding: '0.5rem',
          width: 220,
        }}
      >
        Content (offset {offset}px before paint)
      </div>
    </div>
  )
}

export default function FlickerFix() {
  return (
    <ExampleLayout
      title="3. Correct layout before paint"
      level="advanced"
      analogy="Fixing the roller coaster harness before the ride photo snaps — not after the flash."
      whatToWatch={[
        'Both panels snap offset — compare console timing vs perceived flicker (slow CPU throttling exaggerates left)',
        'useLayoutEffect is synchronous — keep work tiny to avoid blocking paint',
        'Prefer CSS transforms and compositor-friendly props when you can',
      ]}
    >
      <ComparisonLayout
        withoutTitle="useEffect repositions"
        withTitle="useLayoutEffect repositions"
        withoutHint="Correction runs after paint — intermediate frame possible."
        withHint="Correction runs pre-paint — smoother for anchoring overlays."
        withoutPanel={<PostPaintCorrect />}
        withPanel={<PrePaintCorrect />}
      />
    </ExampleLayout>
  )
}
