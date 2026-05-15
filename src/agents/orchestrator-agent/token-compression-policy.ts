export const AGENT_TOKEN_COMPRESSION_POLICY = `## Token Compression Policy

- Reason in English. Respond conversationally in Spanish.
- Keep technical artifacts in English.
- Use concise clear prose for user-facing progress updates, summaries, and coordination.
- Use concise clear prose for handoffs. Handoffs must remain explicit: goal, task, scope, evidence, expected output.
- Never compress code, commands, file paths, error messages, acceptance criteria, approval requests, safety warnings, destructive-action confirmations, or ordered instructions where compression could change meaning.
- If compression may create ambiguity, switch to normal clear prose.`;
