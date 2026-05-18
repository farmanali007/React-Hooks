import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

function GrandchildDrill({ theme }) {
  console.log('[useContext Drill] Grandchild render, theme =', theme)
  return (
    <div className="state-debug">
      <RenderCounter label="Grandchild" color="#e74c3c" />
      <p>Theme: <strong>{theme}</strong></p>
    </div>
  )
}

function ChildDrill({ theme }) {
  console.log('[useContext Drill] Child pass-through render')
  return (
    <div>
      <RenderCounter label="Child (pass-through)" color="#e74c3c" />
      <GrandchildDrill theme={theme} />
    </div>
  )
}

function RootDrill({ theme }) {
  return <ChildDrill theme={theme} />
}

export default function PropDrilling() {
  const [theme, setTheme] = useState('light')

  return (
    <ExampleLayout
      title="1. Prop Drilling Problem"
      level="beginner"
      analogy="Passing a note through every student in class just to reach the last desk — middle kids must hold the note even if they do not need it."
      whatToWatch={[
        'Toggle theme — Child re-renders even though it only forwards the prop',
        'Console logs show every intermediate component',
        'Lesson 2 introduces useContext to skip the middle',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          Toggle theme ({theme})
        </button>
      </div>
      <ComparisonLayout
        withoutTitle="Props through every level"
        withTitle="Preview: context in lesson 2"
        withoutHint="Middle components must accept and forward theme."
        withHint="useContext reads theme without intermediate props."
        withoutPanel={<RootDrill theme={theme} />}
        withPanel={
          <div>
            <p>Continue to &quot;Theme Context&quot; for the fix.</p>
            <p className="state-debug">Would read theme: {theme}</p>
          </div>
        }
      />
    </ExampleLayout>
  )
}
