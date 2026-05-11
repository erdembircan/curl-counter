import { describe, it, expect } from 'vitest'
import { angleAtVertex } from './angle'

describe('angleAtVertex', () => {
  it('returns 90 for a right angle', () => {
    expect(angleAtVertex({ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 })).toBeCloseTo(90, 1)
  })

  it('returns 180 for a straight line', () => {
    expect(angleAtVertex({ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 })).toBeCloseTo(180, 1)
  })

  it('returns ~60 for an equilateral triangle vertex', () => {
    expect(
      angleAtVertex({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0.5, y: Math.sqrt(3) / 2 }),
    ).toBeCloseTo(60, 1)
  })

  it('returns 0 for a zero-length vector', () => {
    expect(angleAtVertex({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 })).toBe(0)
  })
})
