import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import RenderCounter from './utils/RenderCounter'
import { generateUsers } from './utils/generateData'

const SALES = generateUsers(400).map((u) => ({
  region: u.city,
  amount: u.score * 120,
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][u.id % 6],
}))

/**
 * LESSON 11 — Dashboard-style real-world pattern
 * Multiple derived metrics from one dataset + date filter
 */

export default function DashboardExample() {
  const [month, setMonth] = useState('All')
  const [liveVisitors, setLiveVisitors] = useState(42)

  const filteredSales = useMemo(() => {
    console.log('[Dashboard] Filtering sales by month...')
    if (month === 'All') return SALES
    return SALES.filter((s) => s.month === month)
  }, [month])

  const metrics = useMemo(() => {
    console.log('[Dashboard] Aggregating metrics...')
    const totalRevenue = filteredSales.reduce((sum, s) => sum + s.amount, 0)
    const avgDeal = filteredSales.length ? totalRevenue / filteredSales.length : 0
    const topRegion = filteredSales.reduce(
      (best, row) => (row.amount > (best?.amount ?? 0) ? row : best),
      null,
    )
    return { totalRevenue, avgDeal, topRegion: topRegion?.region ?? '—', count: filteredSales.length }
  }, [filteredSales])

  const chartBars = useMemo(() => {
    const regions = {}
    filteredSales.forEach((s) => {
      regions[s.region] = (regions[s.region] ?? 0) + s.amount
    })
    return Object.entries(regions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }, [filteredSales])

  return (
    <ExampleLayout
      title="11. Dashboard — Real-World Pattern"
      level="advanced"
      analogy="A CEO dashboard that only recomputes charts when you change the month filter — not when the live visitor counter ticks."
      whatToWatch={[
        'Simulate live visitors — metrics should NOT recompute',
        'Change month filter — all three useMemos run in chain',
        'This is how analytics panels in production apps are structured',
      ]}
    >
      <RenderCounter label="Dashboard" />

      <div className="controls">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option>All</option>
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <button type="button" onClick={() => setLiveVisitors((v) => v + Math.floor(Math.random() * 5))}>
          Live visitors: {liveVisitors} (unrelated)
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="metric-card">
          <span>Revenue</span>
          <strong>${metrics.totalRevenue.toLocaleString()}</strong>
        </div>
        <div className="metric-card">
          <span>Avg deal</span>
          <strong>${metrics.avgDeal.toFixed(0)}</strong>
        </div>
        <div className="metric-card">
          <span>Top region</span>
          <strong>{metrics.topRegion}</strong>
        </div>
        <div className="metric-card">
          <span>Deals</span>
          <strong>{metrics.count}</strong>
        </div>
      </div>

      <div className="chart-bars">
        {chartBars.map(([region, amount]) => (
          <div key={region} className="bar-row">
            <span>{region}</span>
            <div
              className="bar-fill"
              style={{ width: `${Math.min(100, amount / 5000)}%` }}
            />
            <span>${amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </ExampleLayout>
  )
}
