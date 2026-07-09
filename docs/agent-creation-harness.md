# Agent Creation Harness

Reference guide for creating new agents in this repository.
Follow every step in order. Do not skip registration points or validation.

---

## 0. Golden Rules

1. **TypeScript is the source of truth.** Edit files under `src/`. Never edit `agents/*.md` by hand.
2. **`agents/*.md` is generated.** Run `pnpm generate:agents` after any source change.
3. **Every agent is modular.** Each prompt section lives in its own `.ts` file. Sections are composed by `composePromptSections` in `system-prompt.ts`.
4. **Every agent must be registered in 7 places.** Missing any one breaks typecheck, config validation, or tests.
5. **Every agent must pass `pnpm check` before commit.** This runs typecheck, config validation, and all tests.
6. **Use the `AGENT_*` naming convention** for all exported constants (not `PLANNING_AGENT_*`; that is a legacy outlier).

---

## 1. Determine Agent Type First

Before writing any file, classify the agent. This determines which section files are needed and which permissions are allowed.

### Type A: Read-Only Agent
Cannot edit files. Inspects code, produces analysis, reviews, or research.
Examples: `research-agent`, `reviewer-agent`, `pr-review-agent`, `verifier-agent`, `security-review-agent`.

Permissions: `edit: "deny"`, no `write: "allow"`, `bash` limited to read-only commands (or omitted).

### Type B: Edit Agent
Can edit files and run commands. Implements, fixes, or writes content.
Examples: `implementation-agent`, `test-fixer-agent`, `prompt-agent`, `apply-agent`.

Permissions: `edit: "allow"`, `bash: "allow"`, `question: "allow"`.

### Type C: Orchestrator / Delegating Agent
Coordinates other agents via `task` permissions. May or may not edit files directly.
Examples: `orchestrator-agent` (edit deny, task allow), `planning-agent` (edit allow, task allow for research only).

Permissions: `task: { "*": "deny", "<specific-agent>: "allow" }` plus `edit` as appropriate.

### Type D: Guidance / Documentation Agent
Reads code, may edit docs, may delegate research. No code implementation.
Examples: `readme-architect`, `technical-product-guide`, `spec-agent`.

Permissions: `read: "allow"`, `edit` as appropriate, optional `task` for research delegation.

---

## 2. Folder Structure

Create a folder under `src/agents/{agent-name}/` with the following files.

### Mandatory files (every agent, no exceptions)

| File | Export constant | Section header | Purpose |
|---|---|---|---|
| `index.ts` | `AGENT` (+ alias) | n/a | Assembles and exports the agent object |
| `frontmatter.ts` | `AGENT_FRONTMATTER` | n/a | YAML frontmatter: name, description, mode, temperature, permission |
| `identity.ts` | `AGENT_IDENTITY` | none | "You are the **X**." identity statement |
| `system-prompt.ts` | `AGENT_SYSTEM_PROMPT` | n/a | Imports all sections, composes via `composePromptSections` |
| `boundaries.ts` | `AGENT_BOUNDARIES` | `## Boundaries` | What the agent must not do |
| `workflow.ts` | `AGENT_WORKFLOW` | `## Workflow` | Numbered step-by-step procedure |
| `output-contract.ts` | `AGENT_OUTPUT_CONTRACT` | `## Output Contract` | Required output shape and rules |
| `validation.ts` | `AGENT_VALIDATION` | `## Validation` | "Before finishing, verify that:" checklist |

### Conditional files (include based on agent type)

| File | Export constant | Section header | When to include |
|---|---|---|---|
| `tool-usage.ts` | `AGENT_TOOL_USAGE` | `## Tool Usage` | Agent uses tools (almost always; omit only for pure delegation agents like planning) |
| `failure-modes.ts` | `AGENT_FAILURE_MODES` | `## Failure Modes` | Agent has non-trivial failure handling (most agents; omit for simple agents like reviewer) |
| `domain-rules.ts` | `AGENT_DOMAIN_RULES` | `## Domain Rules` | Agent has domain-specific analysis rules (review, verification, implementation, research, security, readme, prompt) |
| `output-template.ts` | `AGENT_OUTPUT_TEMPLATE` | `## Output Template` | Agent has a structured markdown output template (research, verifier, planning, pr-review, prompt, spec, readme, technical-product-guide, apply) |
| `token-compression-policy.ts` | `AGENT_TOKEN_COMPRESSION_POLICY` | `## Token Compression Policy` | Agent produces verbose output that needs compression guidance (verifier, implementation, orchestrator, planning, reviewer, test-fixer, readme) |
| `approval-gates.ts` | `AGENT_APPROVAL_GATES` | `## Approval Gates` | **Only for agents that can edit/write.** Defines when to stop and ask before proceeding. |
| `subagent-usage.ts` | `AGENT_SUBAGENT_USAGE` | `## Subagent Usage` | **Only for agents that delegate to other agents.** Defines which subagents to use, when, and handoff shape. |

