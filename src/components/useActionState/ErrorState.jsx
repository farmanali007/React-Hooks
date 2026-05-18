import { useActionState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

async function fragileSave(prev, formData) {
  const note = String(formData.get('note') ?? '')
  console.log('[useActionState Error] attempting save', note)
  await new Promise((r) => setTimeout(r, 400))
  if (note.toLowerCase().includes('boom')) {
    return { ...prev, error: 'Validation: remove the word boom 🧨', saved: prev.saved }
  }
  return { error: null, saved: [...prev.saved, note] }
}

export default function ErrorState() {
  const [state, formAction, pending] = useActionState(fragileSave, { error: null, saved: [] })

  console.log('[useActionState Error] render')

  return (
    <ExampleLayout
      title="3. Return errors as data"
      level="advanced"
      analogy="Airport baggage scanner: the belt keeps moving but a lamp shows orange if your bag needs a human — no need to crash the terminal."
      whatToWatch={[
        'Reducer returns structured errors instead of throwing',
        'Try typing &quot;boom&quot; to trigger a soft failure',
        'Saved items stay in state when validation fails',
      ]}
    >
      <form className="controls" action={formAction}>
        <label>
          Note
          <input name="note" placeholder="Try: ship boom?" />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? 'Saving…' : 'Save'}
        </button>
      </form>
      {state.error && <p className="panel-hint">{state.error}</p>}
      <ul className="state-debug">
        {state.saved.map((line, idx) => (
          <li key={`${line}-${idx}`}>{line}</li>
        ))}
      </ul>
      <RenderCounter label="Notes" color="#54a0ff" />
    </ExampleLayout>
  )
}
