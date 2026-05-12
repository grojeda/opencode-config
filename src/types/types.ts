export type AgentName =
  | "orchestrator-agent"
  | "research-agent"
  | "planning-agent"
  | "reviewer-agent"
  | "implementation-agent"
  | "verifier-agent"
  | "test-fixer-agent"
  | "pr-review-agent"
  | "prompt-agent";

export type WorkflowTask =
  | "research"
  | "planning"
  | "implementation"
  | "review"
  | "pr-review"
  | "verification"
  | "test-fix"
  | "orchestration"
  | "prompting";

export type ModelConfig = {
  model: string;
  temperature: number;
  variant?: string;
  fallbackModels?: string[];
};

export type AgentPermission =
  | "read"
  | "write"
  | "edit"
  | "bash"
  | "web"
  | "question"
  | "task";

export type AgentConfig = {
  name: AgentName;
  description: string;
  task: WorkflowTask;
  model: ModelConfig;
  permissions: AgentPermission[];
};
