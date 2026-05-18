import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

export default function DevToolsTip() {
  console.log('[useDebugValue Tip] render')

  return (
    <ExampleLayout
      title="3. Getting the most from labels"
      level="advanced"
      analogy="High-quality map legends — they never change the terrain, but rescuers navigate faster."
      whatToWatch={[
        'Labels appear beside hooks in React 19 DevTools — expand the custom hook row',
        'Pair with console logs in lessons, but ship useDebugValue without noisy logs',
        'Do not store secrets in formatters; treat DevTools as semi-public',
      ]}
    >
      <ol className="state-debug" style={{ lineHeight: 1.7 }}>
        <li>Install the official React DevTools browser extension.</li>
        <li>Open the Components tab → select any lesson component.</li>
        <li>In the hooks list, read the badge that useDebugValue adds.</li>
        <li>Prefer describing intent (“words: 12”) over raw object dumps.</li>
      </ol>
      <RenderCounter label="Explainer" color="#5f27cd" />
    </ExampleLayout>
  )
}
