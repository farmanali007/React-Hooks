import { forwardRef, useRef } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const FancyInput = forwardRef(function FancyInput(props, ref) {
  console.log('[useImperativeHandle Forward] FancyInput render')
  return <input ref={ref} className="state-debug" placeholder={props.placeholder} />
})

export default function ForwardRefBase() {
  const inputRef = useRef(null)

  return (
    <ExampleLayout
      title="1. forwardRef passes the raw DOM handle"
      level="advanced"
      analogy="Handing someone the actual flashlight instead of describing where the button is — parents can point it directly."
      whatToWatch={[
        'ref attaches to the inner &lt;input&gt;, not the wrapper function',
        'forwardRef is required because function components have no instance',
        'Next lessons wrap this handle with useImperativeHandle',
      ]}
    >
      <div className="controls">
        <button
          type="button"
          onClick={() => {
            console.log('[useImperativeHandle Forward] parent focuses raw ref')
            inputRef.current?.focus()
          }}
        >
          Focus from parent
        </button>
      </div>
      <FancyInput ref={inputRef} placeholder="I receive ref via forwardRef" />
      <RenderCounter label="Parent" color="#576574" />
    </ExampleLayout>
  )
}
