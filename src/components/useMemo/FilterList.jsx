import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import ComparisonLayout from './utils/ComparisonLayout'
import RenderCounter from './utils/RenderCounter'
import { generateUsers } from './utils/generateData'

const ALL_USERS = generateUsers(800)

function filterUsers(users, query, department) {
  const start = performance.now()
  const q = query.toLowerCase().trim()

  const filtered = users.filter((user) => {
    const matchesQuery =
      !q ||
      user.name.toLowerCase().includes(q) ||
      user.city.toLowerCase().includes(q)
    const matchesDept = department === 'all' || user.department === department
    return matchesQuery && matchesDept
  })

  console.log(
    `[Filter] filtered ${filtered.length} users in ${(performance.now() - start).toFixed(1)}ms`,
  )
  return filtered
}

function WithoutMemo({ query, department }) {
  console.log('[FilterList] WITHOUT render')
  const filtered = filterUsers(ALL_USERS, query, department)

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p className="stat">Showing {filtered.length} of {ALL_USERS.length}</p>
      <ul className="mini-list">
        {filtered.slice(0, 8).map((u) => (
          <li key={u.id}>{u.name} — {u.department}</li>
        ))}
      </ul>
    </div>
  )
}

function WithMemo({ query, department }) {
  console.log('[FilterList] WITH render')

  const filtered = useMemo(
    () => filterUsers(ALL_USERS, query, department),
    [query, department],
  )

  return (
    <div>
      <RenderCounter label="With" color="#27ae60" />
      <p className="stat">Showing {filtered.length} of {ALL_USERS.length}</p>
      <ul className="mini-list">
        {filtered.slice(0, 8).map((u) => (
          <li key={u.id}>{u.name} — {u.department}</li>
        ))}
      </ul>
    </div>
  )
}

export default function FilterList() {
  const [query, setQuery] = useState('')
  const [department, setDepartment] = useState('all')
  const [clicks, setClicks] = useState(0)

  return (
    <ExampleLayout
      title="3. Filtering a Large List"
      level="intermediate"
      analogy="Searching 800 contacts again every time you adjust screen brightness — wasteful. useMemo reuses the filtered list until search or department changes."
      whatToWatch={[
        'Click "Force parent re-render" without changing filters',
        'WITHOUT: filter runs again; WITH: filter skipped',
        'Type in search — both filter (correct!)',
      ]}
    >
      <div className="controls">
        <input
          type="search"
          placeholder="Search name or city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="all">All departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Sales">Sales</option>
          <option value="Support">Support</option>
          <option value="Marketing">Marketing</option>
        </select>
        <button type="button" onClick={() => setClicks((c) => c + 1)}>
          Force parent re-render ({clicks})
        </button>
      </div>

      <ComparisonLayout
        withoutPanel={<WithoutMemo query={query} department={department} />}
        withPanel={<WithMemo query={query} department={department} />}
      />
    </ExampleLayout>
  )
}
