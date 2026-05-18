import { useActionState, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

async function register(prev, formData) {
  const email = String(formData.get('email') ?? '')
  const tier = String(formData.get('tier') ?? 'free')
  console.log('[useActionState Form] submitting', { email, tier })
  await new Promise((r) => setTimeout(r, 550))
  return {
    ...prev,
    receipt: `Registered ${email} on ${tier} plan`,
  }
}

export default function FormAction() {
  const [state, formAction, pending] = useActionState(register, { receipt: '' })
  const [email, setEmail] = useState('ada@example.com')

  console.log('[useActionState Form] render', pending)

  return (
    <ExampleLayout
      title="4. Controlled + native fields together"
      level="advanced"
      analogy="Hybrid car: the gas pedal is still mechanical (native inputs) while the battery controller (React state) smooths torque."
      whatToWatch={[
        'Controlled text still uses name=email for FormData snapshot on submit',
        'Select stays uncontrolled — FormData picks current value at submit',
        'Works without onSubmit preventDefault thanks to action={formAction}',
      ]}
    >
      <form className="controls" action={formAction} style={{ display: 'grid', gap: '0.75rem' }}>
        <label>
          Email (controlled)
          <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Plan
          <select name="tier" defaultValue="pro">
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>
        </label>
        <button type="submit" disabled={pending}>
          {pending ? 'Provisioning…' : 'Register'}
        </button>
      </form>
      {state.receipt && <p className="state-debug">{state.receipt}</p>}
      <RenderCounter label="Signup" color="#54a0ff" />
    </ExampleLayout>
  )
}
