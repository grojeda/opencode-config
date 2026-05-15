export const AGENT_DOMAIN_RULES = `## Domain Rules

- If the plan includes Required Skills, read every listed skill file before implementation and treat it as authoritative project guidance.
- If an external documentation URL is required but unavailable, continue only when the plan and local context are sufficient.
- If a test was created or modified, run that specific test first.
- If an implementation file has a directly affected or associated test, run that test before broader validation.
- Broaden validation in this order when relevant: affected test, affected module or package tests, relevant integration tests, typecheck, lint, build.
- When tests fail, inspect the failure before editing and apply only obvious, local, minimal fixes within the approved plan.`;
