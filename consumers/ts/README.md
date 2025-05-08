# TypeScript EduAPI Consumer

This directory contains a TypeScript/Node.js example **Consumer** for the EduAPI Async Proof of Concept. It connects to the Producer (mock-sis) over gRPC and demonstrates how to receive and process streamed Person and Course events.

## Purpose
- Connects to the EduAPI Producer (mock-sis) via gRPC
- Receives real-time Person and Course events
- Logs received events and displays running counts
- Demonstrates async streaming patterns for EduAPI

## Prerequisites
- Node.js (v18+ recommended)
- The Producer (mock-sis) running at `localhost:50051`

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Generate gRPC code from proto:**
   ```sh
   npm run proto:generate
   ```
   This uses the proto file in the root `proto/` directory to generate TypeScript gRPC client code in `src/generated/`.

## Running the Consumer

```sh
npm run dev
```

- The consumer will connect to the Producer at `localhost:50051` by default.
- It will log received Person and Course events and display running counts.

## Notes
- You can run multiple consumers simultaneously to simulate multiple clients.
- The consumer is for demonstration and development purposes only; all data is kept in memory.

---

For more about the project, see the [main README](../../README.md). 