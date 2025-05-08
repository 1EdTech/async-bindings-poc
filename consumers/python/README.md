# Python Async SIS Consumer

This is an **async Python gRPC consumer** that connects to the SISSync service and listens for Person and Course events, mirroring the TypeScript example in `consumers/ts/src/main.ts`.

## Directory Structure

```
consumers/
  python/
    generated/         # gRPC-generated Python code from proto/eduapi.proto
    main.py            # The async consumer script
    requirements.txt   # Python dependencies
    README.md          # This file
```

## Requirements
- Python 3.11+ (recommended)
- gRPC server running at `localhost:50051` (e.g., mock-sis)

## Setup

1. **Create and activate the virtual environment:**
   ```sh
   python3.11 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

3. **(Re)generate gRPC code** (if `proto/eduapi.proto` changes):
   ```sh
   python3 -m grpc_tools.protoc -I ../../proto --python_out=generated --grpc_python_out=generated ../../proto/eduapi.proto
   ```
   
   **Fix import issue in generated code:**
   After regenerating, you may need to fix the import in `generated/eduapi_pb2_grpc.py` to avoid `ModuleNotFoundError`. Run:
   ```sh
   sed -i '' 's/^import eduapi_pb2 as eduapi__pb2$/from . import eduapi_pb2 as eduapi__pb2/' consumers/python/generated/eduapi_pb2_grpc.py
   ```
   Ensure `generated/__init__.py` exists:
   ```sh
   touch consumers/python/generated/__init__.py
   ```

## Running the Consumer

Make sure your gRPC server is running at `localhost:50051`.

```sh
python3 main.py
```

- The consumer will concurrently listen for both Person and Course events.
- It logs received events and displays running counts.
- Handles stream resets as well.

---

**Note:**
- If you change the proto file, always regenerate the gRPC code as shown above.
- This consumer is fully async and uses `grpc.aio` for non-blocking streaming.
- For questions or issues, check your Python version and ensure all dependencies are installed in your virtual environment. 