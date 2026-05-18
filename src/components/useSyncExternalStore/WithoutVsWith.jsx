import { useEffect, useState, useSyncExternalStore } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'
import { bumpSimpleCount, getSimpleCount, subscribeSimple } from './miniStore'

function PollingPanel() {
  const [count, setCount] = useState(() => getSimpleCount())

  useEffect(() => {
    const id = window.setInterval(() => {
      console.log('[useSyncExternalStore Cmp] poll tick')
      setCount(getSimpleCount())
    }, 500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div>
      <RenderCounter label="Polling" color="#e74c3c" />
      <p>Mirror via interval: {count}</p>
      <button type="button" onClick={bumpSimpleCount}>
        bump store
      </button>
    </div>
  )
}

function StorePanel() {
  const count = useSyncExternalStore(subscribeSimple, () => getSimpleCount(), () => 0)

  return (
    <div>
      <RenderCounter label="useSyncExternalStore" color="#27ae60" />
      <p>Live subscription: {count}</p>
      <button type="button" onClick={bumpSimpleCount}>
        bump store
      </button>
    </div>
  )
}

export default function WithoutVsWith() {
  console.log('[useSyncExternalStore Cmp] lesson render')

  return (
    <ExampleLayout
      title="4. Polling vs store hook"
      level="advanced"
      analogy="Checking your mailbox every five minutes vs getting a push notification — same data, very different battery story."
      whatToWatch={[
        'Both panels read the shared miniStore module',
        'Polling re-runs on an interval even if nothing changed',
        'Store version sleeps until emit() fires',
      ]}
    >
      <ComparisonLayout
        withoutTitle="setInterval mirror"
        withTitle="useSyncExternalStore"
        withoutHint="Wakes regularly — can drift out of sync briefly."
        withHint='Event-driven — calls render only on bumpSimpleCount().'
        withoutPanel={<PollingPanel />}
        withPanel={<StorePanel />}
      />
    </ExampleLayout>
  )
}
