import { useEffect } from 'react'
import type { RefObject } from 'react'
import type { PoseDetector, Pose } from '@tensorflow-models/pose-detection'
import { drawSkeleton } from '../lib/drawSkeleton'
import type { ArmSide } from '../lib/keypoints'

const INFER_INTERVAL_MS = 1000 / 25 // ~25 fps inference

type Props = {
  videoRef: RefObject<HTMLVideoElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  detectorRef: RefObject<PoseDetector | null>
  activeArm: ArmSide
  onPose: (pose: Pose) => void
  enabled: boolean
}

export function usePoseLoop({ videoRef, canvasRef, detectorRef, activeArm, onPose, enabled }: Props) {
  useEffect(() => {
    if (!enabled) return

    let rafId: number
    let lastInferAt = 0
    let lastPose: Pose | null = null

    function tick(now: number) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const detector = detectorRef.current

      if (video && canvas) {
        if (video.videoWidth > 0 && canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
        }

        if (detector && video.readyState >= 2 && now - lastInferAt >= INFER_INTERVAL_MS) {
          lastInferAt = now
          detector
            .estimatePoses(video)
            .then(poses => {
              const pose = poses[0]
              lastPose = pose ?? null
              if (pose) onPose(pose)
            })
            .catch(() => { /* skip failed frames */ })
        }

        const ctx = canvas.getContext('2d')
        if (ctx) drawSkeleton(ctx, lastPose, activeArm)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [enabled, activeArm, onPose, videoRef, canvasRef, detectorRef])
}
