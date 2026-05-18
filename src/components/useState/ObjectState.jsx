import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

/**
 * LESSON 3 — Updating objects: mutate vs immutable spread
 */

function WithoutImmutable({ user, onChange }) {
  console.log('[ObjectState] WITHOUT render')
  const updateName = () => {
    // eslint-disable-next-line react-hooks/immutability -- teaching: mutating props breaks React
    user.name = 'Updated (mutated!)'
    onChange(user)
    console.log('[ObjectState] Mutated same object reference')
  }

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p>Name: {user.name}</p>
      <button type="button" onClick={updateName}>Change name (mutate)</button>
      <p className="hint">May not re-render — same object reference.</p>
    </div>
  )
}

function WithImmutable() {
  const [user, setUser] = useState({ name: 'Alex', age: 25 })
  console.log('[ObjectState] WITH render', user)

  const updateName = () => {
    setUser({ ...user, name: 'Jordan (new object)' })
    console.log('[ObjectState] New object via spread — React detects change')
  }

  return (
    <div>
      <RenderCounter label="With useState" color="#27ae60" />
      <p>Name: {user.name} · Age: {user.age}</p>
      <button type="button" onClick={updateName}>Change name (spread)</button>
    </div>
  )
}

export default function ObjectState() {
  const [user, setUser] = useState({ name: 'Alex', age: 25 })

  return (
    <ExampleLayout
      title="3. Object State (Immutable Updates)"
      level="intermediate"
      analogy="React compares object references, not every property. You must hand React a new box (new object), not rearrange items inside the same box."
      whatToWatch={[
        'Click mutate on LEFT — UI may not update',
        'Click spread on RIGHT — UI updates reliably',
        'Always: setUser({ ...user, name: "new" })',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Mutate object (wrong)"
        withTitle="New object with spread (correct)"
        withoutPanel={
          <WithoutImmutable user={user} onChange={setUser} />
        }
        withPanel={<WithImmutable />}
      />
    </ExampleLayout>
  )
}
