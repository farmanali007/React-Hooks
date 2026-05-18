import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const CORPUS = Array.from({ length: 2000 }, (_, i) => `note #${i} about deferred rendering`)

function heavyContains(needle) {
  let burn = 0
  for (let i = 0; i < 700_000; i++) {
    burn += i % 3
  }
  const q = needle.trim().toLowerCase()
  console.log('[useDeferredValue Type] scan', { burn: burn % 2, q })
  if (!q) return CORPUS.slice(0, 20)
  return CORPUS.filter((line) => line.toLowerCase().includes(q)).slice(0, 20)
}

export default function TypingSmooth() {
  const [text, setText] = useState('deferred')
  const deferred = useDeferredValue(text)
  const hits = useMemo(() => heavyContains(deferred), [deferred])

  const lastLen = useRef(text.length)
  useEffect(() => {
    const delta = Math.abs(text.length - lastLen.current)
    if (delta > 0) {
      console.log('[useDeferredValue Type] keystroke delta', delta)
    }
    lastLen.current = text.length
  }, [text])

  return (
    <ExampleLayout
      title="3. Keep keystrokes urgent"
      level="advanced"
      analogy="Podcast host listens live (urgent audio) while the expensive real-time transcription lags a breath — listeners never feel muted."
      whatToWatch={[
        'Watch console: typing logs happen before heavy scan logs',
        'Textarea uses immediate state; derived hits use deferred text',
        'Pair with startTransition for dispatching non-urgent state (next course!)',
      ]}
    >
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', maxWidth: 520 }}
      />
      <p className="state-debug">
        Immediate: {text} · Deferred snapshot: {deferred}
      </p>
      <RenderCounter label="Composer" color="#f368e0" />
      <ul style={{ fontSize: '0.85rem' }}>
        {hits.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </ExampleLayout>
  )
}