### Agent-specific files (rare; only when the domain demands it)

These exist in current agents but are not generic. Create equivalent files only if the agent's domain requires unique rules that don't fit any standard section.

| File | Current example | Purpose |
|---|---|---|
| `inputs-expected.ts` | verifier-agent | Documents what inputs the caller should provide |
| `verdict-rules.ts` | verifier-agent | Defines verdict vocabulary and when to use each |
| `finding-rules.ts` | verifier-agent | Defines evidence requirements for findings |
| `handoff.ts` | orchestrator-agent | Defines handoff contract between specialists |

---

## 3. File Templates

Copy these templates. Replace `{agent-name}`, `{AgentName}`, `{AgentAlias}`, and section content.

### 3.1 `index.ts`

```typescript
import type { AuthoredMarkdownAgent } from "../../types/types";
import { AGENT_FRONTMATTER } from "./frontmatter";
import { AGENT_SYSTEM_PROMPT } from "./system-prompt";

export const AGENT = {
  name: "{agent-name}",
  frontmatter: AGENT_FRONTMATTER,
  systemPrompt: AGENT_SYSTEM_PROMPT,
} as const satisfies AuthoredMarkdownAgent;

export { AGENT as {AgentAlias} };
```

Example: for `security-review-agent`, the alias is `SECURITY_REVIEW_AGENT`.

### 3.2 `frontmatter.ts`

```typescript
import type { OpenCodeMarkdownAgentFrontmatter } from "../../types/types";

export const AGENT_FRONTMATTER = {
  "name": "{agent-name}",
  "description": "{One-line description, more than 20 characters.}",
  "mode": "all",           // "all" | "primary" | "subagent"
  "temperature": 0.1,      // 0.1 for precise agents, 0.2-0.3 for creative agents
  "permission": {
    "read": "allow",
    // For read-only agents:
    "edit": "deny",
    "bash": {
      "cat *": "allow",
      "find *": "allow",
      "git diff*": "allow",
      "git log*": "allow",
      "git show*": "allow",
      "git status*": "allow",
      "grep *": "allow",
      "head *": "allow",
      "ls *": "allow",
      "rg *": "allow",
      "tail *": "allow",
      "wc *": "allow"
    },
    "question": "allow"
    // For edit agents, replace bash with: "bash": "allow", "edit": "allow"
    // For delegating agents, add: "task": { "*": "deny", "research-agent": "allow" }
    // For web research agents, add: "websearch": "allow", "webfetch": "allow"
  }
} as const satisfies OpenCodeMarkdownAgentFrontmatter;
```

**Permission rules by type:**

| Type | read | edit | write | bash | task | web | question |
|---|---|---|---|---|---|---|---|
| Read-only | allow | deny | omit/deny | read-only command map | omit | omit | allow |
| Edit | allow | allow | omit | allow | omit | omit | allow |
| Orchestrator | allow | deny | omit | omit | `{ "*": "deny", ...allow }` | omit | allow |
| Planning | allow | allow | omit | allow | `{ "*": "deny", "research-agent": "allow" }` | omit | allow |
| Research | allow | deny | omit | read-only command map | omit | websearch+webfetch allow | allow |

### 3.3 `identity.ts`

```typescript
export const AGENT_IDENTITY = `You are the **{Role Name}**.

Your role is to {one-sentence purpose}.

You {key behavioral stance or assumption}.

You optimize for {comma-separated priorities}.`;
```

### 3.4 `boundaries.ts`

```typescript
export const AGENT_BOUNDARIES = `## Boundaries

You must not:

- {prohibited action 1}.
- {prohibited action 2}.
- Invent evidence, facts, test results, paths, or command output.
- {prohibited action N}.

You may only {scope of permitted action}.`;
```

### 3.5 `workflow.ts`

```typescript
export const AGENT_WORKFLOW = `## Workflow

1. {first step}.
2. {second step}.
3. {third step}.
4. {fourth step}.
5. {final step with output}.`;
```

### 3.6 `output-contract.ts`

```typescript
export const AGENT_OUTPUT_CONTRACT = `## Output Contract

