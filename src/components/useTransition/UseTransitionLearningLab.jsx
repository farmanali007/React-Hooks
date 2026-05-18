import LearningLabShell from '../shared/LearningLabShell'
import StartTransition from './StartTransition'
import IsPending from './IsPending'
import TabSwitch from './TabSwitch'
import VsBlocking from './VsBlocking'

const LESSONS = [
  { id: 'start', label: '1. startTransition', level: 'advanced', Component: StartTransition },
  { id: 'pending', label: '2. isPending', level: 'advanced', Component: IsPending },
  { id: 'tabs', label: '3. Tab switching', level: 'advanced', Component: TabSwitch },
  { id: 'block', label: '4. vs blocking', level: 'advanced', Component: VsBlocking },
]

export default function UseTransitionLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useTransition Course"
      intro="Open DevTools Console (F12). Mark heavy state updates as transitions so React can keep urgent interactions responsive."
      comparisonHint="Combine with Suspense in real apps for data loading."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
