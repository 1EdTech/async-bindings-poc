# EduAPI Async Proof of Concept

This repository is a **Proof of Concept (PoC)** for testing a small part of the [Edu-API](https://www.1edtech.org/eduapi) specification over a proposed asynchronous binding using gRPC. The goal is to explore and validate async streaming patterns for EduAPI data exchange between a Producer (mock-sis) and various Consumers.

## Project Structure

- `mock-sis/` — **Producer**: A mock implementation of an EduAPI Producer, streaming SIS data over gRPC.
- `consumers/` — **Consumers**: Example clients that connect to the Producer and consume streamed data. Includes:
  - `ts/` — TypeScript/Node.js consumer
  - `python/` — Python async consumer
- `proto/` — Protocol Buffers definitions for the async EduAPI PoC
- `JSONSchemas/` — (If present) JSON Schema definitions

## Terminology
- **Producer**: The source of EduAPI data (here, `mock-sis`).
- **Consumer**: Any client that connects to the Producer to receive streamed EduAPI data.

## Producer

The **Producer** is implemented in the [`mock-sis/`](mock-sis/README.md) directory. It acts as a mock EduAPI Producer, streaming SIS data (Persons and Courses) over gRPC for demonstration and testing purposes.

- See the [mock-sis README](mock-sis/README.md) for setup, build, and run instructions.

## Consumers

Consumers are example clients that connect to the Producer and demonstrate how to receive and process streamed EduAPI data using gRPC. Each consumer has its own README with setup and run instructions:

- [TypeScript Consumer](consumers/ts/README.md)
- [Python Async Consumer](consumers/python/README.md)

See the respective README in each directory for details on installation, running, and regenerating gRPC code.

---

For more about EduAPI, see the [1EdTech EduAPI page](https://www.1edtech.org/standards/edu-api).
