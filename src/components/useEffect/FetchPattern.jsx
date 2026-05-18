import { useState, useEffect } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const MOCK_USERS = {
  1: { name: 'Alice', role: 'Admin' },
  2: { name: 'Bob', role: 'Editor' },
}

function fetchUser(id, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (signal?.aborted) {
        reject(new DOMException('Aborted', 'AbortError'))
        return
      }
      resolve(MOCK_USERS[id] ?? { name: 'Unknown', role: 'Guest' })
    }, 600)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

export default function FetchPattern() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    console.log('[useEffect Fetch] effect start for userId', userId)
    // eslint-disable-next-line react-hooks/set-state-in-effect -- teaching: fetch pattern
    setLoading(true)
    setError(null)

    fetchUser(userId, controller.signal)
      .then((data) => {
        if (cancelled) return
        console.log('[useEffect Fetch] data received', data)
        setUser(data)
      })
      .catch((err) => {
        if (cancelled || err.name === 'AbortError') {
          console.log('[useEffect Fetch] request aborted (stale)')
          return
        }
        setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
      controller.abort()
      console.log('[useEffect Fetch] cleanup — abort previous fetch')
    }
  }, [userId])

  return (
    <ExampleLayout
      title="4. Fetch Pattern"
      level="intermediate"
      analogy="Ordering food then changing your mind — you cancel the old order (abort) so two meals don't arrive for one person."
      whatToWatch={[
        'Switch user quickly — console shows abort for stale requests',
        'Only the latest userId should win',
        'Loading state flashes between switches',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setUserId(1)}>User 1</button>
        <button type="button" onClick={() => setUserId(2)}>User 2</button>
        <RenderCounter label="Fetch demo" color="#4ecdc4" />
      </div>
      <div className="panel panel-good">
        {loading && <p>Loading…</p>}
        {error && <p className="state-debug">Error: {error}</p>}
        {user && !loading && (
          <p>
            <strong>{user.name}</strong> — {user.role}
          </p>
        )}
      </div>
    </ExampleLayout>
  )
}
