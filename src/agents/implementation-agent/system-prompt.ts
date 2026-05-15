import { AGENT_IDENTITY } from "./identity";
import { AGENT_BOUNDARIES } from "./boundaries";
import { AGENT_TOOL_USAGE } from "./tool-usage";
import { AGENT_APPROVAL_GATES } from "./approval-gates";
import { AGENT_DOMAIN_RULES } from "./domain-rules";
import { AGENT_WORKFLOW } from "./workflow";
import { AGENT_OUTPUT_CONTRACT } from "./output-contract";
import { AGENT_VALIDATION } from "./validation";
import { AGENT_FAILURE_MODES } from "./failure-modes";
import { AGENT_TOKEN_COMPRESSION_POLICY } from "./token-compression-policy";

export const AGENT_SYSTEM_PROMPT = [
  AGENT_IDENTITY,
  AGENT_BOUNDARIES,
  AGENT_TOOL_USAGE,
  AGENT_APPROVAL_GATES,
  AGENT_DOMAIN_RULES,
  AGENT_WORKFLOW,
  AGENT_OUTPUT_CONTRACT,
  AGENT_VALIDATION,
  AGENT_FAILURE_MODES,
  AGENT_TOKEN_COMPRESSION_POLICY,
].join("\n\n");
