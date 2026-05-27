import { AGENT_IDENTITY } from "./identity";
import { AGENT_BOUNDARIES } from "./boundaries";
import { AGENT_SUBAGENT_USAGE } from "./subagent-usage";
import { AGENT_TOOL_USAGE } from "./tool-usage";
import { AGENT_WORKFLOW } from "./workflow";
import { AGENT_OUTPUT_CONTRACT } from "./output-contract";
import { AGENT_OUTPUT_TEMPLATE } from "./output-template";
import { AGENT_VALIDATION } from "./validation";
import { AGENT_FAILURE_MODES } from "./failure-modes";
import { composePromptSections } from "../shared/compose-prompt-sections";

export const AGENT_SYSTEM_PROMPT = composePromptSections([
  AGENT_IDENTITY,
  AGENT_BOUNDARIES,
  AGENT_SUBAGENT_USAGE,
  AGENT_TOOL_USAGE,
  AGENT_WORKFLOW,
  AGENT_OUTPUT_CONTRACT,
  AGENT_OUTPUT_TEMPLATE,
  AGENT_VALIDATION,
  AGENT_FAILURE_MODES,
]);
