import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "prompt-agent",
  "description": "Help refine, debug, critique, and improve OpenCode agent prompts, commands, workflows, handoffs, and multi-agent orchestration rules without modifying files unless explicitly asked.",
  "mode": "all",
  "temperature": 0.2,
  "permission": {
    "read": "allow",
    "edit": "allow",
    "bash": "allow",
    "question": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
