/**
 * Simulates a slow, CPU-heavy calculation.
 *
 * Analogy: Like a chef who must count every grain of rice by hand
 * every time someone asks "how many grains?" — even when nothing changed.
 *
 * In real apps: parsing JSON, complex math, filtering huge arrays, etc.
 */

let globalCalcCount = 0

/** How many times expensiveWork ran (shared across demos for teaching). */
export function getCalcCount() {
  return globalCalcCount
}

export function resetCalcCount() {
  globalCalcCount = 0
}

/**
 * @param {number} iterations - Higher = slower (feels "expensive")
 * @param {string} label - Shows in console so you know WHICH demo ran the work
 * @returns {number} A fake "result" number
 */
export function expensiveWork(iterations = 8_000_000, label = 'calc') {
  globalCalcCount += 1
  const start = performance.now()

  let result = 0
  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) % 7
  }

  const ms = (performance.now() - start).toFixed(1)
  console.log(
    `%c[EXPENSIVE WORK] ${label} — run #${globalCalcCount} — took ${ms}ms`,
    'color: #e67e22; font-weight: bold',
  )

  return result
}
