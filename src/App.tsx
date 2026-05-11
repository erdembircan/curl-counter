import { useState } from 'react'
import type { ArmSide } from './lib/keypoints'
import { StartGate } from './components/StartGate'
import { Session } from './components/Session'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const [started, setStarted] = useState(false)
  const [arm, setArm] = useState<ArmSide>('right')
  const { theme, toggle } = useTheme()

  if (!started) {
    return (
      <StartGate
        arm={arm}
        onArmChange={setArm}
        onStart={() => setStarted(true)}
        theme={theme}
        onThemeToggle={toggle}
      />
    )
  }

  return (
    <Session
      arm={arm}
      onStop={() => setStarted(false)}
      theme={theme}
      onThemeToggle={toggle}
    />
  )
}
