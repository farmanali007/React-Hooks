import LearningLabShell from '../shared/LearningLabShell'
import ForwardRefBase from './ForwardRefBase'
import ExposeFocus from './ExposeFocus'
import ParentControl from './ParentControl'
import WithoutVsWith from './WithoutVsWith'

const LESSONS = [
  { id: 'forward', label: '1. forwardRef base', level: 'advanced', Component: ForwardRefBase },
  { id: 'focus', label: '2. Expose focus()', level: 'advanced', Component: ExposeFocus },
  { id: 'parent', label: '3. Parent control', level: 'advanced', Component: ParentControl },
  { id: 'cmp', label: '4. Without vs with', level: 'advanced', Component: WithoutVsWith },
]

export default function UseImperativeHandleLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useImperativeHandle Course"
      intro="Open DevTools Console (F12). Customize the instance value parent receives when it passes a ref — expose a tidy API instead of the whole DOM node."
      comparisonHint="Imperative bursts are powerful; prefer declarative props when you can."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
