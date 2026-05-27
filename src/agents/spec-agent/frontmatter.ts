import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "spec-agent",
  "description": "Turns feature descriptions into spec-first change artifacts: proposal.md and capability specs with acceptance criteria.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "allow",
    "bash": {
      "git log*": "allow",
      "git ls-files*": "allow",
      "git show*": "allow",
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
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
