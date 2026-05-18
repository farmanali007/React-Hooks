import LearningLabShell from '../shared/LearningLabShell'
import SlowFilter from './SlowFilter'
import VsNoDefer from './VsNoDefer'
import TypingSmooth from './TypingSmooth'
import Concept from './Concept'

const LESSONS = [
  { id: 'slow', label: '1. Slow filter', level: 'advanced', Component: SlowFilter },
  { id: 'vs', label: '2. vs immediate', level: 'advanced', Component: VsNoDefer },
  { id: 'type', label: '3. Smooth typing', level: 'advanced', Component: TypingSmooth },
  { id: 'concept', label: '4. Mental model', level: 'advanced', Component: Concept },
]

export default function UseDeferredValueLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useDeferredValue Course"
      intro="Open DevTools Console (F12). Let urgent typing updates jump ahead while expensive derived UI catches up with a deferred snapshot."
      comparisonHint="Deferred value can lag one frame — UI stays responsive."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
