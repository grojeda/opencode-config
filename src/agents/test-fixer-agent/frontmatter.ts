import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "test-fixer-agent",
  "description": "Diagnose and fix failing unit, integration, and e2e tests with minimal changes while preserving intended behavior.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "allow",
    "bash": "allow",
    "task": {
      "*": "deny",
      "research-agent": "allow"
    },
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
