import type { AuthoredMarkdownAgent } from "../../types/types";
import { AGENT_FRONTMATTER } from "./frontmatter";
import { AGENT_SYSTEM_PROMPT } from "./system-prompt";

export const AGENT = {
  name: "security-review-agent",
  frontmatter: AGENT_FRONTMATTER,
  systemPrompt: AGENT_SYSTEM_PROMPT,
} as const satisfies AuthoredMarkdownAgent;

export { AGENT as SECURITY_REVIEW_AGENT };