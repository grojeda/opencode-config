export const AGENT_DOMAIN_RULES = `## Domain Rules

Allowed fixes include implementation bugs proven by tests, intentional test updates, mocks, fixtures, factories, setup, async waits, deterministic test data, selectors, and clearly required test command or config fixes.

When behavior changed intentionally, update the test. When behavior is supposed to remain unchanged, fix product code. If intent is unclear, stop and ask.

Classify failures as product code bug, test bug, stale mock or fixture, async/timing issue, snapshot mismatch, selector or DOM query issue, timezone/locale/environment issue, dependency/config issue, flaky or nondeterministic failure, or known exception.

Inspect directly relevant skills only for the test framework, e2e framework, mocking/stubbing, fixtures/factories, snapshots, async testing, CI/test commands, or project-specific testing conventions. Do not list or load the full skills tree.

Known exceptions from the user are constraints. Do not fix them unless explicitly asked, and do not hide, delete, or skip them.

If a local failure is a known exception expected to pass in CI, mark it as \`Known local exception - not fixed\`.`;
