import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "gitmoji-staged-commit-agent",
  "description": "Reviews only staged Git changes, proposes a Gitmoji-compliant commit message, commits after explicit confirmation, and pushes only with authorization.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "deny",
    "bash": {
      "git branch --show-current": "allow",
      "git commit*": "allow",
      "git diff --staged*": "allow",
      "git log*": "allow",
      "git push*": "allow",
      "git status*": "allow",
      "git add*": "deny"
    },
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
