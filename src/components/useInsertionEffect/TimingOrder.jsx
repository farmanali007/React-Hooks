import { useCallback, useEffect, useInsertionEffect, useLayoutEffect, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function TimingOrder() {
  const [log, setLog] = useState([])
  const [mountKey, setMountKey] = useState(0)

  const append = useCallback((line) => {
    console.log('[useInsertionEffect Order]', line)
    setLog((l) => [...l.slice(-12), `${performance.now().toFixed(1)}ms — ${line}`])
  }, [])

  return (
    <ExampleLayout
      title="2. Hook firing order (mount)"
      level="advanced"
      analogy="Sound check order at a concert: tuners (insertion) before stagehands measure distances (layout) before the crowd films (paint/effects)."
      whatToWatch={[
        'Insertion → Layout → Passive effect on mount',
        'Unmount the tracer — cleanup order reverses',
        'Console mirrors the on-screen list',
      ]}
    >
      <div className="controls">
        <button
          type="button"
          onClick={() => {
            setLog([])
            setMountKey((k) => k + 1)
          }}
        >
          Reset log &amp; remount tracer
        </button>
      </div>
      <OrderTracer key={mountKey} append={append} />
      <ol style={{ fontSize: '0.85rem', marginTop: '0.75rem' }}>
        {log.map((line, i) => (
          <li key={`${line}-${i}`}>{line}</li>
        ))}
      </ol>
      <RenderCounter label="Timing shell" color="#96ceb4" />
    </ExampleLayout>
  )
}

function OrderTracer({ append }) {
  useInsertionEffect(() => {
    append('useInsertionEffect (first)')
    return () => append('cleanup useInsertionEffect')
  }, [append])

  useLayoutEffect(() => {
    append('useLayoutEffect')
    return () => append('cleanup useLayoutEffect')
  }, [append])

  useEffect(() => {
    append('useEffect (passive)')
    return () => append('cleanup useEffect')
  }, [append])

  return <p className="state-debug">Tracer mounted (child subtree)</p>
}
