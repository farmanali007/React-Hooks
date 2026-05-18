import { startTransition, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const LOT = Array.from({ length: 4000 }, (_, i) => `row-${i}`)

function burnCpu() {
  let x = 0
  for (let i = 0; i < 1_400_000; i++) {
    x += i % 3
  }
  console.log('[useTransition Start] burn done', x % 5)
}

export default function StartTransition() {
  const [needle, setNeedle] = useState('row-2')
  const [lazyNeedle, setLazyNeedle] = useState('row-2')

  const filtered = lazyNeedle.trim() === '' ? LOT.slice(0, 30) : LOT.filter((r) => r.includes(lazyNeedle)).slice(0, 30)

  burnCpu() // simulate expensive render step

  return (
    <ExampleLayout
      title="1. Wrap sluggish updates"
      level="advanced"
      analogy="Air-traffic control: arrivals circle (transition) while takeoffs (urgent input) still roll on the runway."
      whatToWatch={[
        'Typing first field updates slow list inside startTransition',
        'Console shows burn log — compare perceived input lag with raw setState',
        'Second field updates outside transition for contrast experiments',
      ]}
    >
      <div className="controls">
        <label>
          Urgent field
          <input
            value={needle}
            onChange={(e) => {
              const v = e.target.value
              setNeedle(v)
              startTransition(() => {
                console.log('[useTransition Start] transition apply', v)
                setLazyNeedle(v)
              })
            }}
          />
        </label>
      </div>
      <p className="state-debug">
        Needle: {needle} · Transition needle: {lazyNeedle}
      </p>
      <RenderCounter label="List host" color="#ff9f43" />
      <ul style={{ fontSize: '0.8rem', maxHeight: 200, overflow: 'auto' }}>
        {filtered.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </ExampleLayout>
  )
}
