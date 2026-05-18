import { useOptimistic, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function applyLike(current, id) {
  return current.map((item) =>
    item.id === id
      ? { ...item, liked: true, status: 'pending' }
      : item,
  )
}

export default function Rollback() {
  const [server, setServer] = useState([
    { id: 'a', title: 'Design review', liked: false, status: 'idle' },
    { id: 'b', title: 'API sync', liked: false, status: 'idle' },
  ])
  const [ui, likeOptimistic] = useOptimistic(server, applyLike)
  const [error, setError] = useState(null)

  console.log('[useOptimistic Rollback] render')

  async function like(id) {
    setError(null)
    likeOptimistic(id)
    console.log('[useOptimistic Rollback] optimistic like', id)
    try {
      await new Promise((resolve, reject) => {
        window.setTimeout(() => {
          const fail = Math.random() < 0.45
          console.log('[useOptimistic Rollback] network', fail ? 'fail' : 'ok')
          if (fail) reject(new Error('rate limited'))
          else resolve()
        }, 500)
      })
      setServer((items) =>
        items.map((item) =>
          item.id === id ? { ...item, liked: true, status: 'confirmed' } : item,
        ),
      )
    } catch (e) {
      console.log('[useOptimistic Rollback] restoring server snapshot')
      setError(e instanceof Error ? e.message : 'unknown')
      setServer((items) => items.map((item) => ({ ...item, status: 'idle' })))
    }
  }

  return (
    <ExampleLayout
      title="3. Failure + rollback to truth"
      level="advanced"
      analogy="Venmo-like apps show the payment checked optimistically; if the bank declines, the UI snaps back and apologizes."
      whatToWatch={[
        'Random failures simulate flaky APIs',
        'On success statuses become confirmed',
        'On error we rebuild rows as idle — optimistic overlay disappears',
      ]}
    >
      {error && <p className="panel-hint">Error: {error}</p>}
      <RenderCounter label="Board" color="#00d2d3" />
      <ul>
        {ui.map((card) => (
          <li key={card.id} className="state-debug" style={{ marginBottom: 8 }}>
            <strong>{card.title}</strong> — liked: {String(card.liked)} · status: {card.status}
            <div className="controls">
              <button type="button" disabled={card.liked} onClick={() => like(card.id)}>
                Like (may fail)
              </button>
            </div>
          </li>
        ))}
      </ul>
    </ExampleLayout>
  )
}
