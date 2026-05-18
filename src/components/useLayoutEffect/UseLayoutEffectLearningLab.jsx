import LearningLabShell from '../shared/LearningLabShell'
import VsUseEffect from './VsUseEffect'
import MeasureDom from './MeasureDom'
import FlickerFix from './FlickerFix'
import WhenToUse from './WhenToUse'

const LESSONS = [
  { id: 'vs', label: '1. vs useEffect timing', level: 'advanced', Component: VsUseEffect },
  { id: 'measure', label: '2. Measure DOM', level: 'advanced', Component: MeasureDom },
  { id: 'flicker', label: '3. Flicker fix', level: 'advanced', Component: FlickerFix },
  { id: 'when', label: '4. When to use', level: 'advanced', Component: WhenToUse },
]

export default function UseLayoutEffectLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useLayoutEffect Course"
      intro="Open DevTools Console (F12). useLayoutEffect fires after DOM updates but before the browser paints — perfect for measuring layout or preventing visual jitter."
      comparisonHint="Red = user sees intermediate frames. Green = layout corrected pre-paint."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
