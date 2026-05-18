import { useFormStatus } from 'react-dom'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function FooterActions() {
  const { pending } = useFormStatus()
  console.log('[useFormStatus Nested] pending', pending)

  return (
    <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
      <p className="panel-hint">Nested subtree still observes the same form status.</p>
      <div className="controls">
        <button type="submit" disabled={pending}>
          {pending ? 'Saving nested…' : 'Save from nested row'}
        </button>
      </div>
    </div>
  )
}

async function saveSurvey() {
  console.log('[useFormStatus Nested] action')
  await new Promise((r) => setTimeout(r, 650))
}

export default function NestedForm() {
  console.log('[useFormStatus Nested] host render')

  return (
    <ExampleLayout
      title="3. Deep children without prop drilling"
      level="intermediate"
      analogy="Warehouse PA system: everyone hears the same alarm floor-wide — you do not whisper chain-of-command down each aisle."
      whatToWatch={[
        'FooterActions lives several nodes deeper but still calls useFormStatus',
        'Avoid passing pending props through 3+ layout wrappers',
        'Multiple forms? each subtree reads its nearest submitting ancestor',
      ]}
    >
      <form className="controls" action={saveSurvey} style={{ display: 'grid', gap: '0.75rem' }}>
        <label>
          Favorite hook
          <input name="favorite" placeholder="useReducer" />
        </label>
        <div className="state-debug">
          <p>Intermediate layout wrappers could live here in real apps.</p>
          <FooterActions />
        </div>
      </form>
      <RenderCounter label="Survey host" color="#48dbfb" />
    </ExampleLayout>
  )
}
