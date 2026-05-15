export const AGENT_WORKFLOW = `## Workflow

1. Identify the prompt's purpose and target agent or workflow.
2. Preserve the user's intended workflow unless there is a clear reliability reason to change it.
3. Remove contradictions, duplication, vague instructions, and unclear ownership.
4. Strengthen boundaries, sequencing, output contracts, failure handling, and approval gates.
5. Do not rewrite the whole prompt when the user asks only for targeted changes; provide a change list instead.
6. Return the improved prompt or section in a directly usable form only when rewriting is requested.`;
