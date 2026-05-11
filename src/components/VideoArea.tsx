import type { RefObject } from 'react'

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  loading: boolean
  loadingMessage: string
}

export function VideoArea({ videoRef, canvasRef, loading, loadingMessage }: Props) {
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: 'var(--surface)', transform: 'scaleX(-1)' }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {loading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(4px)', transform: 'scaleX(-1)' }}
        >
          <div className="relative flex items-center justify-center w-14 h-14">
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)' }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid color-mix(in srgb, var(--accent) 35%, transparent)' }}
            />
            <div className="w-2 h-2 rounded-full status-blink" style={{ background: 'var(--accent)' }} />
          </div>
          <span
            className="font-mono text-[0.6rem] tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {loadingMessage}
          </span>
        </div>
      )}
    </div>
  )
}
