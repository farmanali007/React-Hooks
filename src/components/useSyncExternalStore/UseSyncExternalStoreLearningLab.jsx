import LearningLabShell from '../shared/LearningLabShell'
import SimpleStore from './SimpleStore'
import SubscribePattern from './SubscribePattern'
import OnlineStatus from './OnlineStatus'
import WithoutVsWith from './WithoutVsWith'

const LESSONS = [
  { id: 'simple', label: '1. Tiny store', level: 'advanced', Component: SimpleStore },
  { id: 'pattern', label: '2. Subscribe recipe', level: 'advanced', Component: SubscribePattern },
  { id: 'online', label: '3. Online status', level: 'advanced', Component: OnlineStatus },
  { id: 'cmp', label: '4. vs manual sync', level: 'advanced', Component: WithoutVsWith },
]

export default function UseSyncExternalStoreLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useSyncExternalStore Course"
      intro="Open DevTools Console (F12). Subscribe to out-of-React data — browsers, libs, globals — with tearing protection in concurrent rendering."
      comparisonHint="Always supply getServerSnapshot for SSR parity."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
