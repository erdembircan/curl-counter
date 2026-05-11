import type { ArmSide } from '../lib/keypoints'

type Props = {
  value: ArmSide
  onChange: (arm: ArmSide) => void
}

export function ArmSelector({ value, onChange }: Props) {
  return (
    <div className="flex" style={{ border: '1px solid var(--border)' }}>
      {(['left', 'right'] as ArmSide[]).map((side, i) => (
        <button
          key={side}
          onClick={() => onChange(side)}
          className="flex-1 px-10 py-3 font-mono text-xs tracking-[0.2em] uppercase transition-all"
          style={
            value === side
              ? { background: 'var(--accent)', color: 'var(--accent-on)', fontWeight: 500 }
              : { background: 'transparent', color: 'var(--muted)', borderLeft: i === 1 ? '1px solid var(--border)' : undefined }
          }
          onMouseEnter={e => {
            if (value !== side) {
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.background = 'var(--bg)'
            }
          }}
          onMouseLeave={e => {
            if (value !== side) {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.background = 'transparent'
            }
          }}
        >
          {side}
        </button>
      ))}
    </div>
  )
}
