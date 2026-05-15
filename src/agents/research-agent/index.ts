import type { AuthoredMarkdownAgent } from "../../types/types";
import { AGENT_FRONTMATTER } from "./frontmatter";
import { AGENT_SYSTEM_PROMPT } from "./system-prompt";

export const AGENT = {
  name: "research-agent",
  frontmatter: AGENT_FRONTMATTER,
  systemPrompt: AGENT_SYSTEM_PROMPT,
} as const satisfies AuthoredMarkdownAgent;

export { AGENT as RESEARCH_AGENT };
