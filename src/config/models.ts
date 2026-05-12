import type { AgentName, ModelConfig } from "../types/types";

export const agentModelConfig = {
  "orchestrator-agent": {
    model: "opencode-go/qwen3.6-plus",
    temperature: 0.1,
    fallbackModels: [],
  },

  "planning-agent": {
    model: "openai/gpt-5.5",
    temperature: 0.1,
    variant: "xhigh",
    fallbackModels: ["opencode-go/glm-5.1"],
  },

  "research-agent": {
    model: "opencode-go/deepseek-v4-flash",
    temperature: 0.1,
    fallbackModels: ["openai/gpt-5.5"],
  },

  "reviewer-agent": {
    model: "opencode-go/glm-5.1",
    temperature: 0.1,
    fallbackModels: ["openai/gpt-5.5"],
  },

  "pr-review-agent": {
    model: "opencode-go/glm-5.1",
    temperature: 0.1,
    fallbackModels: ["openai/gpt-5.5"],
  },

  "implementation-agent": {
    model: "opencode-go/kimi-k2.6",
    temperature: 0.1,
    fallbackModels: ["openai/gpt-5.5"],
  },

  "test-fixer-agent": {
    model: "opencode-go/deepseek-v4-pro",
    temperature: 0.1,
    fallbackModels: ["openai/gpt-5.5"],
  },

  "verifier-agent": {
    model: "openai/gpt-5.5",
    temperature: 0.1,
    variant: "xhigh",
    fallbackModels: ["opencode-go/glm-5.1"],
  },

  "prompt-agent": {
    model: "opencode-go/qwen3.6-plus",
    temperature: 0.2,
    fallbackModels: [],
  },
} satisfies Record<AgentName, ModelConfig>;