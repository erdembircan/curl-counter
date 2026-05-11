import { useRef } from 'react'
import type { ArmSide } from '../lib/keypoints'
import { useWebcam } from '../hooks/useWebcam'
import { usePoseDetector } from '../hooks/usePoseDetector'
import { usePoseLoop } from '../hooks/usePoseLoop'
import { useRepCounter } from '../hooks/useRepCounter'
import { VideoArea } from './VideoArea'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  arm: ArmSide
  onStop: () => void
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export function Session({ arm, onStop, theme, onThemeToggle }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { videoRef, status: camStatus, error: camError } = useWebcam()
  const { detectorRef, status: detectorStatus } = usePoseDetector()
  const { repCount, resetCount, handlePose } = useRepCounter(arm)

  const enabled = camStatus === 'ready' && detectorStatus === 'ready'
  usePoseLoop({ videoRef, canvasRef, detectorRef, activeArm: arm, onPose: handlePose, enabled })

  const loadingMessage =
    camStatus === 'error'
      ? `Camera error: ${camError ?? 'unknown'}`
      : detectorStatus === 'error'
        ? 'Model failed to load'
        : detectorStatus === 'loading'
          ? 'Loading MoveNet…'
          : 'Starting camera…'

  const ticksFilled = repCount > 0 && repCount % 10 === 0 ? 10 : repCount % 10
  const sets = Math.floor(repCount / 10)

  return (
    <div
      className="h-[100dvh] flex flex-col lg:flex-row overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Video panel */}
      <div className="w-full aspect-video lg:aspect-auto lg:flex-1 relative" style={{ background: 'var(--surface)' }}>
        <VideoArea
          videoRef={videoRef}
          canvasRef={canvasRef}
          loading={!enabled}
          loadingMessage={loadingMessage}
        />
      </div>

      {/* Stats sidebar */}
      <div
        className="flex-1 lg:flex-none lg:w-80 xl:w-96 flex flex-col overflow-y-auto border-t lg:border-t-0 lg:border-l"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <span className="font-display text-base tracking-widest" style={{ color: 'var(--accent)' }}>
            CURL COUNTER
          </span>
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <button
              onClick={onStop}
              className="font-mono text-[0.6rem] uppercase tracking-[0.3em] transition-colors"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--muted-hover)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              ✕ End
            </button>
          </div>
        </div>

        {/* Main stats */}
        <div className="flex-1 flex flex-col justify-center px-7 py-6 gap-6">

          <div>
            <div className="font-mono text-[0.52rem] tracking-[0.4em] uppercase mb-1" style={{ color: 'var(--muted)' }}>
              Tracking
            </div>
            <div className="font-display text-2xl tracking-wider uppercase" style={{ color: 'var(--text)' }}>
              {arm} arm
            </div>
          </div>

          <div className="w-8 h-px" style={{ background: 'var(--accent)' }} />

          {/* Rep count */}
          <div>
            <div
              key={repCount}
              className="count-flash font-display leading-none tabular-nums"
              style={{ fontSize: 'clamp(5rem, 10vw, 7.5rem)', color: 'var(--text)' }}
            >
              {String(repCount).padStart(2, '0')}
            </div>
            <div className="font-mono text-[0.52rem] tracking-[0.5em] uppercase mt-2" style={{ color: 'var(--muted)' }}>
              Reps
            </div>
          </div>

          {/* Progress ticks — current set of 10 */}
          <div className="flex gap-1.5">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="h-[3px] flex-1 transition-colors duration-200"
                style={{ background: i < ticksFilled ? 'var(--accent)' : 'var(--border)' }}
              />
            ))}
          </div>

          {sets > 0 && (
            <div className="font-mono text-[0.52rem] tracking-[0.3em] uppercase -mt-3" style={{ color: 'var(--muted)' }}>
              {sets} {sets === 1 ? 'set' : 'sets'} of 10 done
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-7 py-5 border-t" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={resetCount}
            className="w-full py-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] transition-all border"
            style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.borderColor = 'var(--muted)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            Reset counter
          </button>
        </div>

      </div>
    </div>
  )
}
