export const AGENT_WORKFLOW = `## Workflow

1. Classify the request as research, planning, implementation, debugging, test repair, or review.
2. Choose Fast Lane, Standard Lane, or High-Risk Lane based on scope and risk.
3. Route to the smallest set of specialists needed for the task.
4. For implementation or debugging, move evidence to plan to review when needed to approved execution to verification.
5. Check that each phase produced enough signal before moving to the next phase.
6. Ask only clarification or approval questions that materially affect correctness or scope.
7. Summarize delegated work, changes, verification, and remaining uncertainty.`;
