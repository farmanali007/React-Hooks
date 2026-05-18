import LearningLabShell from '../shared/LearningLabShell'
import OptimisticList from './OptimisticList'
import AddMessage from './AddMessage'
import Rollback from './Rollback'
import Concept from './Concept'

const LESSONS = [
  { id: 'list', label: '1. Optimistic list', level: 'advanced', Component: OptimisticList },
  { id: 'add', label: '2. Add message', level: 'advanced', Component: AddMessage },
  { id: 'rollback', label: '3. Rollback', level: 'advanced', Component: Rollback },
  { id: 'concept', label: '4. Concept', level: 'advanced', Component: Concept },
]

export default function UseOptimisticLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useOptimistic Course"
      intro="Open DevTools Console (F12). React 19 lets UI leap ahead of servers, then reconcile when network truth arrives."
      comparisonHint="Great for chat + kanban — still show honest errors on failure."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
