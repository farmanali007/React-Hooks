import LearningLabShell from '../shared/LearningLabShell'
import FormLabels from './FormLabels'
import MultipleIds from './MultipleIds'
import SsrSafe from './SsrSafe'

const LESSONS = [
  { id: 'form', label: '1. Labels & inputs', level: 'beginner', Component: FormLabels },
  { id: 'multi', label: '2. Multiple ids', level: 'beginner', Component: MultipleIds },
  { id: 'ssr', label: '3. SSR safety', level: 'intermediate', Component: SsrSafe },
]

export default function UseIdLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useId Course"
      intro="Open DevTools Console (F12). useId generates stable unique strings for accessibility wiring and aria attributes."
      comparisonHint="Ids are not keys for lists — still derive keys from your data."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
