import { useInsertionEffect, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const INJECTED_ID = 'insertion-effect-demo-sheet'

export default function CssInJsSim() {
  const [hue, setHue] = useState(200)
  const css = `.demo-inserted-box { color: hsl(${hue} 80% 35%); font-weight: 600; border: 1px dashed hsl(${hue} 80% 45%); padding: 0.5rem; border-radius: 6px; }`

  useInsertionEffect(() => {
    console.log('[useInsertionEffect CSS] injecting style node')
    const el = document.createElement('style')
    el.id = INJECTED_ID
    el.setAttribute('data-lab', 'useInsertionEffect-css-in-js-sim')
    el.textContent = css
    document.head.appendChild(el)
    return () => {
      console.log('[useInsertionEffect CSS] removing style node')
      el.remove()
    }
  }, [css])

  return (
    <ExampleLayout
      title="3. Mini CSS-in-JS injector"
      level="advanced"
      analogy="Sticker sheets for window displays — stick the price tag sheet (style tag) before the interior designer measures shelving (layout effects)."
      whatToWatch={[
        'Slider updates css text → insertion effect swaps the style tag',
        'Real libraries batch many rules — this is the same lifecycle hook',
        'Inspect &lt;head&gt; for the temporary style element while mounted',
      ]}
    >
      <div className="controls">
        <label>
          Hue
          <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} />
        </label>
      </div>
      <p className="demo-inserted-box state-debug">Styled via injected stylesheet (hue {hue})</p>
      <RenderCounter label="Injector" color="#96ceb4" />
    </ExampleLayout>
  )
}
