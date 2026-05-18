import LearningLabShell from '../shared/LearningLabShell'
import BasicAction from './BasicAction'
import PendingState from './PendingState'
import ErrorState from './ErrorState'
import FormAction from './FormAction'

const LESSONS = [
  { id: 'basic', label: '1. Basic action', level: 'advanced', Component: BasicAction },
  { id: 'pending', label: '2. Pending flag', level: 'advanced', Component: PendingState },
  { id: 'error', label: '3. Error shapes', level: 'advanced', Component: ErrorState },
  { id: 'form', label: '4. Progressive form', level: 'advanced', Component: FormAction },
]

export default function UseActionStateLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useActionState Course"
      intro="Open DevTools Console (F12). React 19’s useActionState wires async form actions with built-in pending + state updates."
      comparisonHint="Prefer declarative forms over manual formData plumbing in effects."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
