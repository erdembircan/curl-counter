export type RepState = 'extended' | 'curling' | 'curled' | 'extending'

// Hysteresis thresholds in degrees — wider band prevents jitter double-counting
const EXTENDED_ENTER = 155
const CURLING_ENTER = 140
const CURLED_ENTER = 60
const EXTENDING_ENTER = 80

export type RepMachineResult = {
  state: RepState
  repCount: number
  repIncremented: boolean
}

export function initialRepState(angle: number): RepState {
  return angle > 120 ? 'extended' : 'curled'
}

export function stepRepMachine(
  state: RepState,
  repCount: number,
  angle: number,
): RepMachineResult {
  let nextState = state
  let repIncremented = false

  switch (state) {
    case 'extended':
      if (angle < CURLING_ENTER) nextState = 'curling'
      break
    case 'curling':
      if (angle < CURLED_ENTER) nextState = 'curled'
      else if (angle > EXTENDED_ENTER) nextState = 'extended' // aborted curl
      break
    case 'curled':
      if (angle > EXTENDING_ENTER) nextState = 'extending'
      break
    case 'extending':
      if (angle > EXTENDED_ENTER) {
        nextState = 'extended'
        repIncremented = true
      } else if (angle < CURLED_ENTER) {
        nextState = 'curled' // dropped back before completing
      }
      break
  }

  return {
    state: nextState,
    repCount: repIncremented ? repCount + 1 : repCount,
    repIncremented,
  }
}
