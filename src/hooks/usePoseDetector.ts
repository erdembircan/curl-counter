import { useEffect, useRef, useState } from 'react'
import type { PoseDetector } from '@tensorflow-models/pose-detection'
import { initTfBackend } from '../lib/tfBackend'

export type DetectorStatus = 'loading' | 'ready' | 'error'

export function usePoseDetector() {
  const detectorRef = useRef<PoseDetector | null>(null)
  const [status, setStatus] = useState<DetectorStatus>('loading')

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        await initTfBackend()
        const poseDetection = await import('@tensorflow-models/pose-detection')
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          {
            modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
            enableSmoothing: true,
          },
        )
        if (cancelled) {
          detector.dispose()
          return
        }
        detectorRef.current = detector
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      detectorRef.current?.dispose()
      detectorRef.current = null
    }
  }, [])

  return { detectorRef, status }
}
