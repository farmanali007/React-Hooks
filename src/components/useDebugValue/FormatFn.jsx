import { useDebugValue, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function useWordCount(text) {
  const count = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  useDebugValue(text, (t) => {
    const c = t.trim() === '' ? 0 : t.trim().split(/\s+/).length
    return `${t.length} chars / ${c} words`
  })

  console.log('[useDebugValue Format] useWordCount', count)

  return count
}

export default function FormatFn() {
  const [draft, setDraft] = useState('useDebugValue formats complex values lazily')

  const words = useWordCount(draft)

  return (
    <ExampleLayout
      title="2. Lazy formatter for heavy previews"
      level="advanced"
      analogy="Cliff notes for librarians — only generate the summary when someone actually opens the catalog drawer."
      whatToWatch={[
        'Second argument runs only when DevTools inspects the hook',
        'Keeps hot path cheap in production while staying descriptive in dev',
        'Great for privacy — avoid dumping secrets even to DevTools',
      ]}
    >
      <textarea
        className="state-debug"
        rows={4}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        style={{ width: '100%', maxWidth: 480 }}
      />
      <p>Live word count: {words}</p>
      <RenderCounter label="Editor" color="#5f27cd" />
    </ExampleLayout>
  )
}
