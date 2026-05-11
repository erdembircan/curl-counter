export type ArmSide = 'left' | 'right'

export type ArmTriplet = { shoulder: number; elbow: number; wrist: number }

export function getArmTriplet(side: ArmSide): ArmTriplet {
  return side === 'left'
    ? { shoulder: 5, elbow: 7, wrist: 9 }
    : { shoulder: 6, elbow: 8, wrist: 10 }
}

// MoveNet COCO 17 skeleton connections [from, to]
export const SKELETON_CONNECTIONS: readonly [number, number][] = [
  [5, 6],   // shoulders
  [5, 7],   // left upper arm
  [7, 9],   // left lower arm
  [6, 8],   // right upper arm
  [8, 10],  // right lower arm
  [5, 11],  // left torso side
  [6, 12],  // right torso side
  [11, 12], // hips
  [11, 13], // left thigh
  [13, 15], // left shin
  [12, 14], // right thigh
  [14, 16], // right shin
]
