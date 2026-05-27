export type AgentName =
  | "orchestrator-agent"
  | "research-agent"
  | "planning-agent"
  | "reviewer-agent"
  | "implementation-agent"
  | "verifier-agent"
  | "test-fixer-agent"
  | "pr-review-agent"
  | "prompt-agent"
  | "spec-agent"
  | "apply-agent"
  | "po-agent"
  | "technical-product-guide";

export type WorkflowTask =
  | "research"
  | "planning"
  | "implementation"
  | "review"
  | "pr-review"
  | "verification"
  | "test-fix"
  | "orchestration"
  | "prompting"
  | "spec"
  | "apply"
  | "po"
  | "technical-guidance";

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

export type OpenCodePermissionValue = "allow" | "deny";
export type OpenCodePermissionCommandMap = Partial<
  Record<string, OpenCodePermissionValue>
>;

export type OpenCodeMarkdownAgentFrontmatter = {
  name: AgentName;
  description: string;
  mode?: "all" | "primary" | "subagent";
  temperature?: number;
  permission?: {
    read?: OpenCodePermissionValue;
    write?: OpenCodePermissionValue;
    edit?: OpenCodePermissionValue;
    bash?: OpenCodePermissionValue | OpenCodePermissionCommandMap;
    web?: OpenCodePermissionValue;
    websearch?: OpenCodePermissionValue;
    webfetch?: OpenCodePermissionValue;
    question?: OpenCodePermissionValue;
    task?: Partial<Record<AgentName | "*", OpenCodePermissionValue>>;
  };
};

export type AuthoredMarkdownAgent = {
  name: AgentName;
  frontmatter: OpenCodeMarkdownAgentFrontmatter;
  systemPrompt: string;
};
