import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function WhenToUse() {
  console.log('[useLayoutEffect When] render')

  return (
    <ExampleLayout
      title="4. When should you reach for useLayoutEffect?"
      level="advanced"
      analogy="Emergency brake vs cruise control: layout effect is the brake — powerful, blocks traffic if you hold it down."
      whatToWatch={[
        'Need DOM measurements to position UI? useLayoutEffect (or useResizeObserver).',
        'Animations purely in CSS or off main thread? skip React layout effects.',
        'Data fetching or subscriptions? useEffect (default).',
        'Suspecting jank? profile — do not sprinkle layout effects &quot;just in case&quot;.',
      ]}
    >
      <ul className="state-debug" style={{ lineHeight: 1.6 }}>
        <li>
          <strong>Yes:</strong> synchronizing scroll position, anchoring tooltips, reading element size to flip placement.
        </li>
        <li>
          <strong>No:</strong> logging, analytics, network calls — they belong in useEffect.
        </li>
        <li>
          <strong>Caution:</strong> long tasks inside useLayoutEffect delay paint — keep them lean.
        </li>
      </ul>
      <RenderCounter label="Guide" color="#45b7d1" />
    </ExampleLayout>
  )
}
