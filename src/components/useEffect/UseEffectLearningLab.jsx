import LearningLabShell from '../shared/LearningLabShell'
import BasicEffect from './BasicEffect'
import DependencyArray from './DependencyArray'
import CleanupEffect from './CleanupEffect'
import FetchPattern from './FetchPattern'
import WrongDeps from './WrongDeps'
import MultipleEffects from './MultipleEffects'

const LESSONS = [
  { id: 'basic', label: '1. What is useEffect?', level: 'beginner', Component: BasicEffect },
  { id: 'deps', label: '2. Dependency Array', level: 'beginner', Component: DependencyArray },
  { id: 'cleanup', label: '3. Cleanup', level: 'intermediate', Component: CleanupEffect },
  { id: 'fetch', label: '4. Fetch Pattern', level: 'intermediate', Component: FetchPattern },
  { id: 'wrong', label: '5. Wrong Deps', level: 'intermediate', Component: WrongDeps },
  { id: 'multiple', label: '6. Multiple Effects', level: 'intermediate', Component: MultipleEffects },
]

export default function UseEffectLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useEffect Course"
      intro="Open DevTools Console (F12). Learn when and how to run side effects after render — not during render."
      comparisonHint="Red = side effect in render or missing cleanup. Green = correct useEffect pattern."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
