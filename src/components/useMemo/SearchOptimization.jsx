import { useState, useMemo } from 'react'
import ExampleLayout from './utils/ExampleLayout'
import ComparisonLayout from './utils/ComparisonLayout'
import RenderCounter from './utils/RenderCounter'
import { generateUsers } from './utils/generateData'

const PRODUCTS = generateUsers(1000).map((u, i) => ({
  ...u,
  name: `Product ${i + 1} — ${u.name}`,
  price: Math.round(Math.random() * 200 + 5),
}))

function searchProducts(items, term, maxPrice) {
  const start = performance.now()
  const lower = term.toLowerCase()
  const results = items.filter(
    (p) =>
      p.price <= maxPrice &&
      (!lower || p.name.toLowerCase().includes(lower) || p.department.toLowerCase().includes(lower)),
  )
  console.log(`[Search] found ${results.length} in ${(performance.now() - start).toFixed(1)}ms`)
  return results
}

function WithoutMemo({ term, maxPrice }) {
  console.log('[Search] WITHOUT render')
  const results = searchProducts(PRODUCTS, term, maxPrice)

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p>{results.length} products match</p>
      <div className="tag-row">
        {results.slice(0, 5).map((p) => (
          <span key={p.id} className="tag">${p.price} — {p.department}</span>
        ))}
      </div>
    </div>
  )
}

function WithMemo({ term, maxPrice }) {
  console.log('[Search] WITH render')
  const results = useMemo(
    () => searchProducts(PRODUCTS, term, maxPrice),
    [term, maxPrice],
  )

  return (
    <div>
      <RenderCounter label="With" color="#27ae60" />
      <p>{results.length} products match</p>
      <div className="tag-row">
        {results.slice(0, 5).map((p) => (
          <span key={p.id} className="tag">${p.price} — {p.department}</span>
        ))}
      </div>
    </div>
  )
}

export default function SearchOptimization() {
  const [term, setTerm] = useState('')
  const [maxPrice, setMaxPrice] = useState(150)
  const [showBanner, setShowBanner] = useState(true)

  return (
    <ExampleLayout
      title="5. E-commerce Search Optimization"
      level="intermediate"
      analogy="Re-scanning 1000 products when you only toggled a promo banner."
      whatToWatch={[
        'Toggle promo banner — WITHOUT searches again',
        'Type search or move price slider — both search',
      ]}
    >
      <div className="controls">
        <input
          type="search"
          placeholder="Search products..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <label>
          Max price: ${maxPrice}
          <input
            type="range"
            min="20"
            max="250"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <button type="button" onClick={() => setShowBanner((b) => !b)}>
          {showBanner ? 'Hide' : 'Show'} promo banner
        </button>
      </div>

      {showBanner && <p className="banner">Free shipping on orders over $50!</p>}

      <ComparisonLayout
        withoutPanel={<WithoutMemo term={term} maxPrice={maxPrice} />}
        withPanel={<WithMemo term={term} maxPrice={maxPrice} />}
      />
    </ExampleLayout>
  )
}
