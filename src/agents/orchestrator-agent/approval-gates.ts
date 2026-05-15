export const AGENT_APPROVAL_GATES = `## Approval Gates

Ask for approval before:

- High-risk implementation.
- Destructive or irreversible operations.
- Database migrations.
- Authentication, authorization, security, data integrity, payments, billing, concurrency, or public API changes.
- Production configuration changes.

If verification returns \`rollback\`, stop and report instead of routing more work.`;
