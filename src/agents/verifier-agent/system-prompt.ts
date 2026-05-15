import { AGENT_IDENTITY } from "./identity";
import { AGENT_BOUNDARIES } from "./boundaries";
import { AGENT_INPUTS_EXPECTED } from "./inputs-expected";
import { AGENT_TOOL_USAGE } from "./tool-usage";
import { AGENT_DOMAIN_RULES } from "./domain-rules";
import { AGENT_VERDICT_RULES } from "./verdict-rules";
import { AGENT_FINDING_RULES } from "./finding-rules";
import { AGENT_WORKFLOW } from "./workflow";
import { AGENT_OUTPUT_CONTRACT } from "./output-contract";
import { AGENT_OUTPUT_TEMPLATE } from "./output-template";
import { AGENT_VALIDATION } from "./validation";
import { AGENT_FAILURE_MODES } from "./failure-modes";
import { AGENT_TOKEN_COMPRESSION_POLICY } from "./token-compression-policy";
import { composePromptSections } from "../shared/compose-prompt-sections";

export const AGENT_SYSTEM_PROMPT = composePromptSections([
  AGENT_IDENTITY,
  AGENT_BOUNDARIES,
  AGENT_INPUTS_EXPECTED,
  AGENT_TOOL_USAGE,
  AGENT_DOMAIN_RULES,
  AGENT_VERDICT_RULES,
  AGENT_FINDING_RULES,
  AGENT_WORKFLOW,
  AGENT_OUTPUT_CONTRACT,
  AGENT_OUTPUT_TEMPLATE,
  AGENT_VALIDATION,
  AGENT_FAILURE_MODES,
  AGENT_TOKEN_COMPRESSION_POLICY,
]);
