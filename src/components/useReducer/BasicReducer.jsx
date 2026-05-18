import { useReducer } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const initialCount = 0

function countReducer(state, action) {
  console.log('[useReducer Basic] dispatch', action)
  switch (action.type) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    case 'reset':
      return initialCount
    default:
      console.warn('[useReducer Basic] unknown action', action.type)
      return state
  }
}

export default function BasicReducer() {
  const [count, dispatch] = useReducer(countReducer, initialCount)

  return (
    <ExampleLayout
      title="1. Basic useReducer"
      level="beginner"
      analogy="A vending machine: you press labeled buttons (actions); the machine rules (reducer) decide what changes — not every customer fiddling with wires directly."
      whatToWatch={[
        'Console logs show each action object',
        'Reducer stays pure — compute next state from action + previous state',
        'dispatch is stable — safe to pass down without useCallback',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => dispatch({ type: 'dec' })}>
          −
        </button>
        <button type="button" onClick={() => dispatch({ type: 'inc' })}>
          +
        </button>
        <button type="button" className="btn-secondary" onClick={() => dispatch({ type: 'reset' })}>
          Reset
        </button>
      </div>
      <div>
        <RenderCounter label="Counter" color="#764abc" />
        <p className="state-debug">
          Count: <strong>{count}</strong>
        </p>
      </div>
    </ExampleLayout>
  )
}
