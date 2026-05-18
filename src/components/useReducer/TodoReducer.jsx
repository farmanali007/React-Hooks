import { useReducer } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const initial = {
  todos: [
    { id: 1, text: 'Learn useReducer', done: false },
    { id: 2, text: 'Sketch state chart', done: false },
  ],
  nextId: 3,
}

function todoReducer(state, action) {
  console.log('[useReducer Todo]', action.type)
  switch (action.type) {
    case 'add': {
      const text = action.text.trim()
      if (!text) return state
      const todo = { id: state.nextId, text, done: false }
      return {
        ...state,
        todos: [...state.todos, todo],
        nextId: state.nextId + 1,
      }
    }
    case 'toggle':
      return {
        ...state,
        todos: state.todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)),
      }
    case 'clearDone':
      return { ...state, todos: state.todos.filter((t) => !t.done) }
    default:
      return state
  }
}

export default function TodoReducer() {
  const [state, dispatch] = useReducer(todoReducer, initial)
  return (
    <ExampleLayout
      title="4. Todo list reducer"
      level="intermediate"
      analogy="A chore board: add sticky notes, flip done/not-done, clear finished — each move is an intentional labeled action instead of ripping papers randomly."
      whatToWatch={[
         'toggle is id-driven — works even if list reorders later',
        'nextId lives in state to keep ids collision-free',
        'Try DevTools &quot;log actions&quot; mindset — same as Redux time-travel lite',
      ]}
    >
      <form
        className="controls"
        onSubmit={(e) => {
          e.preventDefault()
          const fd = new FormData(e.currentTarget)
          dispatch({ type: 'add', text: String(fd.get('text') ?? '') })
          e.currentTarget.reset()
        }}
      >
        <input name="text" placeholder="New todo" />
        <button type="submit">Add</button>
        <button type="button" className="btn-secondary" onClick={() => dispatch({ type: 'clearDone' })}>
          Clear done
        </button>
      </form>
      <div>
        <RenderCounter label="Todo app" color="#764abc" />
        <ul className="state-debug">
          {state.todos.map((t) => (
            <li key={t.id}>
              <label>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => dispatch({ type: 'toggle', id: t.id })}
                />
                <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </ExampleLayout>
  )
}
