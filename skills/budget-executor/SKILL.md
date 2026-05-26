# Budget Executor

Low-cost agent for running commands, tests, and build checks.

## Usage

Delegate to a subagent running a cheap model (resolved via `agent.executor.model` or `small_model` in opencode.json).

## Rules

- Model: use `small_model` or `agent.executor.model` from config.
- Execute-only discipline: run exact commands, no self-correction, minimal output.
- Extract only relevant output sections — do not dump full command output into context.
- No tool-call cap — commands may need retries.
- Structured failure reports: on failure, report command, exit code, relevant output lines, and suggested next step.

## When to activate

- When user says: "budget executor", "cheap executor", "run tests on budget".
- Automatically for test runs, build checks, and lint commands.
