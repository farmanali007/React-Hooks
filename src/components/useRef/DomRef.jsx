import { useRef } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function DomRef() {
  const inputRef = useRef(null)

  console.log('[useRef DOM] render — .current points at element after commit')

  return (
    <ExampleLayout
      title="1. Focus an input with useRef"
      level="beginner"
      analogy="A laser pointer: React paints the room first; your ref remembers the exact wall socket so you can aim the beam after the lights are on."
      whatToWatch={[
        'Click Focus — see the browser cursor jump (no state needed)',
        'inputRef.current is null before mount — run DOM code after paint or in handler',
        'Changing ref.current does not re-render',
      ]}
    >
      <div className="controls">
        <input ref={inputRef} defaultValue="Click Focus →" />
        <button type="button" onClick={() => {
          console.log('[useRef DOM] focus via ref')
          inputRef.current?.focus()
        }}>
          Focus input
        </button>
      </div>
      <RenderCounter label="Demo" color="#ff6b6b" />
    </ExampleLayout>
  )
}
