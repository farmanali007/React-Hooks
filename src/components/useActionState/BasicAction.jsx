import { useActionState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

async function greetAction(prev, formData) {
  const name = String(formData.get('name') ?? '').trim()
  console.log('[useActionState Basic] action saw', name)
  await new Promise((r) => setTimeout(r, 450))
  if (!name) {
    return { ...prev, message: 'Please enter a name.' }
  }
  return { ...prev, message: `Welcome, ${name}!`, last: name }
}

export default function BasicAction() {
  const [state, formAction, pending] = useActionState(greetAction, {
    message: 'Submit the form to see a greeting.',
    last: '',
  })

  console.log('[useActionState Basic] render', { pending, state })

  return (
    <ExampleLayout
      title="1. Hello from useActionState"
      level="advanced"
      analogy="Concierge desk: you drop a card in the box (formData) — the clerk returns a stamped receipt (state) once processing finishes."
      whatToWatch={[
        'form action receives previous state + FormData',
        'pending flips true while the async function runs',
        'Try empty submit → validation message without throwing',
      ]}
    >
      <form className="controls" action={formAction}>
        <label>
          Name
          <input name="name" placeholder="Ada" defaultValue={state.last} />
        </label>
        <button type="submit" disabled={pending}>
          {pending ? 'Working…' : 'Greet'}
        </button>
      </form>
      <p className="state-debug">{state.message}</p>
      <RenderCounter label="Form host" color="#54a0ff" />
    </ExampleLayout>
  )
}
