import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function Concept() {
  console.log('[useOptimistic Concept] render')

  return (
    <ExampleLayout
      title="4. When optimism helps — and when it hurts"
      level="advanced"
      analogy="Serving draft beer while the card payment clears: great at a concert, awful at a contract signing ceremony."
      whatToWatch={[
        'Great: social feeds, checklist toggles, react-before-server acks',
        'Risky: financial transfers without clear undo + audit trail',
        'Always pair with error UI — silent rollback confuses power users',
      ]}
    >
      <ul className="state-debug" style={{ lineHeight: 1.7 }}>
        <li>
          <strong>Data truth still lives</strong> in server state / React Query / normalized stores.
        </li>
        <li>
          <strong>useOptimistic</strong> is a thin UX shimmer layered atop committed state.
        </li>
        <li>
          <strong>Concurrency:</strong> React reconciles optimistic trees safely with transitions and Suspense siblings.
        </li>
      </ul>
      <RenderCounter label="Field notes" color="#00d2d3" />
    </ExampleLayout>
  )
}
