import { useId, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function FormLabels() {
  const id = useId()
  const [value, setValue] = useState('')
  console.log('[useId Form] hook id', id)

  return (
    <ExampleLayout
      title="1. Connect label to control"
      level="beginner"
      analogy="Luggage tag matching ticket stubs — screen readers need both sides of the pair to cite the same serial."
      whatToWatch={[
        'htmlFor and id share the useId() output',
        'Clicking the label focuses the input without extra JS',
        'Ids survive strict mode double-invoke — still stable per mount',
      ]}
    >
      <div className="controls">
        <label htmlFor={id}>
          Email
          <input id={id} value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
      </div>
      <RenderCounter label="Form" color="#10ac84" />
    </ExampleLayout>
  )
}
