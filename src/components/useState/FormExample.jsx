import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

/**
 * LESSON 7 — Real-world form with multiple pieces of state
 */

export default function FormExample() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isValid = name.trim().length >= 2 && email.includes('@')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
    console.log('[Form] Submitted:', { name, email })
  }

  const reset = () => {
    setName('')
    setEmail('')
    setSubmitted(false)
    console.log('[Form] Reset all state')
  }

  console.log('[Form] render — valid:', isValid, 'submitted:', submitted)

  return (
    <ExampleLayout
      title="7. Form State (Real-World)"
      level="intermediate"
      analogy="A registration desk with separate clipboards for name and email — each field has its own useState, and validation is computed from both."
      whatToWatch={[
        'Submit stays disabled until isValid is true',
        'Each field has its own useState',
        'isValid is derived — not stored separately',
        'Reset clears all state back to initial values',
      ]}
    >
      <RenderCounter label="Form" />

      {submitted ? (
        <div className="lesson-box good-box">
          <h4>Welcome, {name}!</h4>
          <p>We will contact you at {email}</p>
          <button type="button" onClick={reset}>Register another</button>
        </div>
      ) : (
        <form className="hook-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Min 2 characters"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <p className="state-debug">
            Valid: {String(isValid)} · name=&quot;{name}&quot; · email=&quot;{email}&quot;
          </p>
          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      )}
    </ExampleLayout>
  )
}