The final output must:

- {required output property 1}.
- {required output property 2}.
- {required output property N}.
- Exclude vague concerns and unsupported assumptions.`;
```

### 3.7 `output-template.ts` (when needed)

```typescript
export const AGENT_OUTPUT_TEMPLATE = `## Output Template

\`\`\`markdown
{Section 1}: {value}

## {Section 2}
- {item}

## {Section N}
- {item or "None"}
\`\`\``;
```

### 3.8 `validation.ts`

```typescript
export const AGENT_VALIDATION = `## Validation

Before finishing, verify that:

- {checklist item 1}.
- {checklist item 2}.
- {checklist item N}.
- No file edits or Git write operations were performed.`;
```

> The last line about no edits/Git writes is only for read-only agents. For edit agents, replace with relevant validation checks.

### 3.9 `tool-usage.ts` (when needed)

```typescript
export const AGENT_TOOL_USAGE = `## Tool Usage

Use {read-only tools / edit tools} to {purpose}.

Allowed tool use is for {scope}:

- {allowed use 1}.
- {allowed use 2}.

Do not {prohibited use 1}.
Do not {prohibited use 2}.`;
```

### 3.10 `failure-modes.ts` (when needed)

```typescript
export const AGENT_FAILURE_MODES = `## Failure Modes

If {condition 1}:

- {action 1}.
- {action 2}.

If {condition 2}:

- {action 1}.
- {action 2}.`;
```

### 3.11 `domain-rules.ts` (when needed)

```typescript
export const AGENT_DOMAIN_RULES = `## Domain Rules

- {Rule category 1}: {description}.
- {Rule category 2}: {description}.
- {Rule category N}: {description}.`;
```

### 3.12 `approval-gates.ts` (ONLY for edit/write agents)

```typescript
export const AGENT_APPROVAL_GATES = `## Approval Gates

Stop and ask for clarification before:

- {gate 1}.
- {gate 2}.
- Adding dependencies, changing architecture, or expanding scope beyond the approved plan.
- {gate N}.`;
```

### 3.13 `subagent-usage.ts` (ONLY for delegating agents)

```typescript
export const AGENT_SUBAGENT_USAGE = `## Subagent Usage

Use \`{subagent-name}\` when {condition}.

The \`{subagent-name}\` owns:

- {responsibility 1}.
- {responsibility 2}.

The \`{this-agent-name}\` owns:

- {responsibility 1}.
- {responsibility 2}.

If \`{subagent-name}\` is unavailable, {fallback behavior}.`;
```

### 3.14 `token-compression-policy.ts` (when needed)

```typescript
export const AGENT_TOKEN_COMPRESSION_POLICY = `## Token Compression Policy

Use concise clear prose.

Never compress {list of things that must never be compressed: verdicts, evidence, file paths, commands, errors, required fixes, safety warnings, validation results}.`;
```

### 3.15 `system-prompt.ts`

This file imports all sections and composes them. The order matters: identity first, then boundaries, then operational sections, then output sections, then validation/failure, then compression policy last.

```typescript
import { AGENT_IDENTITY } from "./identity";
import { AGENT_BOUNDARIES } from "./boundaries";
import { AGENT_TOOL_USAGE } from "./tool-usage";
import { AGENT_APPROVAL_GATES } from "./approval-gates";       // only for edit agents
import { AGENT_DOMAIN_RULES } from "./domain-rules";
import { AGENT_WORKFLOW } from "./workflow";
import { AGENT_OUTPUT_CONTRACT } from "./output-contract";
import { AGENT_OUTPUT_TEMPLATE } from "./output-template";     // when present
import { AGENT_VALIDATION } from "./validation";
import { AGENT_FAILURE_MODES } from "./failure-modes";
import { AGENT_TOKEN_COMPRESSION_POLICY } from "./token-compression-policy";  // when present
import { composePromptSections } from "../shared/compose-prompt-sections";

