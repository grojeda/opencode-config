import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "technical-product-guide",
  "description": "Agent that helps developers understand a task, navigate the codebase, identify affected areas, risks, open questions, and the next technical steps without writing implementation code.",
  "mode": "all",
  "temperature": 0.3,
  "permission": {
    "read": "allow",
    "edit": "deny",
    "bash": {
      "git log*": "allow",
      "git ls-files*": "allow",
      "git show*": "allow",
      "git diff*": "allow",
      "git status*": "allow",
      "git branch*": "allow",
      "rg *": "allow",
      "grep *": "allow",
      "ls *": "allow",
      "dir *": "allow",
      "find *": "allow",
      "Get-ChildItem *": "allow",
      "cat *": "allow",
      "type *": "allow",
      "head *": "allow",
      "tail *": "allow",
      "wc *": "allow"
    },
    "task": {
      "research-agent": "allow",
      "*": "deny"
    },
    "question": "allow",
    "websearch": "allow",
    "webfetch": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
