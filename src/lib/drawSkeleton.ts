import type { Pose } from '@tensorflow-models/pose-detection'
import type { ArmSide } from './keypoints'
import { SKELETON_CONNECTIONS, getArmTriplet } from './keypoints'

const CONFIDENCE_MIN = 0.3
const JOINT_RADIUS = 4
const ACTIVE_JOINT_RADIUS = 7

export function drawSkeleton(
  ctx: CanvasRenderingContext2D,
  pose: Pose | null,
  activeArm: ArmSide,
): void {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  if (!pose) return

  const kps = pose.keypoints
  const { shoulder, elbow, wrist } = getArmTriplet(activeArm)
  const activeSet = new Set([shoulder, elbow, wrist])

  for (const [i, j] of SKELETON_CONNECTIONS) {
    const a = kps[i]
    const b = kps[j]
    if (!a || !b) continue
    if ((a.score ?? 0) < CONFIDENCE_MIN || (b.score ?? 0) < CONFIDENCE_MIN) continue
    const isActive = activeSet.has(i) || activeSet.has(j)
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.strokeStyle = isActive ? '#f59e0b' : 'rgba(255,255,255,0.25)'
    ctx.lineWidth = isActive ? 3 : 2
    ctx.stroke()
  }

  for (let i = 0; i < kps.length; i++) {
    const kp = kps[i]
    if (!kp || (kp.score ?? 0) < CONFIDENCE_MIN) continue
    const isActive = activeSet.has(i)
    ctx.beginPath()
    ctx.arc(kp.x, kp.y, isActive ? ACTIVE_JOINT_RADIUS : JOINT_RADIUS, 0, Math.PI * 2)
    ctx.fillStyle = isActive ? '#f59e0b' : 'rgba(255,255,255,0.6)'
    ctx.fill()
  }
}
