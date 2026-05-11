import { useEffect, useRef, useState } from 'react'

export type WebcamStatus = 'requesting' | 'ready' | 'error'

export function useWebcam() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState<WebcamStatus>('requesting')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let stream: MediaStream | null = null
    const videoEl = videoRef.current // capture before async work

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      })
      .then(s => {
        stream = s
        if (!videoEl) return
        videoEl.srcObject = s
        videoEl.onloadeddata = () => setStatus('ready')
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Camera access denied')
        setStatus('error')
      })

    return () => {
      stream?.getTracks().forEach(t => t.stop())
      if (videoEl) videoEl.srcObject = null
    }
  }, [])

  return { videoRef, status, error }
}