export const AGENT_SYSTEM_PROMPT = composePromptSections([
  AGENT_IDENTITY,
  AGENT_BOUNDARIES,
  AGENT_TOOL_USAGE,
  AGENT_APPROVAL_GATES,          // remove if not present
  AGENT_DOMAIN_RULES,            // remove if not present
  AGENT_WORKFLOW,
  AGENT_OUTPUT_CONTRACT,
  AGENT_OUTPUT_TEMPLATE,         // remove if not present
  AGENT_VALIDATION,
  AGENT_FAILURE_MODES,           // remove if not present
  AGENT_TOKEN_COMPRESSION_POLICY, // remove if not present
]);
```

**Section order convention (follow this):**
1. Identity
2. Boundaries
3. Tool Usage
4. Approval Gates (edit agents only)
5. Subagent Usage (delegating agents only; can go after boundaries or after tool-usage)
6. Domain Rules
7. Inputs Expected (verifier-style only)
8. Verdict Rules / Finding Rules (verifier-style only)
9. Workflow
10. Output Contract
11. Output Template
12. Validation
13. Failure Modes
14. Token Compression Policy

---

## 4. Registration Points

After creating the agent folder, update these 6 files. All 6 are required.

### 4.1 `src/types/types.ts`

Add the agent name to the `AgentName` union and a corresponding task to the `WorkflowTask` union.

```typescript
export type AgentName =
  | ...
  | "{agent-name}";           // ADD HERE

export type WorkflowTask =
  | ...
  | "{task-name}";            // ADD HERE (e.g., "security-review")
```

The task name should be a kebab-case verb or noun describing the workflow category.

### 4.2 `src/config/agents.ts`

Add an entry to the `agents` object.

```typescript
"{agent-name}": {
  name: "{agent-name}",
  description: "{description matching frontmatter}",
  task: "{task-name}",
  model: agentModelConfig["{agent-name}"],
  permissions: ["read", "edit", "bash", "question"],  // match frontmatter permissions
},
```

The `permissions` array here is a high-level list of `AgentPermission` values. It must be non-empty (validated by `validate-config.ts`).

### 4.3 `src/config/models.ts`

Add a model configuration entry.

```typescript
"{agent-name}": {
  model: "{provider/model-id}",
  temperature: 0.1,           // match frontmatter temperature
  fallbackModels: ["{fallback-model}"],  // can be empty array
},
```

Model choices by agent profile:
- **Precise/analytical** (verifier, reviewer, planning): `openai/gpt-5.5` with `variant: "xhigh"` or `opencode-go/glm-5.1`
- **Implementation/coding**: `opencode-go/kimi-k2.6` or `opencode-go/deepseek-v4-pro`
- **Research/fast**: `opencode-go/deepseek-v4-flash`
- **Creative/guidance**: `opencode-go/qwen3.7-plus` with temperature 0.2-0.3

### 4.4 `src/config/routing.ts`

Add the task-to-agent mapping.

```typescript
export const taskToAgent = {
  ...existing entries,
  "{task-name}": "{agent-name}",
} satisfies Record<WorkflowTask, AgentName>;
```

The task string must match the `WorkflowTask` added in step 4.1 and the `task` field in `agents.ts` (step 4.2). `validate-config.ts` checks this three-way consistency.

### 4.5 `src/agents/index.ts`

Add an export line.

```typescript
export { AGENT as {AgentAlias} } from "./{agent-name}";
```

Example: `export { AGENT as SECURITY_REVIEW_AGENT } from "./security-review-agent";`

### 4.6 `src/agents/markdown-agents.ts`

Import the alias and add it to the `markdownAgents` array.

```typescript
import {
  ...existing imports,
  {AgentAlias},
} from "./index";

