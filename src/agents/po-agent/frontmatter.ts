import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "po-agent",
  "description": "Product Owner agent that helps you understand the application, what to work on next, open questions, risks, and priorities based on codebase evidence.",
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
