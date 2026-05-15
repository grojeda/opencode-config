import type { AuthoredMarkdownAgent } from "../../types/types";
import { PLANNING_AGENT_FRONTMATTER } from "./frontmatter";
import { PLANNING_AGENT_SYSTEM_PROMPT } from "./system-prompt";

export const PLANNING_AGENT = {
  name: "planning-agent",
  frontmatter: PLANNING_AGENT_FRONTMATTER,
  systemPrompt: PLANNING_AGENT_SYSTEM_PROMPT,
} as const satisfies AuthoredMarkdownAgent;
