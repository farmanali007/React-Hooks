import { forwardRef, useImperativeHandle, useRef } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const ControlledField = forwardRef(function ControlledField(props, ref) {
  const inner = useRef(null)
  useImperativeHandle(ref, () => ({
    focusEnd: () => {
      const el = inner.current
      if (!el) return
      el.focus()
      const len = el.value.length
      el.setSelectionRange(len, len)
      console.log('[useImperativeHandle Focus] focusEnd()')
    },
  }), [])
  console.log('[useImperativeHandle Focus] render')
  return <input ref={inner} defaultValue="Edit me" className="state-debug" />
})

export default function ExposeFocus() {
  const api = useRef(null)

  return (
    <ExampleLayout
      title="2. Custom imperative API (focusEnd)"
      level="advanced"
      analogy="Car key fob: parent presses one button — the car decides to flash lights vs unlock doors internally."
      whatToWatch={[
        'Ref exposes { focusEnd } not the HTMLInputElement',
        'Keeps room to add scrollIntoView later without leaking raw DOM',
        'Click button — caret jumps to end via imperative API',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => api.current?.focusEnd()}>
          Focus &amp; move caret to end
        </button>
      </div>
      <ControlledField ref={api} />
      <RenderCounter label="Parent" color="#576574" />
    </ExampleLayout>
  )
}
