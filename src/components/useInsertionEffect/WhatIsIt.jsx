import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function WhatIsIt() {
  console.log('[useInsertionEffect What] render')

  return (
    <ExampleLayout
      title="1. What useInsertionEffect solves"
      level="advanced"
      analogy="Dressing a mannequin before the store opens: shoppers (layout) must see the outfit already on — not watch pants slide up."
      whatToWatch={[
        'Official niche: CSS-in-JS libraries collecting rules during render',
        'Runs after DOM mutations are known but before useLayoutEffect reads layout',
        'App component code almost always wants useEffect or useLayoutEffect instead',
      ]}
    >
      <p className="state-debug">
        This hook does not replace styling solutions like CSS Modules or Tailwind — it coordinates <em>runtime style injection</em> so
        subsequent layout effects see final classnames.
      </p>
      <RenderCounter label="Explainer" color="#96ceb4" />
    </ExampleLayout>
  )
}
