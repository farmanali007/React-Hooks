import LearningLabShell from '../shared/LearningLabShell'
import UnstableCallback from './UnstableCallback'
import StableCallback from './StableCallback'
import MemoChild from './MemoChild'
import WrongUsage from './WrongUsage'
import EventHandler from './EventHandler'

const LESSONS = [
  { id: 'unstable', label: '1. Unstable callback', level: 'beginner', Component: UnstableCallback },
  { id: 'stable', label: '2. useCallback stable ref', level: 'intermediate', Component: StableCallback },
  { id: 'memo', label: '3. memo + child', level: 'intermediate', Component: MemoChild },
  { id: 'wrong', label: '4. When useCallback hurts', level: 'intermediate', Component: WrongUsage },
  { id: 'event', label: '5. Event handlers', level: 'beginner', Component: EventHandler },
]

export default function UseCallbackLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useCallback Course"
      intro="Open DevTools Console (F12). Memoize function identity so memoized children and effects do not thrash on every parent render."
      comparisonHint="Red = fresh function each render. Green = same reference while deps stable."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
