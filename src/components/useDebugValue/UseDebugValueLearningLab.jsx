import LearningLabShell from '../shared/LearningLabShell'
import CustomHookLabel from './CustomHookLabel'
import FormatFn from './FormatFn'
import DevToolsTip from './DevToolsTip'

const LESSONS = [
  { id: 'label', label: '1. Label custom hook', level: 'advanced', Component: CustomHookLabel },
  { id: 'format', label: '2. format functions', level: 'advanced', Component: FormatFn },
  { id: 'tip', label: '3. DevTools tips', level: 'advanced', Component: DevToolsTip },
]

export default function UseDebugValueLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useDebugValue Course"
      intro="Open React DevTools → Components. useDebugValue labels your custom hooks so inspectors read like plain English."
      comparisonHint="No runtime UI impact — developer ergonomics only."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
