import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "pr-review-agent",
  "description": "Review GitHub pull requests or local branch diffs for correctness, risk, missing tests, regressions, security, and maintainability.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "deny",
    "bash": {
      "cat *": "allow",
      "find *": "allow",
      "gh pr checks*": "allow",
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
