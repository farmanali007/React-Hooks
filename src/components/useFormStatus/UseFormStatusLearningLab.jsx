import LearningLabShell from '../shared/LearningLabShell'
import SubmitButton from './SubmitButton'
import PendingLabel from './PendingLabel'
import NestedForm from './NestedForm'

const LESSONS = [
  { id: 'submit', label: '1. Submit button', level: 'intermediate', Component: SubmitButton },
  { id: 'label', label: '2. Pending label', level: 'intermediate', Component: PendingLabel },
  { id: 'nested', label: '3. Nested subtree', level: 'intermediate', Component: NestedForm },
]

export default function UseFormStatusLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useFormStatus Course"
      intro="Open DevTools Console (F12). import { useFormStatus } from 'react-dom' to read the parent form’s pending state from deep children."
      comparisonHint="Only works under a submitting <form> — not arbitrary fetchers."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
