import type { AgentName, ModelConfig } from "../types/types";
import { agentModelConfig } from "../config/models";

type OpenCodeModelConfig = Omit<ModelConfig, "fallbackModels">;

export type OpenCodeAgentModelConfig = Record<AgentName, OpenCodeModelConfig>;

export function getOpenCodeAgentModelConfig(): OpenCodeAgentModelConfig {
  return Object.fromEntries(
    Object.entries(agentModelConfig).map(([agentName, config]) => {
      const { fallbackModels: _fallbackModels, ...opencodeModelConfig } = config;

      return [agentName, opencodeModelConfig];
    })
  ) as OpenCodeAgentModelConfig;
}

export type OpenCodePartialConfig = {
  agent: OpenCodeAgentModelConfig;
};

export function getOpenCodePartialConfig(): OpenCodePartialConfig {
  return {
    agent: getOpenCodeAgentModelConfig(),
  };
}