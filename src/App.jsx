import { useState } from 'react'
import HookHub from './components/HookHub/HookHub'
import { HOOK_LABS } from './hooks/hookLabs'

function App() {
  const [activeHook, setActiveHook] = useState(null)
  const Lab = activeHook ? HOOK_LABS[activeHook] : null

  if (Lab) {
    return <Lab onBack={() => setActiveHook(null)} />
  }

  return <HookHub onSelectHook={setActiveHook} />
}

export default App
