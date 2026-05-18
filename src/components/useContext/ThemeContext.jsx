import { createContext, useContext, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const ThemeContext = createContext('light')

function GrandchildWithContext() {
  const theme = useContext(ThemeContext)
  console.log('[useContext Theme] Grandchild read context:', theme)
  return (
    <div>
      <RenderCounter label="Grandchild" color="#27ae60" />
      <p className={`theme-badge theme-${theme}`}>Theme: <strong>{theme}</strong></p>
    </div>
  )
}

function ChildWithContext() {
  console.log('[useContext Theme] Child render — no theme prop needed')
  return (
    <div>
      <RenderCounter label="Child" color="#27ae60" />
      <GrandchildWithContext />
    </div>
  )
}

function WithoutContext({ theme }) {
  return (
    <div>
      <RenderCounter label="With props" color="#e74c3c" />
      <p>Theme via prop: {theme}</p>
    </div>
  )
}

function WithContextProvider({ theme }) {
  return (
    <ThemeContext.Provider value={theme}>
      <ChildWithContext />
    </ThemeContext.Provider>
  )
}

export default function ThemeContextLesson() {
  const [theme, setTheme] = useState('light')

  return (
    <ExampleLayout
      title="2. Theme Context"
      level="beginner"
      analogy="A radio station broadcast — everyone tuned in hears the same song without passing headphones down the row."
      whatToWatch={[
        'Provider wraps the tree with value={theme}',
        'Grandchild calls useContext(ThemeContext)',
        'Toggle theme — only consumers that use context re-render',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
          Toggle theme ({theme})
        </button>
      </div>
      <ComparisonLayout
        withoutTitle="Prop at leaf"
        withTitle="Provider + useContext"
        withoutPanel={<WithoutContext theme={theme} />}
        withPanel={<WithContextProvider theme={theme} />}
      />
    </ExampleLayout>
  )
}
