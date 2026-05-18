import { useOptimistic, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function appendPending(current, pending) {
  return [...current, { id: pending.id, text: pending.text, status: 'sending' }]
}

export default function OptimisticList() {
  const [server, setServer] = useState([
    { id: '1', text: 'Hello team', status: 'sent' },
  ])
  const [optimistic, addOptimistic] = useOptimistic(server, appendPending)

  console.log('[useOptimistic List] render', { serverLen: server.length, optimisticLen: optimistic.length })

  async function send(text) {
    const id = crypto.randomUUID()
    addOptimistic({ id, text })
    console.log('[useOptimistic List] fake network start', id)
    await new Promise((r) => setTimeout(r, 700))
    setServer((prev) => [...prev, { id, text, status: 'sent' }])
    console.log('[useOptimistic List] fake network done', id)
  }

  return (
    <ExampleLayout
      title="1. Optimistic timeline"
      level="advanced"
      analogy="Group chat on flaky Wi-Fi: your bubble appears in light gray until the checkmark arrives."
      whatToWatch={[
        'New rows show sending state immediately',
        'After timeout, server list replaces optimistic overlay',
        'Try rapid clicks — ids stay unique thanks to crypto.randomUUID',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => send(`note ${Date.now() % 1000}`)}>
          Send optimistic row
        </button>
      </div>
      <RenderCounter label="Inbox" color="#00d2d3" />
      <ul className="state-debug">
        {optimistic.map((m) => (
          <li key={m.id}>
            {m.text} · <em>{m.status}</em>
          </li>
        ))}
      </ul>
    </ExampleLayout>
  )
}
