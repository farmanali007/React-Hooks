import { useState, useEffect } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function MultipleEffects() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('React')

  useEffect(() => {
    console.log('[useEffect Multiple] Effect 1 — document title, count =', count)
    document.title = `Count: ${count}`
  }, [count])

  useEffect(() => {
    console.log('[useEffect Multiple] Effect 2 — localStorage name:', name)
    try {
      localStorage.setItem('demo-name', name)
    } catch {
      /* ignore in restricted environments */
    }
  }, [name])

  useEffect(() => {
    console.log('[useEffect Multiple] Effect 3 — mount only (subscription sim)')
    return () => console.log('[useEffect Multiple] Effect 3 — unmount cleanup')
  }, [])

  return (
    <ExampleLayout
      title="6. Multiple Effects"
      level="intermediate"
      analogy="One kitchen timer for the oven and another for the pasta — split effects by concern instead of one giant timer."
      whatToWatch={[
        'Change count — only Effect 1 logs',
        'Change name — only Effect 2 logs',
        'Each effect has its own dependency array',
        'Mount effect logs once on load',
      ]}
    >
      <RenderCounter label="Parent" color="#4ecdc4" />
      <div className="controls">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          Count: {count}
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          aria-label="Name"
        />
      </div>
      <p className="state-debug">
        Tab title tracks count. localStorage key &quot;demo-name&quot; tracks name.
      </p>
    </ExampleLayout>
  )
}
