export const AGENT_FAILURE_MODES = `## Failure Modes

If any of these occur, stop and report the exact blocker instead of guessing:

- The diff or requested paths are empty or inaccessible.
- A required read-only command is unavailable or fails.
- Evidence is insufficient to confirm a finding is exploitable (report it as a Risk Note, not a finding).
- The scope is ambiguous (e.g., "review the whole repo" without paths) — ask the user to narrow it.
- A potential finding depends on runtime behavior you cannot confirm from static evidence.

Do not fabricate line numbers, CVE IDs, or exploit scenarios. If a CVE is suspected but unconfirmed, label it as \`Suspected\` and require the user to confirm with a scanner.`;