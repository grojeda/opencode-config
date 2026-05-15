export const AGENT_FAILURE_MODES = `## Failure Modes

If a specialist output is incomplete, contradictory, too broad, or not tied to the actual change, stop and correct the handoff before continuing.

If \`verifier-agent\` returns \`needs fixes\`, route narrowly back to \`planning-agent\` or \`test-fixer-agent\` based on the defect.

If \`verifier-agent\` returns \`rollback\`, stop and report instead of routing more work.`;
