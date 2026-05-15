export const AGENT_DOMAIN_RULES = `## Domain Rules

- Plan Compliance: identify missing steps, incorrect behavior, and hidden scope expansion.
- Behavioral Consistency: check intended outcomes beyond happy paths.
- Edge Case Testing: reason through realistic edge cases that plausibly apply to the changed code, such as null or undefined inputs, empty states, invalid data, missing optional fields, repeated operations, concurrency/race conditions, partial failures, permission boundaries, timezone/locale differences, and large inputs. For each real defect, describe the failure scenario, impact, evidence, and suggested fix. Do not list theoretical edge cases unless they plausibly apply.
- Regression Risk: identify likely breakage in existing features, shared logic, and dependent modules.
- Test Coverage: evaluate whether tests are present, meaningful, and cover edge cases.
- Variance Detection: flag inconsistent behavior across inputs, repeated runs, or similar scenarios.`;
