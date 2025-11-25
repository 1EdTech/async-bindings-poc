# Edu-API Async Proof of Concept

This repository is a **Proof of Concept (PoC)** for testing a small part of the [Edu-API](https://www.1edtech.org/Edu-API) specification over a proposed asynchronous binding using gRPC. The goal is to explore and validate async streaming patterns for Edu-API data exchange between a Producer (mock-sis) and various Consumers.

## Project Structure

- `mock-sis/` — **Producer**: A mock implementation of an Edu-API Producer, streaming SIS data over gRPC.
- `consumers/` — **Consumers**: Example clients that connect to the Producer and consume streamed data. Includes:
  - `ts/` — TypeScript/Node.js consumer
  - `python/` — Python async consumer
- `proto/` — Protocol Buffers definitions for the async Edu-API PoC
- `JSONSchemas/` — (If present) JSON Schema definitions

## Terminology
- **Producer**: The source of Edu-API data (here, `mock-sis`).
- **Consumer**: Any client that connects to the Producer to receive streamed Edu-API data.

## Producer

The **Producer** is implemented in the [`mock-sis/`](mock-sis/README.md) directory. It acts as a mock Edu-API Producer, streaming SIS data (Persons and Courses) over gRPC for demonstration and testing purposes.

- See the [mock-sis README](mock-sis/README.md) for setup, build, and run instructions.

## Consumers

Consumers are example clients that connect to the Producer and demonstrate how to receive and process streamed Edu-API data using gRPC. Each consumer has its own README with setup and run instructions:

- [TypeScript Consumer](consumers/ts/README.md)
- [Python Async Consumer](consumers/python/README.md)

See the respective README in each directory for details on installation, running, and regenerating gRPC code.

---

For more about Edu-API, see the [1EdTech Edu-API page](https://www.1edtech.org/standards/edu-api).
