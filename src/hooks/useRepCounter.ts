import { useCallback, useRef, useState } from 'react'
import type { Pose } from '@tensorflow-models/pose-detection'
import { angleAtVertex } from '../lib/angle'
import { getArmTriplet } from '../lib/keypoints'
import type { ArmSide } from '../lib/keypoints'
import { stepRepMachine, initialRepState } from '../lib/repMachine'
import type { RepState } from '../lib/repMachine'
import { useSpeech } from './useSpeech'

const MIN_CONFIDENCE = 0.3

export function useRepCounter(activeArm: ArmSide) {
  const [repCount, setRepCount] = useState(0)
  const countRef = useRef(0)
  const stateRef = useRef<RepState | null>(null)
  // Detect arm switches lazily on the next pose frame — avoids setState-in-effect
  const armRef = useRef(activeArm)
  const speak = useSpeech()

  const handlePose = useCallback(
    (pose: Pose) => {
      // Reset on arm switch; detected on the first pose frame after the change
      if (armRef.current !== activeArm) {
        armRef.current = activeArm
        countRef.current = 0
        stateRef.current = null
        setRepCount(0)
        return
      }

      const kps = pose.keypoints
      const triplet = getArmTriplet(activeArm)
      const s = kps[triplet.shoulder] as (typeof kps)[number] | undefined
      const e = kps[triplet.elbow] as (typeof kps)[number] | undefined
      const w = kps[triplet.wrist] as (typeof kps)[number] | undefined

      if (
        !s || !e || !w ||
        (s.score ?? 0) < MIN_CONFIDENCE ||
        (e.score ?? 0) < MIN_CONFIDENCE ||
        (w.score ?? 0) < MIN_CONFIDENCE
      ) return

      const angle = angleAtVertex(
        { x: s.x, y: s.y },
        { x: e.x, y: e.y },
        { x: w.x, y: w.y },
      )

      if (stateRef.current === null) {
        stateRef.current = initialRepState(angle)
        return
      }

      const result = stepRepMachine(stateRef.current, countRef.current, angle)
      stateRef.current = result.state

      if (result.repIncremented) {
        countRef.current = result.repCount
        setRepCount(result.repCount)
        speak(String(result.repCount))
      }
    },
    [activeArm, speak],
  )

  const resetCount = useCallback(() => {
    countRef.current = 0
    stateRef.current = null
    setRepCount(0)
  }, [])

  return { repCount, resetCount, handlePose }
}
