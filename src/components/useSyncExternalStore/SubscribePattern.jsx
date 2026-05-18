import { useState, useSyncExternalStore } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function createLightStore(initial) {
  let value = initial
  const subs = new Set()
  return {
    get: () => value,
    set(next) {
      value = next
      console.log('[useSyncExternalStore Pattern] set →', value)
      subs.forEach((cb) => cb())
    },
    sub(cb) {
      subs.add(cb)
      return () => subs.delete(cb)
    },
  }
}

const temperature = createLightStore(72)

export default function SubscribePattern() {
  const reading = useSyncExternalStore(
    temperature.sub,
    temperature.get,
    () => 72,
  )

  const [localDial, setLocalDial] = useState(reading)

  console.log('[useSyncExternalStore Pattern] render', reading)

  return (
    <ExampleLayout
      title="2. Anatomy: subscribe + snapshot"
      level="advanced"
      analogy="Thermostat wiring: subscribe hooks the relay, snapshot reads the mercury, server snapshot ships default factory settings."
      whatToWatch={[
        'set(...) notifies every hook subscriber',
        'Snapshot must be fast — no heavy I/O',
        'Immutability optional — store returns primitives here for clarity',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => temperature.set(reading + 1)}>
          Warm +1 → {reading}°
        </button>
        <button type="button" className="btn-secondary" onClick={() => temperature.set(reading - 1)}>
          Cool −1
        </button>
        <label style={{ marginLeft: '0.5rem' }}>
          local dial (state)
          <input
            type="number"
            value={localDial}
            onChange={(e) => setLocalDial(Number(e.target.value))}
            style={{ width: 80, marginLeft: 6 }}
          />
        </label>
      </div>
      <p className="state-debug">
        External temp store: <strong>{reading}°</strong> · Local unrelated dial: <strong>{localDial}</strong>
      </p>
      <RenderCounter label="Room" color="#222f3e" />
    </ExampleLayout>
  )
}
