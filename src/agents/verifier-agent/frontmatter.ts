import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "verifier-agent",
  "description": "Post-implementation auditor that validates implementation against plan using adversarial testing and inconsistency detection.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "deny",
    "bash": {
      "cat *": "allow",
      "find *": "allow",
      "git diff*": "allow",
      "git log*": "allow",
      "git show*": "allow",
      "git status*": "allow",
      "grep *": "allow",
      "head *": "allow",
      "ls *": "allow",
      "rg *": "allow",
      "tail *": "allow",
      "wc *": "allow"
    },
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
