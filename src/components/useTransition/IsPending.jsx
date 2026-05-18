import { useState, useTransition } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function slowSelect(flag) {
  let x = 0
  for (let i = 0; i < 1_100_000; i++) {
    x += i % 4
  }
  console.log('[useTransition Pending] compute', flag, x % 3)
  return flag
}

export default function IsPending() {
  const [tab, setTab] = useState('home')
  const [rendered, setRendered] = useState('home')
  const [isPending, startTransition] = useTransition()

  return (
    <ExampleLayout
      title="2. isPending feedback"
      level="advanced"
      analogy="Microwave display blinking &quot;HEATING…&quot; — you still open the door for urgent chips (cancel animation), but you know soup is in progress."
      whatToWatch={[
        'Click tabs — pending badge lights while transition finishes',
        'startTransition(() => setRendered(tab)) keeps tab strip snappy',
        'Use CSS skeletons or opacity to echo pending state',
      ]}
    >
      <div className="controls" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['home', 'metrics', 'reports'].map((t) => (
          <button
            key={t}
            type="button"
            className={t === tab ? 'active' : ''}
            onClick={() => {
              setTab(t)
              startTransition(() => {
                const heavy = slowSelect(t)
                setRendered(heavy)
              })
            }}
          >
            {t}
          </button>
        ))}
        {isPending && <span className="state-debug">Pending…</span>}
      </div>
      <p>
        Active tab: <strong>{tab}</strong> · Rendered body: <strong>{rendered}</strong>
      </p>
      <RenderCounter label="Shell" color="#ff9f43" />
      <div className="state-debug" style={{ minHeight: 80 }}>
        {rendered === 'home' && <p>Home — light content.</p>}
        {rendered === 'metrics' && <p>Metrics — imagine charts that allocating huge buffers.</p>}
        {rendered === 'reports' && <p>Reports — printer spool vibes.</p>}
      </div>
    </ExampleLayout>
  )
}
