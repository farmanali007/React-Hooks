import LearningLabShell from '../shared/LearningLabShell'
import BasicExample from './BasicExample'
import ExpensiveCalculation from './ExpensiveCalculation'
import FilterList from './FilterList'
import SortingExample from './SortingExample'
import SearchOptimization from './SearchOptimization'
import ParentChildExample from './ParentChildExample'
import MemoComparison from './MemoComparison'
import WrongUsage from './WrongUsage'
import CorrectUsage from './CorrectUsage'
import DerivedState from './DerivedState'
import DashboardExample from './DashboardExample'

const LESSONS = [
  { id: 'basic', label: '1. Basic', level: 'beginner', Component: BasicExample },
  { id: 'expensive', label: '2. Expensive Calc', level: 'beginner', Component: ExpensiveCalculation },
  { id: 'filter', label: '3. Filter List', level: 'intermediate', Component: FilterList },
  { id: 'sort', label: '4. Sorting', level: 'intermediate', Component: SortingExample },
  { id: 'search', label: '5. Search', level: 'intermediate', Component: SearchOptimization },
  { id: 'parent', label: '6. Parent–Child', level: 'intermediate', Component: ParentChildExample },
  { id: 'memo', label: '7. memo + useMemo', level: 'advanced', Component: MemoComparison },
  { id: 'wrong', label: '8. Wrong Usage', level: 'beginner', Component: WrongUsage },
  { id: 'correct', label: '9. Correct Usage', level: 'intermediate', Component: CorrectUsage },
  { id: 'derived', label: '10. Derived State', level: 'intermediate', Component: DerivedState },
  { id: 'dashboard', label: '11. Dashboard', level: 'advanced', Component: DashboardExample },
]

export default function UseMemoLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useMemo Course"
      intro="Open DevTools Console (F12). Every comparison lesson shows WITHOUT useMemo vs WITH useMemo side by side."
      comparisonHint="Red panel = no memoization. Green panel = useMemo with dependency array."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
