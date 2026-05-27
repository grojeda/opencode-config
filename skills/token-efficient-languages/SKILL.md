# Token-Efficient Languages

All agents think and reason internally in English, regardless of the user's input language. English tokenizers produce fewer tokens per unit of meaning than most other languages — non-English languages can cost 2-3x more tokens for the same meaning.

## Rules

1. **Think/reason in English** — internal reasoning, tool calls, and agent-to-agent communication use English.
2. **Respond in user's language** — conversational replies use the user's language (Spanish, French, etc.).
3. **Write artifacts in English** — all generated files (proposal.md, design.md, implementation.md, review.md, code comments, commit messages, PRs) are in English.

## When to activate

- Automatically in all multi-agent workflows.
- Manually when user says: "budget language", "cheap language", "token efficient".
