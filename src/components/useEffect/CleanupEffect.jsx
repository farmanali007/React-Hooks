import { useState, useEffect } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function WithoutCleanup({ running }) {
  const [ticks, setTicks] = useState(0)

  useEffect(() => {
    if (!running) return undefined
    console.log('[useEffect Cleanup] WITHOUT — interval started, no cleanup')
    setInterval(() => setTicks((t) => t + 1), 500)
  }, [running])

  return (
    <div>
      <RenderCounter label="No cleanup" color="#e74c3c" />
      <p>Timer ticks: {ticks} (intervals may stack)</p>
    </div>
  )
}

function WithCleanup({ running }) {
  const [ticks, setTicks] = useState(0)

  useEffect(() => {
    if (!running) return undefined
    console.log('[useEffect Cleanup] WITH — interval started')
    const id = setInterval(() => setTicks((t) => t + 1), 500)
    return () => {
      clearInterval(id)
      console.log('[useEffect Cleanup] WITH — cleanup cleared interval')
    }
  }, [running])

  return (
    <div>
      <RenderCounter label="With cleanup" color="#27ae60" />
      <p>Timer ticks: {ticks}</p>
    </div>
  )
}

export default function CleanupEffect() {
  const [running, setRunning] = useState(true)

  return (
    <ExampleLayout
      title="3. Cleanup Function"
      level="intermediate"
      analogy="Leaving a faucet running when you leave the room floods the house. Cleanup turns it off when the effect is torn down."
      whatToWatch={[
        'Stop timer — WITH panel stops ticking',
        'WITHOUT may keep multiple intervals running',
        'Console shows cleanup logs on the green side',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setRunning((r) => !r)}>
          {running ? 'Stop timer' : 'Start timer'}
        </button>
      </div>
      <ComparisonLayout
        withoutTitle="No cleanup"
        withTitle="return () => clearInterval"
        withoutPanel={<WithoutCleanup running={running} />}
        withPanel={<WithCleanup running={running} />}
      />
    </ExampleLayout>
  )
}
