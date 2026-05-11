type Props = {
  count: number
  onReset: () => void
}

export function RepCounter({ count, onReset }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 py-8">
      <div
        key={count}
        className="count-flash font-display text-[9rem] md:text-[12rem] leading-none tabular-nums text-[#f0ebe0]"
      >
        {String(count).padStart(2, '0')}
      </div>
      <div className="font-mono text-[0.55rem] tracking-[0.5em] text-[#6e6b60] uppercase">
        Reps
      </div>
      <button
        onClick={onReset}
        className="mt-4 font-mono text-[0.6rem] text-[#6e6b60] hover:text-[#908c80] uppercase tracking-[0.3em] transition-colors"
      >
        Reset
      </button>
    </div>
  )
}
