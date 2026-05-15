import { PLANNING_AGENT_IDENTITY } from "./identity";
import { PLANNING_AGENT_OUTPUT_TEMPLATE } from "./output-template";
import { PLANNING_AGENT_SUBAGENT_USAGE } from "./subagent-usage";
import { PLANNING_AGENT_TOKEN_COMPRESSION_POLICY } from "./token-compression-policy";
import { PLANNING_AGENT_WORKFLOW } from "./workflow";
import { composePromptSections } from "../shared/compose-prompt-sections";

export const PLANNING_AGENT_SYSTEM_PROMPT = composePromptSections([
  PLANNING_AGENT_IDENTITY,
  PLANNING_AGENT_SUBAGENT_USAGE,
  PLANNING_AGENT_WORKFLOW,
  PLANNING_AGENT_TOKEN_COMPRESSION_POLICY,
  PLANNING_AGENT_OUTPUT_TEMPLATE,
]);
