import { describe, it, expect } from 'vitest'
import { stepRepMachine, initialRepState } from './repMachine'
import type { RepState } from './repMachine'

function runSequence(angles: number[]): number {
  if (angles.length === 0) return 0
  let state: RepState = initialRepState(angles[0])
  let count = 0
  for (const angle of angles) {
    const result = stepRepMachine(state, count, angle)
    state = result.state
    count = result.repCount
  }
  return count
}

describe('repMachine', () => {
  it('counts one full curl', () => {
    // extended → curling → curled → extending → extended
    const angles = [165, 160, 135, 110, 55, 40, 65, 90, 120, 160, 165]
    expect(runSequence(angles)).toBe(1)
  })

  it('counts three consecutive reps', () => {
    const angles = [165, 130, 50, 90, 165, 130, 50, 90, 165, 130, 50, 90, 165]
    expect(runSequence(angles)).toBe(3)
  })

  it('does not count an aborted curl that returned before curled threshold', () => {
    // goes to curling (< 140) but bounces back above extended threshold
    const angles = [165, 135, 165]
    expect(runSequence(angles)).toBe(0)
  })

  it('does not count a curl that stalled midway on the way up', () => {
    // reaches curled, starts extending, then drops back to curled before completing
    const angles = [165, 130, 50, 90, 50]
    expect(runSequence(angles)).toBe(0)
  })

  it('initialRepState returns extended for high angle', () => {
    expect(initialRepState(165)).toBe('extended')
  })

  it('initialRepState returns curled for low angle', () => {
    expect(initialRepState(40)).toBe('curled')
  })
})
