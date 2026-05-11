// Stub for @mediapipe/pose — only needed if using the BlazePose/MediaPipe backend.
// We use MoveNet (TF.js backend), so this is never called at runtime.
export class Pose {
  constructor() {}
  setOptions() {}
  onResults() {}
  async send(): Promise<void> {}
  close() {}
}
