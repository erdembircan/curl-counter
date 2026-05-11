export type Point = { x: number; y: number }

export function angleAtVertex(a: Point, b: Point, c: Point): number {
  const bax = a.x - b.x
  const bay = a.y - b.y
  const bcx = c.x - b.x
  const bcy = c.y - b.y
  const dot = bax * bcx + bay * bcy
  const magBa = Math.hypot(bax, bay)
  const magBc = Math.hypot(bcx, bcy)
  if (magBa === 0 || magBc === 0) return 0
  const cos = Math.max(-1, Math.min(1, dot / (magBa * magBc)))
  return (Math.acos(cos) * 180) / Math.PI
}
