import LearningLabShell from '../shared/LearningLabShell'
import PropDrilling from './PropDrilling'
import ThemeContext from './ThemeContext'
import ConsumerPattern from './ConsumerPattern'
import UpdateContext from './UpdateContext'
import CustomHookContext from './CustomHookContext'

const LESSONS = [
  { id: 'drill', label: '1. Prop Drilling', level: 'beginner', Component: PropDrilling },
  { id: 'theme', label: '2. Theme Context', level: 'beginner', Component: ThemeContext },
  { id: 'consumer', label: '3. Consumer Pattern', level: 'intermediate', Component: ConsumerPattern },
  { id: 'update', label: '4. Update Context', level: 'intermediate', Component: UpdateContext },
  { id: 'custom', label: '5. Custom Hook + Context', level: 'intermediate', Component: CustomHookContext },
]

export default function UseContextLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useContext Course"
      intro="Open DevTools Console (F12). Learn to share data across the tree without passing props through every level."
      comparisonHint="Red = prop drilling pain. Green = context provider + useContext."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
