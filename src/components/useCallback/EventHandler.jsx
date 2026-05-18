import { useCallback, useEffect, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function HotkeyPanel({ onTick, mode }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 't') {
        console.log(`[useCallback Event] key "t" → ${mode}`)
        onTick()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onTick, mode])

  return (
    <div>
      <RenderCounter label={`${mode} hotkey`} color={mode === 'stable' ? '#27ae60' : '#e74c3c'} />
      <p className="state-debug">Press <kbd>t</kbd> after focusing the page — watch console for re-subscribe noise.</p>
    </div>
  )
}

export default function EventHandler() {
  const [stableCount, setStableCount] = useState(0)
  const [volatileCount, setVolatileCount] = useState(0)
  const [parentBump, setParentBump] = useState(0)

  const stableTick = useCallback(() => {
    setStableCount((c) => c + 1)
  }, [])

  const volatileTick = () => {
    setVolatileCount((c) => c + 1)
  }

  console.log('[useCallback Event] parent render', parentBump)

  return (
    <ExampleLayout
      title="5. Stable handler for subscriptions"
      level="beginner"
      analogy="Hotel keycards: a stable callback is the same RFID chip for your stay — the reader does not reprogram the lock every time you pass the lobby plant."
      whatToWatch={[
        'Click &quot;Re-render parent&quot; — unstable side tears down/adds listeners each time',
        'Stable side keeps the same onTick identity — effect stays quiet',
        'Press t to increment counters via window listener',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setParentBump((b) => b + 1)}>
          Re-render parent ({parentBump})
        </button>
      </div>
      <ComparisonLayout
        withoutTitle="Volatile handler in effect deps"
        withTitle="useCallback stabilizes onTick"
        withoutHint="onTick recreated → keydown listener re-attached every parent render."
        withHint="Empty deps [] → handler identity stable → listener mounts once."
        withoutPanel={
          <div>
            <p>Volatile count: {volatileCount}</p>
            <HotkeyPanel onTick={volatileTick} mode="volatile" />
          </div>
        }
        withPanel={
          <div>
            <p>Stable count: {stableCount}</p>
            <HotkeyPanel onTick={stableTick} mode="stable" />
          </div>
        }
      />
    </ExampleLayout>
  )
}
