import LearningLabShell from '../shared/LearningLabShell'
import DomRef from './DomRef'
import MutableRef from './MutableRef'
import RefVsState from './RefVsState'
import PreviousValue from './PreviousValue'
import TimerRef from './TimerRef'

const LESSONS = [
  { id: 'dom', label: '1. DOM ref', level: 'beginner', Component: DomRef },
  { id: 'mut', label: '2. Mutable box', level: 'beginner', Component: MutableRef },
  { id: 'vs', label: '3. Ref vs state', level: 'intermediate', Component: RefVsState },
  { id: 'prev', label: '4. Previous value', level: 'intermediate', Component: PreviousValue },
  { id: 'timer', label: '5. Timer handle', level: 'intermediate', Component: TimerRef },
]

export default function UseRefLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useRef Course"
      intro="Open DevTools Console (F12). useRef is a pocket that survives re-renders — perfect for DOM nodes or values that should not trigger paint."
      comparisonHint="Red = accidental re-render loops. Green = ref holds mutable data quietly."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
