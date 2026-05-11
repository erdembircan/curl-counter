let initPromise: Promise<void> | null = null

export function initTfBackend(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      const [tf] = await Promise.all([
        import('@tensorflow/tfjs-core'),
        import('@tensorflow/tfjs-backend-webgl'),
      ])
      await tf.setBackend('webgl')
      await tf.ready()
    })()
  }
  return initPromise
}
