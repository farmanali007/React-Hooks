import { useReducer, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

const initial = { x: 0, y: 0, penDown: false }

function plotReducer(state, action) {
  console.log('[useReducer vs useState] reducer', action.type, action)
  switch (action.type) {
    case 'move':
      return { ...state, x: state.x + action.dx, y: state.y + action.dy }
    case 'togglePen':
      return { ...state, penDown: !state.penDown }
    case 'reset':
      return initial
    default:
      return state
  }
}

function ScatterStatePanel() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [pen, setPen] = useState(false)

  console.log('[useReducer vs useState] many useState updates')

  return (
    <div>
      <RenderCounter label="3× useState" color="#e74c3c" />
      <p>
        Pos: ({x}, {y}) · pen {pen ? 'down' : 'up'}
      </p>
      <div className="controls">
        <button type="button" onClick={() => setX((v) => v + 1)}>
          x+1
        </button>
        <button type="button" onClick={() => setY((v) => v + 1)}>
          y+1
        </button>
        <button type="button" onClick={() => setPen((p) => !p)}>
          toggle pen
        </button>
        <button type="button" className="btn-secondary" onClick={() => { setX(0); setY(0); setPen(false) }}>
          reset (3 calls)
        </button>
      </div>
    </div>
  )
}

function ReducerPanel() {
  const [state, dispatch] = useReducer(plotReducer, initial)
  return (
    <div>
      <RenderCounter label="useReducer" color="#27ae60" />
      <p>
        Pos: ({state.x}, {state.y}) · pen {state.penDown ? 'down' : 'up'}
      </p>
      <div className="controls">
        <button type="button" onClick={() => dispatch({ type: 'move', dx: 1, dy: 0 })}>
          x+1
        </button>
        <button type="button" onClick={() => dispatch({ type: 'move', dx: 0, dy: 1 })}>
          y+1
        </button>
        <button type="button" onClick={() => dispatch({ type: 'togglePen' })}>
          toggle pen
        </button>
        <button type="button" className="btn-secondary" onClick={() => dispatch({ type: 'reset' })}>
          reset (1 dispatch)
        </button>
      </div>
    </div>
  )
}

export default function VsUseState() {
  return (
    <ExampleLayout
      title="2. useReducer vs several useState calls"
      level="intermediate"
      analogy="Three light switches vs one control panel: both work for simple rooms, but a spaceship dashboard wants one protocol (dispatch) so updates stay coordinated."
      whatToWatch={[
        'Reset on the left batches three separate state setters',
        'Right side: one action type describes the whole next sketch state',
        'Reducers shine when transitions depend on each other',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Three independent useState hooks"
        withTitle="Single useReducer machine"
        withoutHint="Related data split across hooks — harder to reason jointly."
        withHint="One state blob + action log-friendly updates."
        withoutPanel={<ScatterStatePanel />}
        withPanel={<ReducerPanel />}
      />
    </ExampleLayout>
  )
}