export const markdownAgents = [
  ...existing agents,
  {AgentAlias},
] satisfies AuthoredMarkdownAgent[];
```

The order in this array determines the generation order. Group related agents together (core pipeline first, specialized after).

---

## 5. Generation

After all source files are created and all registrations are done:

```bash
pnpm generate:agents
```

This writes `agents/{agent-name}.md` from the TypeScript source. Review the diff:

```bash
git diff agents/{agent-name}.md
```

---

## 6. Validation Checklist

Run these commands in order. All must pass.

```bash
pnpm typecheck         # TypeScript compiles with no errors
pnpm validate:config   # Agent config + routing consistency
pnpm test              # Vitest: registry, prompt invariants, prompt sync
pnpm check:agents      # Generated markdown is in sync with source (git diff --exit-code)
```

Or run everything at once:

```bash
pnpm check             # typecheck + validate:config + test
pnpm ci                # check:agents + typecheck + validate:config + test
```

---

## 7. Test Invariants (must satisfy)

These are enforced by `src/tests/prompt-invariants.test.ts` and `src/tests/agent-registry.test.ts`. The new agent must satisfy all of them.

### Generic invariants (every agent)

- `frontmatter.name` === `agent.name` (the `name` field in the AGENT object)
- `frontmatter.description.trim().length` > 20
- `frontmatter.mode` is defined (`"all"`, `"primary"`, or `"subagent"`)
- `frontmatter.temperature` is a number
- `frontmatter.permission` is defined
- `systemPrompt.trim().length` > 500
- Rendered output starts with `"---\nname: "`
- Rendered output contains `"---\n\n"` (frontmatter separator)
- Rendered output contains `name: {agent-name}`
- Rendered output contains `description: {JSON-quoted description}`
- Rendered output contains `"## Output Contract"` OR `"## Output Template"`
- Rendered output does NOT contain `"[object Object]"`
- No duplicate agent names in `markdownAgents`
- Every configured agent (in `config/agents.ts`) is in `markdownAgents`
- Every agent in `markdownAgents` is configured in `config/agents.ts`

### Read-only agent invariants

If the agent is read-only (like research, reviewer, pr-review, verifier), it must NOT have:
- `permission.edit === "allow"`
- `permission.write === "allow"`

### Edit agent invariants

If the agent can edit files (like implementation, test-fixer, prompt), it must have:
- `permission.edit === "allow"`

### Specific agent invariants (only if matching an existing pattern)

These are hardcoded tests for existing agents. If the new agent replaces or interacts with one of these, update the test accordingly. Otherwise, no action needed:

- `orchestrator-agent`: `edit: "deny"`, `task["*"]: "deny"`, `task["implementation-agent"]: "allow"`, `task["verifier-agent"]: "allow"`
- `research-agent`: `websearch: "allow"`, `webfetch: "allow"`
- `planning-agent`: `edit: "allow"`, `task["*"]: "deny"`, `task["research-agent"]: "allow"`
- `verifier-agent`: `edit: "deny"`, `bash` defined, `systemPrompt` contains `"Unable to Verify"`

---

## 8. Commit

Commit both the TypeScript source and the generated Markdown:

```bash
git add src/agents/{agent-name}/ src/types/types.ts src/config/agents.ts src/config/models.ts src/config/routing.ts src/agents/index.ts src/agents/markdown-agents.ts agents/{agent-name}.md
git commit
```

Pre-commit hooks run `pnpm check:agents` and `pnpm test` automatically.

---

## 9. Quick Reference: Complete File List

For a standard edit agent with subagent delegation (the most complex case):

```
src/agents/{agent-name}/
  index.ts
  frontmatter.ts
  identity.ts
  system-prompt.ts
  boundaries.ts
  tool-usage.ts
  approval-gates.ts
  subagent-usage.ts
  domain-rules.ts
  workflow.ts
  output-contract.ts
  output-template.ts
  validation.ts
  failure-modes.ts
  token-compression-policy.ts
```

For a minimal read-only agent:

```
src/agents/{agent-name}/
  index.ts
  frontmatter.ts
  identity.ts
  system-prompt.ts
  boundaries.ts
  tool-usage.ts
  domain-rules.ts
  workflow.ts
  output-contract.ts
  output-template.ts
  validation.ts
  failure-modes.ts
```

Registration files to update (always all 6):

```
src/types/types.ts              # AgentName + WorkflowTask unions
src/config/agents.ts            # agents object entry
src/config/models.ts            # model config entry
src/config/routing.ts           # taskToAgent mapping
src/agents/index.ts             # export
src/agents/markdown-agents.ts   # markdownAgents array
```

---

## 10. Common Mistakes to Avoid

1. **Editing `agents/*.md` directly.** Always edit TypeScript and regenerate.
2. **Forgetting a registration point.** All 6 files must be updated. Missing one causes typecheck or test failures.
3. **Mismatched task names.** The `WorkflowTask` in `types.ts`, the `task` in `agents.ts`, and the key in `routing.ts` must all be the same string.
4. **System prompt under 500 characters.** The test enforces > 500. Write substantive sections.
5. **Missing Output Contract or Output Template.** At least one must be present in the system prompt.
6. **Read-only agent with `edit: "allow"`.** The test will fail. Read-only agents must have `edit: "deny"`.
7. **Using `write` instead of `edit`.** The frontmatter type uses `edit`, not `write`, for file modification permission.
8. **Not running `pnpm generate:agents`.** The `check:agents` script will fail if generated markdown is out of sync.
9. **Using `PLANNING_AGENT_*` naming.** Use `AGENT_*` for all constants. The planning-agent naming is legacy.
10. **Forgetting `as const satisfies` on the AGENT object and frontmatter.** This ensures type safety and that the agent conforms to the `AuthoredMarkdownAgent` / `OpenCodeMarkdownAgentFrontmatter` contracts.
