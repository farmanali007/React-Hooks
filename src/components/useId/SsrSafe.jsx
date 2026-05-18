import { useId } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function SsrSafe() {
  const hydrationId = useId()
  console.log('[useId SSR] generated', hydrationId)

  return (
    <ExampleLayout
      title="3. Why useId beats Math.random"
      level="intermediate"
      analogy="Passport numbers issued by your country — sequenced so customs on both sides of the flight agree it is the same traveler after landing (hydration)."
      whatToWatch={[
        'Server + client renders must agree — useId coordinates both worlds',
        'Math.random() or Date.now() breaks hydration parity',
        'Still call useId only in render — do not stash in module scope',
      ]}
    >
      <p className="state-debug">
        Sample id: <code>{hydrationId}</code>
      </p>
      <RenderCounter label="SSR notes" color="#10ac84" />
      <p className="panel-hint">
        This Vite bundle is client-rendered, but the same component tree would stream from a server without id mismatches.
      </p>
    </ExampleLayout>
  )
}
