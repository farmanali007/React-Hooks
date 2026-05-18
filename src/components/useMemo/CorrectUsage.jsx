import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import RenderCounter from './utils/RenderCounter'
import { generateUsers } from './utils/generateData'

const USERS = generateUsers(500)

/**
 * LESSON 9 — Correct usage checklist
 * 1. Expensive derivation from stable data
 * 2. Correct dependency array
 * 3. Result passed to memoized children or used in effects
 */

export default function CorrectUsage() {
  const [minScore, setMinScore] = useState(50)
  const [refreshUI, setRefreshUI] = useState(0)

  const topPerformers = useMemo(() => {
    console.log('[CorrectUsage] Filtering top performers — intentional heavy path')
    const result = USERS.filter((u) => u.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
    console.log(`[CorrectUsage] Found ${result.length} top performers`)
    return result
  }, [minScore])

  const averageScore = useMemo(() => {
    if (topPerformers.length === 0) return 0
    const sum = topPerformers.reduce((acc, u) => acc + u.score, 0)
    return sum / topPerformers.length
  }, [topPerformers])

  return (
    <ExampleLayout
      title="9. Correct Usage Pattern"
      level="intermediate"
      analogy="A manager only recomputes the quarterly report when the quarter changes — not every time someone walks past the office."
      whatToWatch={[
        'Change min score — filtering runs (correct)',
        'Click refresh UI — topPerformers reused, averageScore reused',
        'Chained useMemo: second depends on first result',
      ]}
    >
      <RenderCounter label="Dashboard" />
      <div className="controls">
        <label>
          Min score: {minScore}
          <input
            type="range"
            min="0"
            max="100"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
          />
        </label>
        <button type="button" onClick={() => setRefreshUI((r) => r + 1)}>
          Refresh UI shell ({refreshUI})
        </button>
      </div>

      <p className="stat">{topPerformers.length} top performers · avg {averageScore.toFixed(1)}</p>
      <ul className="mini-list">
        {topPerformers.map((u) => (
          <li key={u.id}>{u.name} — {u.score}</li>
        ))}
      </ul>
    </ExampleLayout>
  )
}
