import { useId } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function MultipleIds() {
  const root = useId()
  const nameId = `${root}-name`
  const bioId = `${root}-bio`
  const errId = `${root}-error`

  console.log('[useId Multiple]', { root, nameId, bioId, errId })

  return (
    <ExampleLayout
      title="2. Compose related ids"
      level="beginner"
      analogy="Apartment building: one street address (root id) plus unit numbers (-name, -bio) keeps mail sorted."
      whatToWatch={[
        'Derive suffixes with template strings — still unique network-wide per instance',
        'aria-describedby can reference helper text ids',
        'Avoid manual ++ counters — clashes when concurrent features mount',
      ]}
    >
      <form className="controls" style={{ display: 'grid', gap: '0.75rem' }}>
        <div>
          <label htmlFor={nameId}>Name</label>
          <input id={nameId} aria-describedby={errId} />
        </div>
        <div>
          <label htmlFor={bioId}>Bio</label>
          <textarea id={bioId} rows={3} />
        </div>
        <p id={errId} className="panel-hint">
          Hint: screen readers announce the hint because of aria-describedby.
        </p>
      </form>
      <RenderCounter label="Fieldset" color="#10ac84" />
    </ExampleLayout>
  )
}
