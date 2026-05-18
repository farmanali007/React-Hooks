import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

/**
 * LESSON 6 — Boolean toggle + derived display from state
 */

export default function ToggleAndDerived() {
  const [isOn, setIsOn] = useState(false)
  const [clicks, setClicks] = useState(0)

  const statusLabel = isOn ? 'ON' : 'OFF'
  const message = isOn
    ? 'The light is shining!'
    : 'The room is dark.'

  console.log('[Toggle] render — isOn:', isOn, 'derived:', statusLabel)

  return (
    <ExampleLayout
      title="6. Toggle & Derived UI"
      level="beginner"
      analogy="A light switch (boolean state) plus a sign on the wall (derived text) that automatically changes when the switch flips — no extra state needed for the sign."
      whatToWatch={[
        'Toggle switch — UI text updates from the same isOn state',
        'message and statusLabel are derived — not stored in useState',
        'Bump unrelated clicks — derived values recalculate on render',
      ]}
    >
      <RenderCounter label="Component" />
      <div className="controls">
        <button type="button" onClick={() => setIsOn((v) => !v)}>
          Switch: {statusLabel}
        </button>
        <button type="button" onClick={() => setClicks((c) => c + 1)}>
          Unrelated re-render ({clicks})
        </button>
      </div>
      <div className={`lesson-box ${isOn ? 'good-box' : ''}`}>
        <p className="big-count">{statusLabel}</p>
        <p>{message}</p>
        <p className="state-debug">
          state: isOn = {String(isOn)} · derived: &quot;{statusLabel}&quot;
        </p>
      </div>
    </ExampleLayout>
  )
}
