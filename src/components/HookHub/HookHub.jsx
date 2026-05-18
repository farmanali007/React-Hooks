import { useMemo, useState } from 'react'
import { HOOK_REGISTRY, HOOK_CATEGORIES } from '../../hooks/hookRegistry'
import './hookHub.css'

const START_HERE = ['useState', 'useEffect', 'useMemo']

const LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

function getLevelLabel(level) {
  if (level.includes('→')) return 'Mixed'
  return LEVEL_LABELS[level] ?? level
}

function HookCard({ hook, onSelect, featured = false }) {
  return (
    <button
      type="button"
      className={`hook-card ${featured ? 'hook-card--featured' : ''}`}
      onClick={() => onSelect(hook.id)}
      style={{ '--hook-accent': hook.color }}
    >
      <span className="hook-card__icon" aria-hidden>
        {hook.name.replace('use', '').slice(0, 2).toUpperCase()}
      </span>
      <span className="hook-card__body">
        <span className="hook-card__row">
          <span className="hook-card__name">{hook.name}</span>
          <span className="hook-card__lessons">{hook.lessons} lessons</span>
        </span>
        <span className="hook-card__tagline">{hook.tagline}</span>
      </span>
      <span className="hook-card__meta">
        <span className={`hook-card__level hook-card__level--${hook.level.split(' ')[0]}`}>
          {getLevelLabel(hook.level)}
        </span>
        <span className="hook-card__arrow" aria-hidden>→</span>
      </span>
    </button>
  )
}

export default function HookHub({ onSelectHook }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filteredHooks = useMemo(() => {
    const q = search.trim().toLowerCase()
    return HOOK_REGISTRY.filter((hook) => {
      const matchesCategory = category === 'all' || hook.category === category
      const matchesSearch =
        !q ||
        hook.name.toLowerCase().includes(q) ||
        hook.tagline.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [search, category])

  const featuredHooks = useMemo(
    () => START_HERE.map((id) => HOOK_REGISTRY.find((h) => h.id === id)).filter(Boolean),
    [],
  )

  const showFeatured = category === 'all' && !search.trim()

  return (
    <div className="hook-hub">
      <header className="hub-hero">
        <div className="hub-hero__content">
          <p className="hub-hero__badge">React 19 · Interactive labs</p>
          <h1 className="hub-hero__title">Learn React Hooks</h1>
          <p className="hub-hero__subtitle">
            Pick a hook, run real examples in the browser, and see exactly how React
            works — step by step.
          </p>
          <ul className="hub-hero__stats">
            <li>
              <strong>{HOOK_REGISTRY.length}</strong>
              <span>hooks</span>
            </li>
            <li>
              <strong>80+</strong>
              <span>lessons</span>
            </li>
            <li>
              <strong>Live</strong>
              <span>demos</span>
            </li>
          </ul>
        </div>
      </header>

      {showFeatured && (
        <section className="hub-section hub-section--featured">
          <div className="hub-section__head">
            <h2>Start here</h2>
            <p>Best order if you are new to hooks</p>
          </div>
          <div className="hook-list hook-list--featured">
            {featuredHooks.map((hook) => (
              <HookCard
                key={hook.id}
                hook={hook}
                onSelect={onSelectHook}
                featured
              />
            ))}
          </div>
        </section>
      )}

      <section className="hub-section">
        <div className="hub-toolbar">
          <label className="hub-search">
            <span className="hub-search__icon" aria-hidden>⌕</span>
            <input
              type="search"
              placeholder="Search hooks…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search hooks"
            />
            {search && (
              <button
                type="button"
                className="hub-search__clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          <div className="hub-filters" role="tablist" aria-label="Filter by category">
            <button
              type="button"
              role="tab"
              aria-selected={category === 'all'}
              className={category === 'all' ? 'active' : ''}
              onClick={() => setCategory('all')}
            >
              All
            </button>
            {HOOK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={category === cat.id}
                className={category === cat.id ? 'active' : ''}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hub-section__head hub-section__head--compact">
          <h2>
            {category === 'all' ? 'All hooks' : HOOK_CATEGORIES.find((c) => c.id === category)?.label}
          </h2>
          <p>{filteredHooks.length} available</p>
        </div>

        {filteredHooks.length === 0 ? (
          <div className="hub-empty">
            <p>No hooks match your search.</p>
            <button type="button" onClick={() => { setSearch(''); setCategory('all') }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="hook-list">
            {filteredHooks.map((hook) => (
              <HookCard key={hook.id} hook={hook} onSelect={onSelectHook} />
            ))}
          </div>
        )}
      </section>

      <footer className="hub-footer">
        <p>Tip: open DevTools (F12) before each lesson to see console logs.</p>
      </footer>
    </div>
  )
}
