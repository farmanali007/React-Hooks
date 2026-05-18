import { useFormStatus } from 'react-dom'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

function StatusBanner() {
  const { pending, data } = useFormStatus()
  console.log('[useFormStatus Label] pending/data', pending, data)

  const preview =
    pending && data instanceof FormData ? String(data.get('headline') ?? '') : ''

  return (
    <div className="state-debug" style={{ marginTop: '0.75rem' }}>
      Status: {pending ? 'Publishing draft…' : 'Idle'}
      {pending && preview && (
        <span>
          {' '}
          — preview: <em>{preview}</em>
        </span>
      )}
    </div>
  )
}

async function publish() {
  await new Promise((r) => setTimeout(r, 600))
}

export default function PendingLabel() {
  return (
    <ExampleLayout
      title="2. Surfacing FormData mid-flight"
      level="intermediate"
      analogy="A photo lab receipt reprints your order summary while film develops — you trust what you submitted."
      whatToWatch={[
        'While pending, data is a live FormData snapshot',
        'Great for optimistic banners & analytics breadcrumbs',
        'Never trust client-only previews as security boundaries',
      ]}
    >
      <form className="controls" action={publish} style={{ display: 'grid', gap: '0.75rem' }}>
        <label>
          Headline
          <input name="headline" placeholder="Launch day!" />
        </label>
        <label>
          Deck URL
          <input name="deck" placeholder="https://" />
        </label>
        <button type="submit">Publish</button>
        <StatusBanner />
      </form>
      <RenderCounter label="Newsroom" color="#48dbfb" />
    </ExampleLayout>
  )
}
