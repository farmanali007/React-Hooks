import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import ComparisonLayout from './utils/ComparisonLayout'
import RenderCounter from './utils/RenderCounter'
import { generateUsers } from './utils/generateData'

const DATA = generateUsers(600)

function sortUsers(users, sortBy, direction) {
  const start = performance.now()
  const sorted = [...users].sort((a, b) => {
    const aVal = a[sortBy]
    const bVal = b[sortBy]
    if (typeof aVal === 'string') {
      return direction === 'asc'
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
    }
    return direction === 'asc' ? aVal - bVal : bVal - aVal
  })
  console.log(`[Sort] sorted ${sorted.length} rows in ${(performance.now() - start).toFixed(1)}ms`)
  return sorted
}

function WithoutMemo({ sortBy, direction }) {
  console.log('[Sort] WITHOUT render')
  const sorted = sortUsers(DATA, sortBy, direction)

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <ul className="mini-list">
        {sorted.slice(0, 6).map((u) => (
          <li key={u.id}>{u.name} — score {u.score}</li>
        ))}
      </ul>
    </div>
  )
}

function WithMemo({ sortBy, direction }) {
  console.log('[Sort] WITH render')
  const sorted = useMemo(
    () => sortUsers(DATA, sortBy, direction),
    [sortBy, direction],
  )

  return (
    <div>
      <RenderCounter label="With" color="#27ae60" />
      <ul className="mini-list">
        {sorted.slice(0, 6).map((u) => (
          <li key={u.id}>{u.name} — score {u.score}</li>
        ))}
      </ul>
    </div>
  )
}

export default function SortingExample() {
  const [sortBy, setSortBy] = useState('score')
  const [direction, setDirection] = useState('desc')
  const [tick, setTick] = useState(0)

  return (
    <ExampleLayout
      title="4. Sorting a Large List"
      level="intermediate"
      analogy="Re-sorting a phone book alphabetically every time someone coughs in the room."
      whatToWatch={[
        'Bump tick — WITHOUT re-sorts, WITH reuses cached sorted array',
        'Change sort field or direction — both re-sort',
      ]}
    >
      <div className="controls">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="score">Score</option>
          <option value="name">Name</option>
          <option value="city">City</option>
        </select>
        <button type="button" onClick={() => setDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}>
          Direction: {direction}
        </button>
        <button type="button" onClick={() => setTick((t) => t + 1)}>
          Unrelated re-render ({tick})
        </button>
      </div>

      <ComparisonLayout
        withoutPanel={<WithoutMemo sortBy={sortBy} direction={direction} />}
        withPanel={<WithMemo sortBy={sortBy} direction={direction} />}
      />
    </ExampleLayout>
  )
}
