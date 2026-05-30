import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "readme-architect",
  "description": "Expert agent for creating, improving, and maintaining professional README.md files for software projects.",
  "mode": "all",
  "temperature": 0.2,
  "permission": {
    "read": "allow",
    "edit": "allow",
    "bash": {
      "cat *": "allow",
      "dir *": "allow",
      "find *": "allow",
      "Get-ChildItem *": "allow",
      "git log*": "allow",
      "git ls-files*": "allow",
      "git show*": "allow",
      "grep *": "allow",
      "head *": "allow",
      "ls *": "allow",
      "rg *": "allow",
      "tail *": "allow",
      "type *": "allow",
      "wc *": "allow"
    },
    "task": {
      "*": "deny",
      "research-agent": "allow"
    },
    "question": "allow",
    "websearch": "allow",
    "webfetch": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
