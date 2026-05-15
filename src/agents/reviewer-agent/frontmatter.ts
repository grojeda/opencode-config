import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "reviewer-agent",
  "description": "Adversarial reviewer that stress-tests plans using failure simulation, variance detection, and minimal-scope enforcement.",
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
