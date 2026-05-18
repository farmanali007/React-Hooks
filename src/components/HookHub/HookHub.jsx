import './hookHub.css'

const HOOKS = [
  {
    id: 'useState',
    name: 'useState',
    tagline: 'Remember data that changes over time',
    description:
      'Learn how React stores component memory, triggers re-renders, and updates the UI when state changes.',
    level: 'beginner',
    lessons: 7,
    color: '#61dafb',
    available: true,
  },
  {
    id: 'useMemo',
    name: 'useMemo',
    tagline: 'Cache expensive calculations between renders',
    description:
      'Learn when to skip heavy work, how dependency arrays work, and how memoization improves performance.',
    level: 'beginner → advanced',
    lessons: 11,
    color: '#aa3bff',
    available: true,
  },
]

export default function HookHub({ onSelectHook }) {
  return (
    <div className="hook-hub">
      <header className="hub-header">
        <p className="hub-eyebrow">React Hooks — Interactive Course</p>
        <h1>Choose a hook to learn</h1>
        <p className="hub-subtitle">
          Each hook has hands-on lessons with console logs, render counters, and
          side-by-side comparisons. Open DevTools (F12) before you start.
        </p>
      </header>

      <div className="hook-grid">
        {HOOKS.map((hook) => (
          <button
            key={hook.id}
            type="button"
            className={`hook-card ${hook.available ? '' : 'hook-card--disabled'}`}
            onClick={() => hook.available && onSelectHook(hook.id)}
            disabled={!hook.available}
            style={{ '--hook-accent': hook.color }}
          >
            <span className="hook-card__badge">{hook.lessons} lessons</span>
            <h2 className="hook-card__name">{hook.name}</h2>
            <p className="hook-card__tagline">{hook.tagline}</p>
            <p className="hook-card__desc">{hook.description}</p>
            <span className="hook-card__level">{hook.level}</span>
            <span className="hook-card__cta">
              {hook.available ? 'Start learning →' : 'Coming soon'}
            </span>
          </button>
        ))}
      </div>

      <footer className="hub-footer">
        <p>
          More hooks (useEffect, useRef, useCallback…) will be added here later.
        </p>
      </footer>
    </div>
  )
}
