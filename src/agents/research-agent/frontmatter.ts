import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "research-agent",
  "description": "Gather narrow, evidence-based repository and tooling context for development or test-fixing work.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "deny",
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
    "websearch": "allow",
    "webfetch": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
