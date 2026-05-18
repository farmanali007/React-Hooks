import { useState, useTransition } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const CHUNKS = {
  alpha: Array.from({ length: 1200 }, (_, i) => `alpha-${i}`),
  beta: Array.from({ length: 1200 }, (_, i) => `beta-${i}`),
}

function ExpensiveList({ id }) {
  const data = CHUNKS[id]
  let burn = 0
  for (let i = 0; i < 950_000; i++) {
    burn += i % 2
  }
  console.log('[useTransition Tab] render list', id, burn % 2)
  return (
    <ul style={{ fontSize: '0.75rem', maxHeight: 200, overflow: 'auto' }}>
      {data.slice(0, 40).map((row) => (
        <li key={row}>{row}</li>
      ))}
    </ul>
  )
}

function BlockingTabs() {
  const [tab, setTab] = useState('alpha')
  return (
    <div>
      <RenderCounter label="Blocking" color="#e74c3c" />
      <div className="controls">
        <button type="button" onClick={() => setTab('alpha')}>
          Alpha
        </button>
        <button type="button" onClick={() => setTab('beta')}>
          Beta
        </button>
      </div>
      <ExpensiveList id={tab} />
    </div>
  )
}

function TransitionTabs() {
  const [tab, setTab] = useState('alpha')
  const [renderTab, setRenderTab] = useState('alpha')
  const [isPending, startTransition] = useTransition()

  return (
    <div>
      <RenderCounter label="Transition" color="#27ae60" />
      <div className="controls">
        <button type="button" onClick={() => { setTab('alpha'); startTransition(() => setRenderTab('alpha')) }}>
          Alpha
        </button>
        <button type="button" onClick={() => { setTab('beta'); startTransition(() => setRenderTab('beta')) }}>
          Beta
        </button>
        {isPending && <span className="state-debug">Swapping…</span>}
      </div>
      <p className="state-debug">Button highlight: {tab} · Heavy list: {renderTab}</p>
      <ExpensiveList id={renderTab} />
    </div>
  )
}

export default function TabSwitch() {
  return (
    <ExampleLayout
      title="3. Decouple tab highlight from heavy body"
      level="advanced"
      analogy="Light switches that snap instantly while the ceiling fan spins down — feedback first, inertia second."
      whatToWatch={[
        'Right side: tab buttons flip immediately; giant list swaps inside transition',
        'Left: everything waits on one synchronous render',
        'Throttle CPU to feel the difference on modest hardware',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Single state for tabs"
        withTitle="Urgent highlight + transition body"
        withoutHint="Click feels tied to list work."
        withHint="startTransition wraps only the expensive state."
        withoutPanel={<BlockingTabs />}
        withPanel={<TransitionTabs />}
      />
    </ExampleLayout>
  )
}
