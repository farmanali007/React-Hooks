import { useState } from 'react'
import './useMemoLab.css'

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

export default function UseMemoLearningLab() {
  const [activeId, setActiveId] = useState('basic')
  const active = LESSONS.find((l) => l.id === activeId) ?? LESSONS[0]
  const ActiveComponent = active.Component

  return (
    <div className="use-memo-lab">
      <aside className="lab-sidebar">
        <h1>useMemo Course</h1>
        <p className="lab-intro">
          Open DevTools Console (F12) before each lesson. Every example compares
          <strong> without</strong> vs <strong>with</strong> useMemo side by side.
        </p>
        <nav>
          <ul>
            {LESSONS.map((lesson) => (
              <li key={lesson.id}>
                <button
                  type="button"
                  className={lesson.id === activeId ? 'active' : ''}
                  onClick={() => setActiveId(lesson.id)}
                >
                  {lesson.label}
                  <span className={`nav-level level-${lesson.level}`}>{lesson.level}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="lab-main">
        <ActiveComponent key={activeId} />
      </main>
    </div>
  )
}
