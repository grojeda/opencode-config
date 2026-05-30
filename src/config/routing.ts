import type { AgentName, WorkflowTask } from "../types/types";

export const taskToAgent = {
  implementation: "implementation-agent",
  orchestration: "orchestrator-agent",
  planning: "planning-agent",
  "pr-review": "pr-review-agent",
  prompting: "prompt-agent",
  research: "research-agent",
  review: "reviewer-agent",
  "test-fix": "test-fixer-agent",
  verification: "verifier-agent",
  spec: "spec-agent",
  apply: "apply-agent",
  "technical-guidance": "technical-product-guide",
  "gitmoji-commit": "gitmoji-staged-commit-agent",
  "readme-creation": "readme-architect",
} satisfies Record<WorkflowTask, AgentName>;
