import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import ExampleLayout from '../shared/ExampleLayout'
import RenderCounter from '../shared/RenderCounter'

const VideoStub = forwardRef(function VideoStub(props, ref) {
  const [playing, setPlaying] = useState(false)
  useImperativeHandle(ref, () => ({
    play: () => {
      console.log('[useImperativeHandle Parent] play()')
      setPlaying(true)
    },
    pause: () => {
      console.log('[useImperativeHandle Parent] pause()')
      setPlaying(false)
    },
    get playing() {
      return playing
    },
  }), [playing])

  console.log('[useImperativeHandle Parent] child render playing=', playing)

  return (
    <div className="state-debug" style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: 8 }}>
      Mini video stub — <strong>{playing ? 'playing' : 'paused'}</strong>
    </div>
  )
})

export default function ParentControl() {
  const remote = useRef(null)

  return (
    <ExampleLayout
      title="3. Parent orchestrates child media"
      level="advanced"
      analogy="Remote control for the living-room TV — the remote does not solder circuits; it sends simple orders over IR."
      whatToWatch={[
        'play/pause travel through imperative handle',
        'Getter on handle reads derived playing flag — pattern mirrors native media elements',
        'Still pass declarative props for static configuration when possible',
      ]}
    >
      <div className="controls">
        <button type="button" onClick={() => remote.current?.play()}>
          Play
        </button>
        <button type="button" onClick={() => remote.current?.pause()}>
          Pause
        </button>
        <button type="button" className="btn-secondary" onClick={() => console.log('playing?', remote.current?.playing)}>
          Log state
        </button>
      </div>
      <VideoStub ref={remote} />
      <RenderCounter label="Parent" color="#576574" />
    </ExampleLayout>
  )
}
