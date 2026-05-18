import { useEffect, useRef, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function TimerRef() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const id = useRef(null)

  useEffect(() => {
    console.log('[useRef Timer] running toggled', running)
    if (!running) {
      if (id.current != null) {
        window.clearInterval(id.current)
        id.current = null
        console.log('[useRef Timer] cleared interval')
      }
      return undefined
    }
    id.current = window.setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => {
      if (id.current != null) window.clearInterval(id.current)
    }
  }, [running])

  return (
    <ExampleLayout
      title="5. Store timer id in a ref"
      level="intermediate"
      analogy="A kitchen egg timer: the dial hand (interval id) is not food temperature (state) — keep the handle in your pocket (ref) while the bell (seconds) is what diners hear."
      whatToWatch={[
        'Start / pause — effect cleans previous interval',
        'id.current avoids stale closures without extra renders',
        'Always clear on unmount to prevent ghost timers',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setRunning((r) => !r)}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button type="button" className="btn-secondary" onClick={() => { setSeconds(0); setRunning(false) }}>
          Reset
        </button>
      </div>
      <p className="state-debug">{seconds}s</p>
      <RenderCounter label="Timer" color="#ff6b6b" />
    </ExampleLayout>
  )
}
