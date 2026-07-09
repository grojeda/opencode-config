---
name: create-agent
description: >
  Scaffold and register new OpenCode agents in this repository following the modular TypeScript structure.
  Use when creating, scaffolding, adding, or modifying agents under src/agents/.
  Triggers on: "create agent", "new agent", "add agent", "scaffold agent", "create a new agent",
  "nuevo agente", "crear agente", "añadir agente".
---

# Create Agent

This skill scaffolds new agents following the repository's modular TypeScript agent architecture.

## Mandatory Reference

**Read `docs/agent-creation-harness.md` before creating any agent.** It contains the complete specification: file templates, registration points, validation rules, and test invariants. Do not create an agent from memory alone.

## Workflow

### 1. Classify the Agent

Determine the agent type before writing any file:

- **Read-Only**: inspects code, produces analysis. `edit: "deny"`, read-only bash commands.
- **Edit**: implements, fixes, writes content. `edit: "allow"`, `bash: "allow"`.
- **Orchestrator/Delegating**: coordinates via `task` permissions. `task: { "*": "deny", ...allow }`.
- **Guidance/Documentation**: reads code, may edit docs, may delegate research.

### 2. Create the Agent Folder

Create `src/agents/{agent-name}/` with the mandatory files:

- `index.ts` — exports `AGENT` + alias, `satisfies AuthoredMarkdownAgent`
- `frontmatter.ts` — exports `AGENT_FRONTMATTER`, `satisfies OpenCodeMarkdownAgentFrontmatter`
- `identity.ts` — exports `AGENT_IDENTITY`
- `system-prompt.ts` — exports `AGENT_SYSTEM_PROMPT`, composes sections via `composePromptSections`
- `boundaries.ts` — exports `AGENT_BOUNDARIES`
- `workflow.ts` — exports `AGENT_WORKFLOW`
- `output-contract.ts` — exports `AGENT_OUTPUT_CONTRACT`
- `validation.ts` — exports `AGENT_VALIDATION`

Add conditional files based on type (see harness doc section 2):

- `tool-usage.ts` — almost always
- `failure-modes.ts` — most agents
- `domain-rules.ts` — agents with domain-specific rules
- `output-template.ts` — agents with structured output
- `token-compression-policy.ts` — verbose output agents
- `approval-gates.ts` — **only for edit/write agents**
- `subagent-usage.ts` — **only for delegating agents**

Use the `AGENT_*` naming convention for all exported constants. Do not use legacy naming like `PLANNING_AGENT_*`.

### 3. Register in All 6 Places

Every agent must be registered in exactly these 6 files. Missing any one breaks typecheck, config validation, or tests:

1. `src/types/types.ts` — add to `AgentName` union + `WorkflowTask` union
2. `src/config/agents.ts` — add entry to `agents` object
3. `src/config/models.ts` — add model config entry
4. `src/config/routing.ts` — add `taskToAgent` mapping
5. `src/agents/index.ts` — add export line
6. `src/agents/markdown-agents.ts` — import alias + add to `markdownAgents` array

### 4. Generate

```bash
pnpm generate:agents
```

This writes `agents/{agent-name}.md` from the TypeScript source.

### 5. Validate

```bash
pnpm check
```

This runs typecheck, config validation, and all tests. All must pass. The structural test (`agent-structure.test.ts`) validates that mandatory files exist, naming conventions are followed, and folder names match agent names.

### 6. Commit

Commit both TypeScript source and generated Markdown:

```bash
git add src/agents/{agent-name}/ src/types/types.ts src/config/agents.ts src/config/models.ts src/config/routing.ts src/agents/index.ts src/agents/markdown-agents.ts agents/{agent-name}.md
```

## Critical Rules

- **TypeScript is the source of truth.** Never edit `agents/*.md` by hand.
- **All 6 registration points are mandatory.** No exceptions.
- **System prompt must be > 500 characters.** Enforced by test.
- **At least one of Output Contract or Output Template must be present.** Enforced by test.
- **Read-only agents must have `edit: "deny"`.** Enforced by test.
- **Use `as const satisfies` on AGENT object and frontmatter.** Required for type safety.
- **The task string must be identical across `types.ts`, `agents.ts`, and `routing.ts`.** Validated by `validate-config.ts`.

## Reference

- Full specification: `docs/agent-creation-harness.md`
- Section templates: harness doc section 3
- Test invariants: harness doc section 7
- Existing agent examples: `src/agents/verifier-agent/` (read-only), `src/agents/implementation-agent/` (edit), `src/agents/orchestrator-agent/` (delegating)
