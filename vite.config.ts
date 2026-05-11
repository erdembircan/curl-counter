import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: './',
  build: { outDir: 'docs' },
  plugins: [react(), tailwindcss()],
  resolve: {
    // @mediapipe/pose is a CJS closure bundle with no named ESM exports.
    // We only use the MoveNet backend so this import is never called at runtime.
    alias: {
      '@mediapipe/pose': path.resolve('./src/lib/mediapipe-pose-stub.ts'),
    },
  },
  optimizeDeps: {
    include: [
      '@tensorflow/tfjs-core',
      '@tensorflow/tfjs-backend-webgl',
      '@tensorflow/tfjs-converter',
    ],
  },
})
