import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "apply-agent",
  "description": "Executes implementation playbooks step-by-step: writes tests (RED), confirms failure, writes code (GREEN), verifies pass, and commits.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "allow",
    "bash": "allow",
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
