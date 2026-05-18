import { useSyncExternalStore } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'
import { bumpSimpleCount, getSimpleCount, subscribeSimple } from './miniStore'

export default function SimpleStore() {
  const value = useSyncExternalStore(
    subscribeSimple,
    () => getSimpleCount(),
    () => 0,
  )

  console.log('[useSyncExternalStore Simple] render value', value)

  return (
    <ExampleLayout
      title="1. Module-level counter store"
      level="advanced"
      analogy="Shared bulletin board outside a co-working space — React peers through the window (snapshot), while events (subscribe) tap you when someone flips a number."
      whatToWatch={[
        'Bump pushes updates through listeners',
        'Third arg returns server snapshot (0) for SSR safety',
        'Try importing this store elsewhere — single source of truth',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={bumpSimpleCount}>
          bump external store ({value})
        </button>
      </div>
      <RenderCounter label="Subscriber" color="#222f3e" />
    </ExampleLayout>
  )
}
