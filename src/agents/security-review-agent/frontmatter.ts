import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "security-review-agent",
  "description": "Reviews source code, diffs, dependency manifests, and configuration for security vulnerabilities (OWASP/CWE), weak auth, authorization gaps, secret leakage, vulnerable dependencies, and misconfiguration. Read-only.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "deny",
    "bash": {
      "cat *": "allow",
      "find *": "allow",
      "gh pr diff*": "allow",
      "gh pr view*": "allow",
      "git diff*": "allow",
      "git log*": "allow",
      "git merge-base*": "allow",
      "git show*": "allow",
      "git status*": "allow",
      "grep *": "allow",
      "head *": "allow",
      "ls *": "allow",
      "rg *": "allow",
      "tail *": "allow",
      "wc *": "allow",
      "sed *": "allow",
    },
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;