import LearningLabShell from '../shared/LearningLabShell'
import WhatIsIt from './WhatIsIt'
import TimingOrder from './TimingOrder'
import CssInJsSim from './CssInJsSim'

const LESSONS = [
  { id: 'what', label: '1. What is it?', level: 'advanced', Component: WhatIsIt },
  { id: 'order', label: '2. Effect ordering', level: 'advanced', Component: TimingOrder },
  { id: 'css', label: '3. CSS-in-JS simulation', level: 'advanced', Component: CssInJsSim },
]

export default function UseInsertionEffectLearningLab({ onBack }) {
  return (
    <LearningLabShell
      title="useInsertionEffect Course"
      intro="Open DevTools Console (F12). Library authors inject global styles before layout reads DOM — ordinary app code rarely needs this hook."
      comparisonHint="Think: style tags, not business logic."
      lessons={LESSONS}
      onBack={onBack}
    />
  )
}
