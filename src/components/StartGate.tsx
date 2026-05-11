import type { ArmSide } from '../lib/keypoints'
import { ArmSelector } from './ArmSelector'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  arm: ArmSide
  onArmChange: (arm: ArmSide) => void
  onStart: () => void
  theme: 'dark' | 'light'
  onThemeToggle: () => void
}

export function StartGate({ arm, onArmChange, onStart, theme, onThemeToggle }: Props) {
  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row">

      {/* Hero panel */}
      <div
        className="grid-bg flex-1 flex flex-col justify-end p-8 lg:p-14 lg:pb-16 pb-10 relative overflow-hidden min-h-[45vh] lg:min-h-0"
      >
        {/* Ghost "00" decoration */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-display leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(10rem, 28vw, 20rem)',
            color: 'transparent',
            WebkitTextStroke: '2px var(--ghost)',
            lineHeight: 1,
          }}
        >
          00
        </div>

        <div className="relative">
          <div className="font-mono text-[0.6rem] tracking-[0.4em] uppercase mb-5" style={{ color: 'var(--muted)' }}>
            Browser experiment · MoveNet
          </div>
          <div
            className="font-display leading-none tracking-wider"
            style={{ fontSize: 'clamp(4rem, 11vw, 8rem)', color: 'var(--accent)' }}
          >
            CURL
          </div>
          <div
            className="font-display leading-none tracking-wider"
            style={{
              fontSize: 'clamp(4rem, 11vw, 8rem)',
              color: 'transparent',
              WebkitTextStroke: '2px var(--accent)',
            }}
          >
            COUNTER
          </div>
          <p className="mt-6 font-mono text-[0.62rem] leading-relaxed max-w-sm tracking-wide" style={{ color: 'var(--muted)' }}>
            Real-time pose detection running entirely in your browser.
            <br />No server. No uploads. Just your webcam.
          </p>
        </div>
      </div>

      {/* Controls panel */}
      <div
        className="lg:w-80 xl:w-96 flex flex-col justify-between p-8 lg:p-10 border-t lg:border-t-0 lg:border-l"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        {/* Top row: theme toggle */}
        <div className="flex justify-end">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>

        {/* Middle: arm + start */}
        <div className="flex flex-col gap-10 py-8 lg:py-0">
          <div>
            <div className="font-mono text-[0.55rem] tracking-[0.4em] uppercase mb-3" style={{ color: 'var(--muted)' }}>
              Tracking arm
            </div>
            <ArmSelector value={arm} onChange={onArmChange} />
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={onStart}
              className="w-full py-4 font-sans font-semibold text-sm tracking-[0.2em] uppercase active:scale-[0.98] transition-all"
              style={{ background: 'var(--accent)', color: 'var(--accent-on)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Start Session →
            </button>
            <p className="font-mono text-[0.55rem] leading-relaxed tracking-wide" style={{ color: 'var(--muted)' }}>
              Camera permission required — keep your full upper body visible, 1–2 m from the lens.
            </p>
          </div>
        </div>

        {/* Bottom: spacer */}
        <div />
      </div>

    </div>
  )
}
