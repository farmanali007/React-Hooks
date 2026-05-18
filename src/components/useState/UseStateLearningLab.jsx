import LearningLabShell from '../shared/LearningLabShell'
import BasicCounter from './BasicCounter'
import ControlledInput from './ControlledInput'
import ObjectState from './ObjectState'
import ArrayState from './ArrayState'
import FunctionalUpdate from './FunctionalUpdate'
import ToggleAndDerived from './ToggleAndDerived'
import FormExample from './FormExample'

const LESSONS = [
  { id: 'basic', label: '1. What is useState?', level: 'beginner', Component: BasicCounter },
  { id: 'controlled', label: '2. Controlled Input', level: 'beginner', Component: ControlledInput },
  { id: 'object', label: '3. Object State', level: 'intermediate', Component: ObjectState },
  { id: 'array', label: '4. Array State', level: 'intermediate', Component: ArrayState },
  { id: 'functional', label: '5. Functional Updates', level: 'intermediate', Component: FunctionalUpdate },
  { id: 'toggle', label: '6. Toggle & Derived', level: 'beginner', Component: ToggleAndDerived },
  { id: 'form', label: '7. Form State', level: 'intermediate', Component: FormExample },
]

export default function UseStateLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useState Course"
      intro="Open DevTools Console (F12). Each lesson compares a broken or limited pattern with the correct useState approach."
      comparisonHint="Red = problem pattern. Green = useState solution."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
