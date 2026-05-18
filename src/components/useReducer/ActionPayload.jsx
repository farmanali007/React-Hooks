import { useReducer } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const initial = { items: ['alpha', 'beta', 'gamma'], filter: '' }

function listReducer(state, action) {
  console.log('[useReducer Payload]', action.type, 'payload' in action ? action.payload : '')
  switch (action.type) {
    case 'add': {
      const text = action.payload.text.trim()
      if (!text) return state
      return { ...state, items: [...state.items, text] }
    }
    case 'remove': {
      const idx = action.payload.index
      return { ...state, items: state.items.filter((_, i) => i !== idx) }
    }
    case 'filter':
      return { ...state, filter: action.payload.query }
    default:
      return state
  }
}

export default function ActionPayload() {
  const [state, dispatch] = useReducer(listReducer, initial)
  const visible = state.items.filter((t) => t.toLowerCase().includes(state.filter.toLowerCase()))

  return (
    <ExampleLayout
      title="3. Action payloads"
      level="intermediate"
      analogy="A shipping label: the type says &quot;deliver package&quot; — the payload is the address. Keep both explicit so logs and tests read like a story."
      whatToWatch={[
        'Console logs print type + payload together',
        'Empty add is ignored in the reducer (guard clause)',
        'Payload shape can grow — document conventions for your team',
      ]}
    >
      <div className="controls">
        <label>
          Filter:&nbsp;
          <input
            value={state.filter}
            onChange={(e) => dispatch({ type: 'filter', payload: { query: e.target.value } })}
          />
        </label>
        <button
          type="button"
          onClick={() => dispatch({ type: 'add', payload: { text: `item-${state.items.length}` } })}
        >
          Add generated item
        </button>
      </div>
      <div>
        <RenderCounter label="List" color="#764abc" />
        <ul className="state-debug">
          {visible.map((item, i) => (
            <li key={`${item}-${i}`}>
              {item}{' '}
              <button
                type="button"
                className="btn-secondary"
                onClick={() => dispatch({ type: 'remove', payload: { index: state.items.indexOf(item) } })}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </ExampleLayout>
  )
}
