import { useCallback } from 'react'

export function useSpeech(): (text: string) => void {
  return useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.1
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }, [])
}
