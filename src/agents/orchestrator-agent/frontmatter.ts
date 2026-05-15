import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "orchestrator-agent",
  "description": "Coordinate repository specialists to research, plan, review, implement, verify, and repair work with explicit approval gates and minimal scope.",
  "mode": "primary",
  "temperature": 0.2,
  "permission": {
    "read": "allow",
    "edit": "deny",
    "task": {
      "*": "deny",
      "research-agent": "allow",
      "planning-agent": "allow",
      "reviewer-agent": "allow",
      "implementation-agent": "allow",
      "test-fixer-agent": "allow",
      "verifier-agent": "allow"
    },
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
