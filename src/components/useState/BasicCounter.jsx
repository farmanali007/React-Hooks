import { useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import ComparisonLayout from '../shared/ComparisonLayout'
import RenderCounter from '../shared/RenderCounter'

/**
 * LESSON 1 — Plain variable vs useState
 * Plain let resets every render; useState persists and triggers UI update.
 */

function WithoutState() {
  // Intentionally NOT using useState — value resets every render; clicks don't update UI
  let count = 0
  console.log('[useState Basic] WITHOUT render, count =', count)

  const increment = () => {
    // eslint-disable-next-line react-hooks/immutability -- teaching: mutating local var doesn't update UI
    count += 1
    console.log('[useState Basic] WITHOUT clicked, count is now', count, '— but UI will NOT update!')
  }

  return (
    <div>
      <RenderCounter label="Without" color="#e74c3c" />
      <p className="big-count">{count}</p>
      <button
        type="button"
        // eslint-disable-next-line react-hooks/immutability -- teaching demo
        onClick={increment}
      >
        +1
      </button>
      <p className="state-debug">let count = {count} (resets every render)</p>
    </div>
  )
}

function WithState() {
  const [count, setCount] = useState(0)
  console.log('[useState Basic] WITH render, count =', count)

  const increment = () => {
    setCount(count + 1)
    console.log('[useState Basic] WITH setCount called — React will re-render!')
  }

  return (
    <div>
      <RenderCounter label="With useState" color="#27ae60" />
      <p className="big-count">{count}</p>
      <button type="button" onClick={increment}>+1</button>
      <p className="state-debug">useState(0) → count = {count}</p>
    </div>
  )
}

export default function BasicCounter() {
  return (
    <ExampleLayout
      title="1. What is useState?"
      level="beginner"
      analogy="A plain variable is like writing on a whiteboard and erasing it every time React redraws the screen. useState is like a sticky note React keeps for you between redraws."
      whatToWatch={[
        'Click +1 on the LEFT — number stays 0 (broken!)',
        'Click +1 on the RIGHT — number increases (works!)',
        'Console on left shows count increasing but UI does not change',
        'Render counter increases on both sides when you click',
      ]}
    >
      <ComparisonLayout
        withoutTitle="Plain variable (broken)"
        withTitle="useState (correct)"
        withoutHint="Changing a normal variable does not tell React to update the screen."
        withHint="setState tells React: data changed → please re-render this component."
        withoutPanel={<WithoutState />}
        withPanel={<WithState />}
      />
    </ExampleLayout>
  )
}
