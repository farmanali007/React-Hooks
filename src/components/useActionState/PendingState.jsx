import { useActionState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

async function slowIncrement(prev) {
  console.log('[useActionState Pending] kickoff', prev.count)
  await new Promise((r) => setTimeout(r, 600))
  return { count: prev.count + 1 }
}

export default function PendingState() {
  const [state, formAction, pending] = useActionState(slowIncrement, { count: 0 })

  console.log('[useActionState Pending] render', state.count, pending)

  return (
    <ExampleLayout
      title="2. Surface pending in the UI"
      level="advanced"
      analogy="Elevator close button: the LED dims while the door motor finishes — you know the command registered."
      whatToWatch={[
        'Third hook tuple member is your pending boolean',
        'Works with button waiting labels + aria-busy',
        'Combine with useFormStatus for leaf submit buttons',
      ]}
    >
      <form className="controls" action={formAction}>
        <p className="state-debug">Count: {state.count}</p>
        <button type="submit" disabled={pending}>
          {pending ? 'Adding…' : 'Add slowly'}
        </button>
      </form>
      <RenderCounter label="Counter shell" color="#54a0ff" />
    </ExampleLayout>
  )
}
