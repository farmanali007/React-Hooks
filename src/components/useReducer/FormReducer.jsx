import { useReducer } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const initial = { step: 0, name: '', color: '#61dafb', errors: {} }

function formReducer(state, action) {
  console.log('[useReducer Form]', action.type, action)
  switch (action.type) {
    case 'field': {
      const { name, value } = action
      const next = { ...state, [name]: value, errors: { ...state.errors, [name]: '' } }
      return next
    }
    case 'next': {
      if (!state.name.trim()) {
        console.log('[useReducer Form] validation blocked next')
        return { ...state, errors: { ...state.errors, name: 'Name required' } }
      }
      return { ...state, step: Math.min(2, state.step + 1), errors: {} }
    }
    case 'back':
      return { ...state, step: Math.max(0, state.step - 1) }
    case 'reset':
      return initial
    default:
      return state
  }
}

export default function FormReducer() {
  const [state, dispatch] = useReducer(formReducer, initial)

  return (
    <ExampleLayout
      title="5. Multi-step form as a state machine"
      level="intermediate"
      analogy="Airport security lanes: each step checks one rule before you advance — the reducer is the TSA script, not scattered if-checks in the crowd."
      whatToWatch={[
        'next dispatch runs validation in one place',
        'Field updates clear that field’s error',
        'step + fields live together — impossible half-states between sliders',
      ]}
    >
      <div>
        <RenderCounter label="Wizard" color="#764abc" />
        <p className="state-debug">Step {state.step + 1} of 3</p>
      </div>

      {state.step === 0 && (
        <div className="controls">
          <label>
            Name
            <input
              value={state.name}
              onChange={(e) => dispatch({ type: 'field', name: 'name', value: e.target.value })}
            />
          </label>
          {state.errors.name && <p className="panel-hint">{state.errors.name}</p>}
          <button type="button" onClick={() => dispatch({ type: 'next' })}>
            Next
          </button>
        </div>
      )}

      {state.step === 1 && (
        <div className="controls">
          <label>
            Favorite color
            <input
              type="color"
              value={state.color}
              onChange={(e) => dispatch({ type: 'field', name: 'color', value: e.target.value })}
            />
          </label>
          <button type="button" className="btn-secondary" onClick={() => dispatch({ type: 'back' })}>
            Back
          </button>
          <button type="button" onClick={() => dispatch({ type: 'next' })}>
            Next
          </button>
        </div>
      )}

      {state.step === 2 && (
        <div className="controls">
          <p>
            Hi <strong>{state.name}</strong> — preview swatch:
            <span
              style={{
                display: 'inline-block',
                width: 24,
                height: 24,
                marginLeft: 8,
                background: state.color,
                borderRadius: 4,
                verticalAlign: 'middle',
                border: '1px solid var(--border)',
              }}
            />
          </p>
          <button type="button" className="btn-secondary" onClick={() => dispatch({ type: 'back' })}>
            Back
          </button>
          <button type="button" onClick={() => dispatch({ type: 'reset' })}>
            Submit &amp; reset
          </button>
        </div>
      )}
    </ExampleLayout>
  )
}
