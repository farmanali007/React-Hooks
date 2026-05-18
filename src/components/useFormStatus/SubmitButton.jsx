import { useFormStatus } from 'react-dom'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function SmartSubmit() {
  const { pending } = useFormStatus()
  console.log('[useFormStatus Submit] pending =', pending)

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Sending…' : 'Send'}
    </button>
  )
}

async function shipOrder() {
  console.log('[useFormStatus Submit] action start')
  await new Promise((r) => setTimeout(r, 700))
  console.log('[useFormStatus Submit] action done')
}

export default function SubmitButton() {
  return (
    <ExampleLayout
      title="1. Child submit reads pending"
      level="intermediate"
      analogy="Airline check-in kiosk: the screen button greys out globally while bags are printing, even though the motor lives two feet away."
      whatToWatch={[
        'useFormStatus must render under the <form> that is submitting',
        'pending flips true for async form actions',
        'Dual submit buttons stay in sync automatically',
      ]}
    >
      <form className="controls" action={shipOrder}>
        <label>
          Item
          <input name="item" placeholder="Book" />
        </label>
        <SmartSubmit />
      </form>
      <RenderCounter label="Merchant" color="#48dbfb" />
    </ExampleLayout>
  )
}
