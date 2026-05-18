import { useRef } from 'react'

/**
 * Educational render counter — increments on every render.
 * eslint disabled intentionally: counting renders requires reading a ref during render.
 */
/* eslint-disable react-hooks/refs -- demo tool: track render count without triggering extra updates */
export default function RenderCounter({ label, color = 'var(--accent)' }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <span className="render-counter" style={{ borderColor: color }}>
      {label}: <strong>{renderCount.current}</strong> renders
    </span>
  )
}
