import { useOptimistic, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function prepend(current, draft) {
  return [{ id: draft.id, body: draft.body, pending: true }, ...current]
}

export default function AddMessage() {
  const [confirmed, setConfirmed] = useState([])
  const [rows, addDraft] = useOptimistic(confirmed, prepend)
  const [text, setText] = useState('Ship the preview!')

  console.log('[useOptimistic Add] render rows', rows.length)

  async function post() {
    const id = crypto.randomUUID()
    const body = text.trim()
    if (!body) return
    addDraft({ id, body })
    console.log('[useOptimistic Add] optimistic enqueue', id)
    await new Promise((r) => setTimeout(r, 500))
    setConfirmed((prev) => [{ id, body, pending: false }, ...prev])
    setText('')
  }

  return (
    <ExampleLayout
      title="2. Composer with instant echo"
      level="advanced"
      analogy="Postal clerk stamping your receipt before the truck leaves — patrons feel heard instantly."
      whatToWatch={[
        'Optimistic rows prepend with pending: true',
        'After fake POST resolves, duplicates collapse into confirmed data',
        'Great pattern for comment threads and task cards',
      ]}
    >
      <div className="controls" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input value={text} onChange={(e) => setText(e.target.value)} style={{ flex: '1 1 220px' }} />
        <button type="button" onClick={post}>
          Post
        </button>
      </div>
      <RenderCounter label="Composer" color="#00d2d3" />
      <ul>
        {rows.map((row) => (
          <li key={row.id} className="state-debug">
            {row.body} {row.pending ? '· sending…' : ''}
          </li>
        ))}
      </ul>
    </ExampleLayout>
  )
}
