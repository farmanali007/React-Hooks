import { createContext, useContext, useMemo, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const SettingsContext = createContext(null)

function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) {
    throw new Error('[useContext CustomHook] useSettings must be used inside SettingsProvider')
  }
  console.log('[useContext CustomHook] useSettings() read')
  return ctx
}

function SettingsProvider({ children }) {
  const [fontSize, setFontSize] = useState(16)
  const value = useMemo(
    () => ({
      fontSize,
      setFontSize,
      bump: () => setFontSize((s) => s + 1),
    }),
    [fontSize],
  )
  console.log('[useContext CustomHook] SettingsProvider render')
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

function PreviewDirect() {
  const ctx = useContext(SettingsContext)
  console.log('[useContext CustomHook] PreviewDirect useContext(SettingsContext)')
  if (!ctx) return null
  return (
    <div style={{ fontSize: ctx.fontSize }}>
      <RenderCounter label="Direct useContext" color="#e74c3c" />
      <p>Raw context access — easy to forget null checks in larger apps.</p>
    </div>
  )
}

function PreviewHook() {
  const { fontSize, bump } = useSettings()
  return (
    <div style={{ fontSize }}>
      <RenderCounter label="useSettings()" color="#27ae60" />
      <p>Custom hook wraps useContext + validation — nicer API for teammates.</p>
      <button type="button" onClick={bump}>
        Bump font ({fontSize}px)
      </button>
    </div>
  )
}

export default function CustomHookContext() {
  return (
    <ExampleLayout
      title="5. Custom hook + context"
      level="intermediate"
      analogy="Context is the power outlet; a custom hook is the labeled adapter that says &quot;laptop plug only&quot; so nobody sticks a fork in the socket by mistake."
      whatToWatch={[
        'useSettings throws a clear error outside the provider',
        'Team imports one hook instead of raw Context + useContext',
        'You can add memoized selectors here later if the app grows',
      ]}
    >
      <SettingsProvider>
        <ComparisonLayout
          withoutTitle="useContext(Settings) everywhere"
          withTitle="useSettings() facade"
          withoutHint="Repeated createContext import + easy to skip safety checks."
          withHint="Single import, enforced Provider boundary."
          withoutPanel={<PreviewDirect />}
          withPanel={<PreviewHook />}
        />
      </SettingsProvider>
    </ExampleLayout>
  )
}
