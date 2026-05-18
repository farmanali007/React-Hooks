import { createContext, useContext, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const LocaleContext = createContext('en')

function ReadWithConsumer() {
  console.log('[useContext Consumer] Consumer subtree render')
  return (
    <LocaleContext.Consumer>
      {(locale) => {
        console.log('[useContext Consumer] .Consumer callback ran, locale =', locale)
        return (
          <div>
            <RenderCounter label="Context.Consumer" color="#27ae60" />
            <p>
              Locale: <strong>{locale}</strong> (classic render-props API)
            </p>
          </div>
        )
      }}
    </LocaleContext.Consumer>
  )
}

function ReadWithHook() {
  const locale = useContext(LocaleContext)
  console.log('[useContext Consumer] useContext hook, locale =', locale)
  return (
    <div>
      <RenderCounter label="useContext" color="#3498db" />
      <p>
        Locale: <strong>{locale}</strong> (modern hook API)
      </p>
    </div>
  )
}

export default function ConsumerPattern() {
  const [locale, setLocale] = useState('en')

  return (
    <ExampleLayout
      title="3. Context.Consumer vs useContext"
      level="intermediate"
      analogy="Two doors into the same room: the old door is a function you step through (render props); the new door is a hook that hands you the value directly."
      whatToWatch={[
        'Console logs when `.Consumer` callback runs vs when the hook reads',
        'Both see the same Provider value — pick useContext in new code',
        'Consumer still useful in class components or rare render-prop patterns',
      ]}
    >
      <div className="controls">
        <label>
          Locale:&nbsp;
          <select value={locale} onChange={(e) => setLocale(e.target.value)}>
            <option value="en">en</option>
            <option value="es">es</option>
            <option value="fr">fr</option>
          </select>
        </label>
      </div>
      <LocaleContext.Provider value={locale}>
        <ComparisonLayout
          withoutTitle="Context.Consumer (render props)"
          withTitle="useContext (hook)"
          withoutHint="Nested function re-runs when context value changes."
          withHint="Cleaner reads in function components."
          withoutPanel={<ReadWithConsumer />}
          withPanel={<ReadWithHook />}
        />
      </LocaleContext.Provider>
    </ExampleLayout>
  )
}
