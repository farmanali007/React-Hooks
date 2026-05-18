import { useSyncExternalStore } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function subscribeOnline(cb) {
  window.addEventListener('online', cb)
  window.addEventListener('offline', cb)
  console.log('[useSyncExternalStore Online] subscribe')
  return () => {
    window.removeEventListener('online', cb)
    window.removeEventListener('offline', cb)
    console.log('[useSyncExternalStore Online] cleanup listeners')
  }
}

function snapshotOnline() {
  return navigator.onLine
}

function serverSnapshotOnline() {
  return true
}

export default function OnlineStatus() {
  const online = useSyncExternalStore(subscribeOnline, snapshotOnline, serverSnapshotOnline)
  console.log('[useSyncExternalStore Online] render', online)

  return (
    <ExampleLayout
      title="3. Browser API bridge"
      level="advanced"
      analogy="Airplane mode switch lights up rows of latch indicators — React just mirrors what the OS already tracks."
      whatToWatch={[
        'Toggle OS network — UI updates without polling',
       'getServerSnapshot assumes online for SSR (tweak per product)',
        'Pattern works for matchMedia, document.visibilityState, etc.',
      ]}
    >
      <p className="state-debug">Navigator onLine: <strong>{String(online)}</strong></p>
      <RenderCounter label="Status bar" color="#222f3e" />
    </ExampleLayout>
  )
}
