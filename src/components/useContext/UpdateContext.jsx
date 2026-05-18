import { createContext, useContext, useMemo, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const AuthContext = createContext(null)

function ToolbarBad() {
  const ctx = useContext(AuthContext)
  console.log('[useContext Update] ToolbarBad render — expects unstable object shape')
  if (!ctx) return null
  const { user, login, logout } = ctx
  return (
    <div>
      <RenderCounter label="Toolbar (consumer)" color="#e74c3c" />
      <p>User: {user ?? 'guest'}</p>
      <button type="button" onClick={() => login('Ada')}>
        Login
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

function ToolbarGood() {
  const ctx = useContext(AuthContext)
  console.log('[useContext Update] ToolbarGood render')
  if (!ctx) return null
  const { user, login, logout } = ctx
  return (
    <div>
      <RenderCounter label="Toolbar (memo value)" color="#27ae60" />
      <p>User: {user ?? 'guest'}</p>
      <button type="button" onClick={() => login('Ada')}>
        Login
      </button>
      <button type="button" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

function ProviderBad({ children }) {
  const [user, setUser] = useState(null)
  const value = {
    user,
    login: (name) => setUser(name),
    logout: () => setUser(null),
  }
  console.log('[useContext Update] ProviderBad — new value object every render')
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function ProviderGood({ children }) {
  const [user, setUser] = useState(null)
  const value = useMemo(
    () => ({
      user,
      login: (name) => {
        console.log('[useContext Update] login(', name, ')')
        setUser(name)
      },
      logout: () => {
        console.log('[useContext Update] logout()')
        setUser(null)
      },
    }),
    [user],
  )
  console.log('[useContext Update] ProviderGood value memoized until user changes')
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function UpdateContext() {
  const [unrelated, setUnrelated] = useState(0)

  return (
    <ExampleLayout
      title="4. Updating context from children"
      level="intermediate"
      analogy="A shared whiteboard: if you swap the whole board every time someone breathes (new object each render), readers look up needlessly. Memoize the board until the writing actually changes."
      whatToWatch={[
        'Bump unrelated counter — Bad provider may churn context identity',
        'Good panel: consumers only re-render when `user` truly changes',
        'Functions in value: wrap provider payload in useMemo or useReducer',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => setUnrelated((n) => n + 1)}>
          Bump unrelated parent state ({unrelated})
        </button>
      </div>
      <ComparisonLayout
        withoutTitle="Value object recreated each render"
        withTitle="useMemo stabilizes context value"
        withoutHint="Handlers + object literal → new reference often."
        withHint="Memo until user changes — fewer surprise re-renders."
        withoutPanel={
          <ProviderBad>
            <ToolbarBad />
          </ProviderBad>
        }
        withPanel={
          <ProviderGood>
            <ToolbarGood />
          </ProviderGood>
        }
      />
    </ExampleLayout>
  )
}
