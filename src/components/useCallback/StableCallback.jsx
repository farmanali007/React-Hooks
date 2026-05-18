import { memo, useCallback, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const Child = memo(function Child({ onPing }) {
  console.log('[useCallback Stable] Child render')
  return (
    <div>
      <RenderCounter label="Child" color="#27ae60" />
      <button type="button" onClick={onPing}>
        Ping
      </button>
    </div>
  )
})

function WithoutCb() {
  const [ticks, setTicks] = useState(0)
  const [theme, setTheme] = useState('light')
  const onPing = () => console.log('[useCallback Stable] ping without useCallback')

  console.log('[useCallback Stable] WithoutCb parent render')

  return (
    <div>
      <RenderCounter label="Parent" color="#e74c3c" />
      <div className="controls">
        <button type="button" onClick={() => setTicks((t) => t + 1)}>
          Bump ({ticks})
        </button>
        <button type="button" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          Theme {theme}
        </button>
      </div>
      <Child onPing={onPing} />
    </div>
  )
}

function WithCb() {
  const [ticks, setTicks] = useState(0)
  const [theme, setTheme] = useState('light')
  const onPing = useCallback(() => {
    console.log('[useCallback Stable] ping with useCallback')
  }, [])

  console.log('[useCallback Stable] WithCb parent render')

  return (
    <div>
      <RenderCounter label="Parent" color="#27ae60" />
      <div className="controls">
        <button type="button" onClick={() => setTicks((t) => t + 1)}>
          Bump ({ticks})
        </button>
        <button type="button" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          Theme {theme}
        </button>
      </div>
      <Child onPing={onPing} />
    </div>
  )
}

export default function StableCallback() {
  return (
    <ExampleLayout
      title="2. Freeze the callback with useCallback"
      level="intermediate"
      analogy="A library card barcode that never changes — the scanner trusts you even when you swap jackets (parent re-renders)."
      whatToWatch={[
        'Bump counter on the right — Child render count stays flat',
        'Left side: same interaction — Child re-renders every parent tick',
        'Empty deps [] because onPing does not close over changing values',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Inline function each render"
        withTitle="useCallback([], ...)"
        withoutHint="memo(Child) still busts on new prop identity."
        withHint="Stable onPing keeps memo child quiet for unrelated parent updates."
        withoutPanel={<WithoutCb />}
        withPanel={<WithCb />}
      />
    </ExampleLayout>
  )
}
