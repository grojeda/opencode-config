import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const PLANNING_AGENT_FRONTMATTER = {
  name: "planning-agent",
  description:
    "Create structured, testable, implementation-ready development plans for features, optimized for single-PR execution.",
  mode: "all",
  temperature: 0.2,
  permission: {
    read: "allow",
    edit: "allow",
    bash: "allow",
    task: {
      "*": "deny",
      "research-agent": "allow",
    },
    question: "allow",
  },
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
