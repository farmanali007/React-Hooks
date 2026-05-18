import { memo, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const MemoChild = memo(function MemoChild({ onPing }) {
  console.log('[useCallback Unstable] MemoChild render')
  return (
    <div>
      <RenderCounter label="Memo child" color="#e74c3c" />
      <button type="button" onClick={onPing}>
        Ping
      </button>
    </div>
  )
})

function PlainChild({ onPing }) {
  console.log('[useCallback Unstable] PlainChild render')
  return (
    <div>
      <RenderCounter label="Plain child" color="#f39c12" />
      <button type="button" onClick={onPing}>
        Ping
      </button>
    </div>
  )
}

function Panel({ kind }) {
  const [ticks, setTicks] = useState(0)
  const onPing = () => console.log('[useCallback Unstable] ping from', kind)

  console.log('[useCallback Unstable] Panel render:', kind)

  return (
    <div>
      <RenderCounter label="Parent" color="#3498db" />
      <div className="controls">
        <button type="button" onClick={() => setTicks((t) => t + 1)}>
          Bump parent ({ticks})
        </button>
      </div>
      {kind === 'memo' ? (
        <MemoChild onPing={onPing} />
      ) : (
        <PlainChild onPing={onPing} />
      )}
    </div>
  )
}

export default function UnstableCallback() {
  return (
    <ExampleLayout
      title="1. New function props each render"
      level="beginner"
      analogy="A secret handshake that changes every time you blink — even your best friend must re-learn it, so React re-introduces components."
      whatToWatch={[
        'Memo child still re-renders when parent bumps — new onPing identity every time',
        'Plain child always re-renders anyway — wrapping with memo would be step one',
        'Open Lesson 2 to freeze onPing with useCallback',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Plain child (expected re-renders)"
        withTitle="memo(Child) + inline callback"
        withoutHint="No memo — parent updates cascade visually as expected."
        withHint="memo cannot help: onPing reference is never equal to previous."
        withoutPanel={<Panel kind="plain" />}
        withPanel={<Panel kind="memo" />}
      />
    </ExampleLayout>
  )
}
