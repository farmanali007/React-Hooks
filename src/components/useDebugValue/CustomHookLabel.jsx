import { useDebugValue, useEffect, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function useOnline() {
  const [online, setOnline] = useState(() => navigator.onLine)
  useDebugValue(online ? 'Online' : 'Offline')

  useEffect(() => {
    function onUp() {
      console.log('[useDebugValue Label] browser online')
      setOnline(true)
    }
    function onDown() {
      console.log('[useDebugValue Label] browser offline')
      setOnline(false)
    }
    window.addEventListener('online', onUp)
    window.addEventListener('offline', onDown)
    return () => {
      window.removeEventListener('online', onUp)
      window.removeEventListener('offline', onDown)
    }
  }, [])

  return online
}

export default function CustomHookLabel() {
  const online = useOnline()
  console.log('[useDebugValue Label] demo render', online)

  return (
    <ExampleLayout
      title="1. Friendly hook label"
      level="advanced"
      analogy="Name tags at a meetup — the value is the same person; the tag helps friends find you in the crowd."
      whatToWatch={[
        'Install React DevTools → inspect this component → Hooks panel',
        'useOnline shows debug label Online/Offline next to the hook',
        'Try toggling OS network (airplane mode) to flip the label',
      ]}
    >
      <p className="state-debug">Navigator reports: <strong>{online ? 'online' : 'offline'}</strong></p>
      <RenderCounter label="Demo" color="#5f27cd" />
    </ExampleLayout>
  )
}
