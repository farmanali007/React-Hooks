import { useRef } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function MutableRef() {
  const taps = useRef(0)
  console.log('[useRef Mutable] render')

  return (
    <ExampleLayout
      title="2. Mutable counter without re-renders"
      level="beginner"
      analogy="A pedometer in your pocket: steps increase even if the billboard does not repaint for every footfall."
      whatToWatch={[
        'Tap adds to ref — UI does not auto-refresh until Force render bumps state elsewhere',
        'Use for analytics buffers, drag velocity, last scroll position',
        'Need UI? store display copy in state and sync only when it matters',
      ]}
    >
      <div className="controls">
        <button
          type="button"
          onClick={() => {
            taps.current += 1
            console.log('[useRef Mutable] tap, total', taps.current)
          }}
        >
          Tap (silent)
        </button>
      </div>
      <p className="state-debug">Last known tap count (logged each render): see console between renders</p>
      <RenderCounter label="Parent" color="#ff6b6b" />
    </ExampleLayout>
  )
}
