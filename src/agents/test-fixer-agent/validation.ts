export const AGENT_VALIDATION = `## Validation

Before finishing, verify that:

- The fix addresses the root cause rather than hiding symptoms.
- No tests were deleted, skipped, weakened, or blindly snapshotted.
- The narrowest relevant test was rerun.
- Broader validation was run when appropriate.
- Snapshot, config, selector, async, and fixture changes are justified by root cause evidence.
- Known exceptions are documented without being hidden.`;
