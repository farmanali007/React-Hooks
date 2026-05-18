import { useState, useEffect } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function WithoutDeps({ userId }) {
  const [data, setData] = useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: no deps array
  useEffect(() => {
    console.log('[useEffect Deps] WITHOUT — runs every render (no deps array)')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- teaching: missing deps
    setData(`Loaded for user ${userId}`)
  })

  return (
    <div>
      <RenderCounter label="Without deps" color="#e74c3c" />
      <p>Data: {data ?? 'loading…'}</p>
    </div>
  )
}

function WithDeps({ userId }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log('[useEffect Deps] WITH — runs when userId changes:', userId)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- teaching demo
    setData(`Loaded for user ${userId}`)
  }, [userId])

  return (
    <div>
      <RenderCounter label="With [userId]" color="#27ae60" />
      <p>Data: {data ?? 'loading…'}</p>
    </div>
  )
}

export default function DependencyArray() {
  const [userId, setUserId] = useState(1)
  const [tick, setTick] = useState(0)

  console.log('[useEffect Deps] Parent render, userId =', userId)

  return (
    <ExampleLayout
      title="2. Dependency Array"
      level="beginner"
      analogy="A motion sensor without a filter goes off when anyone walks by (every render). With a filter, it only reacts when the specific door opens (dependency changes)."
      whatToWatch={[
        'Bump parent tick — WITHOUT panel effect runs again',
        'Bump parent tick — WITH panel stays quiet',
        'Change userId — BOTH panels fetch again',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setUserId((id) => (id === 1 ? 2 : 1))}>
          Switch user (id: {userId})
        </button>
        <button type="button" onClick={() => setTick((t) => t + 1)}>
          Parent re-render only ({tick})
        </button>
      </div>

      <ComparisonLayout
        withoutTitle="No dependency array"
        withTitle="[userId] dependency"
        withoutHint="Effect runs after every render — wasteful and can loop."
        withHint="Effect runs only when userId changes."
        withoutPanel={<WithoutDeps userId={userId} />}
        withPanel={<WithDeps userId={userId} />}
      />
    </ExampleLayout>
  )
}
