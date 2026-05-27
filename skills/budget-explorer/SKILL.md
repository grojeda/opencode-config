# Budget Explorer

Low-cost agent for research, exploration, and doc-lookup tasks.

## Usage

Delegate to a subagent running a cost-effective model (resolved via `agent.explore.model` or `small_model` in opencode.json).

## Rules

- Model: use `small_model` or `agent.explore.model` from config.
- Tool cap: ≤30 tool calls per spawn.
- Output contract: return exact fields, length cap 500 words, no raw content dumps.
- The main agent never calls WebFetch directly — all external doc lookups go through the budget explorer.
- Caps: ≤8 research-subagent invocations per audit; ≤15 main-agent reads + ≤30 main-agent Grep/Glob calls per pass.

## When to activate

- When user says: "budget explorer", "cheap explorer", "research on budget".
- Automatically for doc lookups, dependency research, and pattern discovery.
