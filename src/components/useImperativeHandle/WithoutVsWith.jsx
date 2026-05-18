import { forwardRef, useImperativeHandle, useRef } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const Leaky = forwardRef(function Leaky(props, ref) {
  console.log('[useImperativeHandle Cmp] Leaky exposes raw input')
  return <input ref={ref} defaultValue="leaky" className="state-debug" />
})

const Sealed = forwardRef(function Sealed(props, ref) {
  const inner = useRef(null)
  useImperativeHandle(ref, () => ({
    safeFocus: () => {
      console.log('[useImperativeHandle Cmp] safeFocus via handle')
      inner.current?.focus()
    },
  }), [])
  console.log('[useImperativeHandle Cmp] Sealed hides DOM')
  return <input ref={inner} defaultValue="sealed" className="state-debug" readOnly />
})

export default function WithoutVsWith() {
  const raw = useRef(null)
  const sealed = useRef(null)

  return (
    <ExampleLayout
      title="4. Raw ref vs imperative seal"
      level="advanced"
      analogy="Hotel room key vs staff master key — guests get enough access to sleep, not to rewiring the breaker panel."
      whatToWatch={[
        'Left parent can call arbitrary DOM APIs — easy to couple tightly',
        'Right parent only gets safeFocus — easier to refactor internals later',
        'Pick sealing when distributing a design-system input across teams',
      ]}
    >
      <ComparisonLayout
        withoutTitle="forwardRef only"
        withTitle="forwardRef + useImperativeHandle"
        withoutHint="Parent receives native input element."
        withHint="Parent receives a tiny API object."
        withoutPanel={
          <div>
            <RenderCounter label="Leaky" color="#e74c3c" />
            <div className="controls">
              <button type="button" onClick={() => raw.current?.select()}>
                select() straight from parent
              </button>
            </div>
            <Leaky ref={raw} />
          </div>
        }
        withPanel={
          <div>
            <RenderCounter label="Sealed" color="#27ae60" />
            <div className="controls">
              <button type="button" onClick={() => sealed.current?.safeFocus()}>
                safeFocus() only
              </button>
            </div>
            <Sealed ref={sealed} />
          </div>
        }
      />
    </ExampleLayout>
  )
}
