# curl-counter

An experiment in running real-time ML inference entirely in the browser. No backend, no data sent anywhere — just a webcam and a neural network running on your GPU via WebGL.

## What it does

Points your webcam at yourself, detects your skeleton using MoveNet, and counts bicep curl reps by tracking the angle at your elbow through each full extension and contraction cycle.

## Why it exists

Most fitness tracking tools either require native apps or send video to a server. This explores whether pose-based rep counting is viable as a pure client-side experience — acceptable latency, no privacy tradeoff, works in a tab.

## Stack

- **MoveNet Lightning** (via `@tensorflow-models/pose-detection`) — single-pose model, fast enough for real-time feedback at ~25 fps
- **TensorFlow.js + WebGL backend** — runs inference on the GPU in-browser, lazy-loaded so the landing page stays lightweight
- **React + Vite + Tailwind CSS v4**

## Development

```sh
npm install
npm run dev
```

Tests and linting:

```sh
npm test
npm run lint
```

## Author

Erdem Bircan
