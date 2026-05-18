import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import ComparisonLayout from './utils/ComparisonLayout'
import RenderCounter from './utils/RenderCounter'

const cart = [
  { id: 1, name: 'Keyboard', price: 79, qty: 1 },
  { id: 2, name: 'Mouse', price: 39, qty: 2 },
  { id: 3, name: 'Monitor', price: 299, qty: 1 },
]

function computeSummary(items, taxRate) {
  console.log('[DerivedState] computing summary...')
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = subtotal * taxRate
  const total = subtotal + tax
  return { subtotal, tax, total, itemCount: items.length }
}

function WithoutMemo({ taxRate }) {
  const summary = computeSummary(cart, taxRate)
  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p>Subtotal: ${summary.subtotal}</p>
      <p>Tax: ${summary.tax.toFixed(2)}</p>
      <p><strong>Total: ${summary.total.toFixed(2)}</strong></p>
    </div>
  )
}

function WithMemo({ taxRate }) {
  const summary = useMemo(() => computeSummary(cart, taxRate), [taxRate])
  return (
    <div>
      <RenderCounter label="With" color="#27ae60" />
      <p>Subtotal: ${summary.subtotal}</p>
      <p>Tax: ${summary.tax.toFixed(2)}</p>
      <p><strong>Total: ${summary.total.toFixed(2)}</strong></p>
    </div>
  )
}

export default function DerivedState() {
  const [taxRate, setTaxRate] = useState(0.08)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <ExampleLayout
      title="10. Derived State Optimization"
      level="intermediate"
      analogy="Your receipt total shouldn't be recalculated when you only switch the shop's light bulbs on or off."
      whatToWatch={[
        'Toggle dark mode — WITHOUT recomputes cart summary',
        'Change tax rate — both recompute',
      ]}
    >
      <div className="controls">
        <label>
          Tax rate: {(taxRate * 100).toFixed(0)}%
          <input
            type="range"
            min="0"
            max="20"
            value={taxRate * 100}
            onChange={(e) => setTaxRate(Number(e.target.value) / 100)}
          />
        </label>
        <button type="button" onClick={() => setDarkMode((d) => !d)}>
          Dark mode: {darkMode ? 'on' : 'off'}
        </button>
      </div>

      <ComparisonLayout
        withoutPanel={<WithoutMemo taxRate={taxRate} />}
        withPanel={<WithMemo taxRate={taxRate} />}
      />
    </ExampleLayout>
  )
}
