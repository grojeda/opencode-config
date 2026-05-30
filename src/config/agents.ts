import type { AgentConfig, AgentName } from "../types/types";
import { agentModelConfig } from "./models";

export const agents = {
  "orchestrator-agent": {
    name: "orchestrator-agent",
    description: "Coordinates the overall workflow and delegates work to specialized agents.",
    task: "orchestration",
    model: agentModelConfig["orchestrator-agent"],
    permissions: ["read", "task", "question"],
  },

  "research-agent": {
    name: "research-agent",
    description: "Investigates code, documentation, issues, and technical context before implementation.",
    task: "research",
    model: agentModelConfig["research-agent"],
    permissions: ["read", "web", "question"],
  },

  "planning-agent": {
    name: "planning-agent",
    description: "Creates implementation plans, migration steps, and technical breakdowns.",
    task: "planning",
    model: agentModelConfig["planning-agent"],
    permissions: ["read", "question"],
  },

  "reviewer-agent": {
    name: "reviewer-agent",
    description: "Reviews code quality, architecture, maintainability, and risk.",
    task: "review",
    model: agentModelConfig["reviewer-agent"],
    permissions: ["read"],
  },

  "pr-review-agent": {
    name: "pr-review-agent",
    description: "Reviews pull requests and provides focused feedback on changed files.",
    task: "pr-review",
    model: agentModelConfig["pr-review-agent"],
    permissions: ["read"],
  },

  "implementation-agent": {
    name: "implementation-agent",
    description: "Implements code changes based on an approved plan.",
    task: "implementation",
    model: agentModelConfig["implementation-agent"],
    permissions: ["read", "write", "edit", "bash", "question"],
  },

  "test-fixer-agent": {
    name: "test-fixer-agent",
    description: "Diagnoses failing tests and applies focused fixes.",
    task: "test-fix",
    model: agentModelConfig["test-fixer-agent"],
    permissions: ["read", "write", "edit", "bash", "question"],
  },

  "verifier-agent": {
    name: "verifier-agent",
    description: "Runs verification steps, checks results, and confirms whether the work is complete.",
    task: "verification",
    model: agentModelConfig["verifier-agent"],
    permissions: ["read", "bash", "question"],
  },

  "prompt-agent": {
    name: "prompt-agent",
    description: "Creates and improves prompts, documentation, and agent instructions.",
    task: "prompting",
    model: agentModelConfig["prompt-agent"],
    permissions: ["read", "write", "edit", "question"],
  },

  "spec-agent": {
    name: "spec-agent",
    description: "Turns feature descriptions into spec-first change artifacts: proposal.md and capability specs with acceptance criteria.",
    task: "spec",
    model: agentModelConfig["spec-agent"],
    permissions: ["read", "edit", "question"],
  },

  "apply-agent": {
    name: "apply-agent",
    description: "Executes implementation playbooks step-by-step: RED→GREEN, verify, commit.",
    task: "apply",
    model: agentModelConfig["apply-agent"],
    permissions: ["read", "write", "edit", "bash", "question"],
  },

  "technical-product-guide": {
    name: "technical-product-guide",
    description: "Agent that helps developers understand a task, navigate the codebase, identify affected areas, risks, open questions, and the next technical steps without writing implementation code.",
    task: "technical-guidance",
    model: agentModelConfig["technical-product-guide"],
    permissions: ["read", "question", "task"],
  },

  "readme-architect": {
    name: "readme-architect",
    description: "Creates, improves, and maintains professional README.md files for software projects.",
    task: "readme-creation",
    model: agentModelConfig["readme-architect"],
    permissions: ["read", "edit", "web", "question", "task"],
  },
} satisfies Record<AgentName, AgentConfig>;