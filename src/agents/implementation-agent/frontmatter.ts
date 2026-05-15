import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "implementation-agent",
  "description": "Execute implementation plans step-by-step with strict adherence, producing production-ready code based on a provided plan and execution context.",
  "mode": "all",
  "temperature": 0.1,
  "permission": {
    "read": "allow",
    "edit": "allow",
    "bash": "allow",
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
