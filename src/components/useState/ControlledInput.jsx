import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

/**
 * LESSON 2 — Controlled inputs: value + onChange tied to state
 */

function WithoutControlled() {
  console.log('[Controlled] WITHOUT render')
  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <input type="text" placeholder="Type here..." defaultValue="" />
      <p className="hint">Uses defaultValue — React does not track what you type.</p>
    </div>
  )
}

function WithControlled() {
  const [text, setText] = useState('')
  console.log('[Controlled] WITH render, text =', text)

  return (
    <div>
      <RenderCounter label="With useState" color="#27ae60" />
      <input
        type="text"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>You typed: <strong>{text.length ? text : '(nothing yet)'}</strong></p>
      <p className="state-debug">Characters: {text.length}</p>
    </div>
  )
}

export default function ControlledInput() {
  return (
    <ExampleLayout
      title="2. Controlled Input"
      level="beginner"
      analogy="Controlled input is like a translator between the keyboard and React's memory — every keypress updates state, state updates the input."
      whatToWatch={[
        'Type on the RIGHT — live preview below mirrors state',
        'LEFT input works but React does not know the value',
        'Render counter ticks as you type on the right',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Uncontrolled (defaultValue)"
        withTitle="Controlled (value + onChange)"
        withoutHint="DOM holds the value; React cannot read it for logic or validation."
        withHint="State is the single source of truth for the input value."
        withoutPanel={<WithoutControlled />}
        withPanel={<WithControlled />}
      />
    </ExampleLayout>
  )
}
