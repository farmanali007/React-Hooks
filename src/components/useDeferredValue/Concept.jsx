import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function Concept() {
  console.log('[useDeferredValue Concept] render')

  return (
    <ExampleLayout
      title="4. Mental model cheatsheet"
      level="advanced"
      analogy="A drone following you with a camera: you move now (urgent UI) while the cinematic shot eases into place (deferred snapshot)."
      whatToWatch={[
        'useDeferredValue copies props/state — good for derived expensive UI',
        'Values may repeat previous render — always render something coherent',
        'Not a cache — compare with memo/useMemo for referential equality needs',
      ]}
    >
      <ul className="state-debug" style={{ lineHeight: 1.7 }}>
        <li>
          <strong>Urgent lane:</strong> input value, hover highlights, animations tied to gestures.
        </li>
        <li>
          <strong>Deferred lane:</strong> charts, search hits across giant lists, markdown previews.
        </li>
        <li>
          <strong>Sibling hook:</strong> useTransition marks updates you start as low priority; deferred values lag behind automatically.
        </li>
      </ul>
      <RenderCounter label="Notes" color="#f368e0" />
    </ExampleLayout>
  )
}
