import LearningLabShell from '../shared/LearningLabShell'
import BasicReducer from './BasicReducer'
import VsUseState from './VsUseState'
import ActionPayload from './ActionPayload'
import TodoReducer from './TodoReducer'
import FormReducer from './FormReducer'

const LESSONS = [
  { id: 'basic', label: '1. Basic reducer', level: 'beginner', Component: BasicReducer },
  { id: 'vs', label: '2. vs many useStates', level: 'intermediate', Component: VsUseState },
  { id: 'payload', label: '3. Action payloads', level: 'intermediate', Component: ActionPayload },
  { id: 'todo', label: '4. Todo list', level: 'intermediate', Component: TodoReducer },
  { id: 'form', label: '5. Form wizard', level: 'intermediate', Component: FormReducer },
]

export default function UseReducerLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useReducer Course"
      intro="Open DevTools Console (F12). Replace spaghetti state updates with a single dispatch and a predictable reducer."
      comparisonHint="Red = scattered setState. Green = dispatch({ type, ... })."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
