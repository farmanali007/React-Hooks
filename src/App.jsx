import { useState } from 'react'
import HookHub from './components/HookHub/HookHub'
import UseStateLearningLab from './components/useState/UseStateLearningLab'
import UseMemoLearningLab from './components/useMemo/UseMemoLearningLab'

/**
 * React Hooks Learning Platform
 * Hub → pick a hook → interactive lessons
 */
function App() {
  const [activeHook, setActiveHook] = useState(null)

  if (activeHook === 'useState') {
    return <UseStateLearningLab onBack={() => setActiveHook(null)} />
  }

  if (activeHook === 'useMemo') {
    return <UseMemoLearningLab onBack={() => setActiveHook(null)} />
  }

  return <HookHub onSelectHook={setActiveHook} />
}

export default App
