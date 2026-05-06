# OpenCode Configuration

[![OpenCode](https://img.shields.io/badge/OpenCode-Configuration-blue)](https://opencode.ai)
[![Plugin](https://img.shields.io/badge/Plugin-warp--dev-green)](https://github.com/warp-dot-dev/opencode-warp)
[![Agents](https://img.shields.io/badge/Agents-9-orange)]()
[![Skills](https://img.shields.io/badge/Skills-10-purple)]()
[![Commands](https://img.shields.io/badge/Commands-4-yellow)]()

---

## Table of Contents

- [Overview](#overview)
- [Installation & Setup](#installation--setup)
- [Agents Reference](#agents-reference)
- [Commands Guide](#commands-guide)
- [Configuration Details](#configuration-details)
- [Usage Examples](#usage-examples)

---

## Overview

This configuration transforms OpenCode into a **multi-agent development system** with:

- **9 specialized agents** organized around a research → plan → review → implement → verify pipeline
- **10 skills** covering browser automation, frontend best practices (Angular, React, NestJS), testing (Jest, Karma, Playwright), PR review, and token-efficient communication
- **4 lane-based commands** (`/quick`, `/medium`, `/full`, `/debug`) that route work through the orchestrator with appropriate rigor
- **Token compression** via the `caveman` skill for efficient agent-to-agent communication
- **Plugin integration** with `@warp-dot-dev/opencode-warp`

### Architecture

``` md
User Request
    │
    ▼
┌─────────────────────┐
│  orchestrator-agent │  ← Routes work, manages lanes, approval gates
└────────┬────────────┘
         │
         │
         ▼                               
┌──────────┐  ┌──────────────┐  ┌──────────────────┐
│ research │  │ planning     │→ │ reviewer         │
│  agent   │→ │   agent      │← │    agent         │
└──────────┘  └──────┬───────┘  └──────────────────┘
                     │
                     ▼
              ┌──────────────┐   ┌──────────────────┐
              │implementation│ → │ verifier-agent   │
              │   agent      │ ← │   (audit)        │
              └──────┬───────┘   └──────────────────┘
                     │
                     ▼
              ┌──────────────┐
              │ test-fixer   │ ← When tests fail
              │   agent      │
              └──────────────┘
```

---

## Installation & Setup

### Using This Configuration

This configuration lives in `~/.config/opencode`. To apply it:

1. **Backup your existing config** (if any):

   ```bash
   cp -r ~/.config/opencode ~/.config/opencode.backup
   ```

2. **Clone or copy this configuration**:

   ```bash
   git clone <repository-url> ~/.config/opencode-new
   cp -r ~/.config/opencode-new/* ~/.config/opencode/
   ```

3. **Verify**:

   ```bash
   opencode --version
   ```

### Configuration Structure

``` md

~/.config/opencode/
├── opencode.json              # Main config: agents, permissions, plugin
├── tui.json                   # TUI settings
├── agents/                    # Agent definitions (9 agents)
│   ├── orchestrator-agent.md
│   ├── research-agent.md
│   ├── planning-agent.md
│   ├── reviewer-agent.md
│   ├── implementation-agent.md
│   ├── test-fixer-agent.md
│   ├── verifier-agent.md
│   ├── pr-review-agent.md
│   └── prompt-agent.md
├── commands/                  # Lane commands (4 commands)
│   ├── quick.md
│   ├── medium.md
│   ├── full.md
│   └── debug.md
├── skills/                    # Installed skills (10 skills)
│   ├── agent-browser/
│   ├── angular-best-practices/
│   ├── caveman/
│   ├── find-skills/
│   ├── jest-testing/
│   ├── karma-testing/
│   ├── nestjs-best-practices/
│   ├── playwright-cli/
│   ├── pr-review/
│   └── vercel-react-best-practices/
└── package.json               # Skill dependencies
```

---

## Agents Reference

The system uses a **pipeline architecture** where the orchestrator routes work to specialists based on task type and risk level.

### Core Pipeline Agents

| Agent | Purpose | Model | Key Permissions |
|-------|---------|-------|-----------------|
| **orchestrator-agent** | Coordinates all specialists, manages lanes and approval gates | `qwen3.6-plus` | read, question; delegates to all other agents |
| **research-agent** | Investigates code, patterns, dependencies, docs, root causes | `deepseek-v4-flash` | read, websearch, webfetch, question |
| **planning-agent** | Creates implementation-ready plans with commit structure | `gpt-5.5` (xhigh) | read, edit, delegates to research-agent |
| **reviewer-agent** | Adversarial stress-testing of plans before implementation | `glm-5.1` | read, git diff/status/rg, question |
| **implementation-agent** | Executes approved plans step-by-step, production-ready code | `kimi-k2.6` | read, edit, bash (ask), question |
| **test-fixer-agent** | Diagnoses and repairs failing tests with minimal changes | `deepseek-v4-pro` | read, edit, bash, question |
| **verifier-agent** | Post-implementation audit against approved plan | `gpt-5.5` (xhigh) | read, git diff/status/rg, question |

### Specialized Agents

| Agent | Purpose | Model | Key Permissions |
|-------|---------|-------|-----------------|
| **pr-review-agent** | Reviews GitHub PRs or local branch diffs for correctness, risk, security | `glm-5.1` | read, git commands, gh CLI, question |
| **prompt-agent** | Refines, critiques, and improves OpenCode agent prompts and workflows | `qwen3.6-plus` | read, question |

### Execution Lanes

The orchestrator classifies work into three lanes:

| Lane | Use For | Flow |
|------|---------|------|
| **Fast Lane** | Small changes, single-file edits, docs, obvious fixes | `research` → `planning` → `implementation` |
| **Standard Lane** | Multi-file changes, bug fixes, shared abstractions, behavior changes | `research` → `planning` → `review` → `implementation` → `verify` |
| **High-Risk Lane** | Migrations, auth/security, data integrity, payments, public APIs | `research` → `planning` → `review` → **approval** → `implementation` → `verify` |

### Debug Lane

For bug fixing specifically:

1. Triage symptoms
2. `research-agent` maps suspect files and root-cause candidates
3. State hypothesis + falsification check
4. `planning-agent` creates smallest fix plan
5. `reviewer-agent` critiques if risky
6. Approval gate
7. `implementation-agent` applies fix
8. `test-fixer-agent` if tests break
9. `verifier-agent` audits result

---

## Commands Guide

Commands trigger the orchestrator with a specific lane configuration.

| Command | Purpose | Lane | When to Use |
|---------|---------|------|-------------|
| **quick** | Small, isolated, low-risk changes | Quick lane | Single-file edits, mechanical changes, simple additions |
| **medium** | Multi-file work needing structure but not full design | Medium lane | Refactors, feature additions touching multiple modules |
| **full** | Broad, risky, architecture-sensitive work | Full lane | New features, migrations, major refactors, design changes |
| **debug** | Finding and fixing bugs | Debug lane | Bug reports, regressions, failing tests, unexpected behavior |

### Command Behavior

All commands run through `orchestrator-agent` as subtasks and follow this pattern:

1. **Intake** — scope the request
2. **Discovery** — delegate to `research-agent` for codebase mapping
3. **Planning** — `planning-agent` creates implementation plan saved to `plans/{feature-name}/plan.md`
4. **Review** — `reviewer-agent` stress-tests the plan (skipped in quick lane)
5. **Approval** — `[y/N/edit]` gate before edits begin
6. **Execution** — `implementation-agent` follows the plan
7. **Verification** — `verifier-agent` audits the result (skipped in quick lane for trivial changes)

---

## Configuration Details

### opencode.json

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@warp-dot-dev/opencode-warp"],
  "autoupdate": "notify",
  "model": "opencode-go/qwen3.6-plus",
  "small_model": "opencode-go/qwen3.5-plus",
  "agent": {
    "orchestrator-agent": {
      "model": "opencode-go/qwen3.6-plus",
      "temperature": 0.1
    },
    "planning-agent": {
      "model": "openai/gpt-5.5",
      "temperature": 0.1,
      "variant": "xhigh"
    },
    "research-agent": {
      "model": "opencode-go/deepseek-v4-flash",
      "temperature": 0.1
    },
    "reviewer-agent": {
      "model": "opencode-go/glm-5.1",
      "temperature": 0.1
    },
    "pr-review-agent": {
      "model": "opencode-go/glm-5.1",
      "temperature": 0.1
    },
    "implementation-agent": {
      "model": "opencode-go/kimi-k2.6",
      "temperature": 0.1
    },
    "test-fixer-agent": {
      "model": "opencode-go/deepseek-v4-pro",
      "temperature": 0.1
    },
    "verifier-agent": {
      "model": "openai/gpt-5.5",
      "temperature": 0.1,
      "variant": "xhigh"
    },
    "prompt-agent": {
      "model": "opencode-go/qwen3.6-plus",
      "temperature": 0.2
    }
  },
  "permission": {
    "bash": "ask",
    "edit": "allow"
  },
  "compaction": {
    "auto": true,
    "prune": true
  },
  "watcher": {
    "ignore": ["node_modules/**", "dist/**", ".git/**", "build/**", ".next/**", "coverage/**"]
  },
  "lsp": true,
  "formatter": true
}

```

### Model Assignment Strategy

| Role | Model | Rationale |
|------|-------|-----------|
| **Orchestration** | `qwen3.6-plus` | Strong reasoning for routing decisions |
| **Planning** | `gpt-5.5` (xhigh) | Best-in-class for structured plan generation |
| **Research** | `deepseek-v4-flash` | Fast, cost-effective codebase exploration |
| **Review** | `glm-5.1` | Strong adversarial analysis |
| **Implementation** | `kimi-k2.6` | Efficient code generation |
| **Test Fixing** | `deepseek-v4-pro` | Deep reasoning for test diagnostics |
| **Verification** | `gpt-5.5` (xhigh) | Thorough audit capability |
| **Prompt Engineering** | `qwen3.6-plus` | Good at meta-reasoning about prompts |

### Permission System

- **bash**: `ask` — requires user confirmation before running shell commands
- **edit**: `allow` — agents can modify files within their defined permissions
- Individual agents have granular overrides (e.g., `research-agent` cannot edit, `implementation-agent` cannot commit)

### Plugin System

The `@warp-dot-dev/opencode-warp` plugin provides enhanced capabilities integrated into the workflow.

### Compaction & Watcher

- **Auto-compaction** with pruning keeps context windows efficient
- **File watcher** ignores build artifacts, dependencies, and git internals

---

## Usage Examples

### Example 1: Quick Fix

``` md
/quick add null check to parseUser in auth.ts
```

The orchestrator:

1. Confirms the task is small enough for quick lane
2. Gathers minimal context via `research-agent`
3. Creates a tiny plan with `planning-agent`
4. Skips approval (mechanical change)
5. Delegates to `implementation-agent`
6. Reports files changed and validations run

### Example 2: Feature Development

``` md
/full add dark mode toggle to settings page
```

The orchestrator:

1. Delegates discovery to `research-agent`
2. `planning-agent` drafts approach with existing patterns
3. `reviewer-agent` stress-tests the plan
4. Presents plan at `plans/dark-mode-toggle/plan.md`
5. Asks `[y/N/edit]` for approval
6. Executes tracks via `implementation-agent`
7. `verifier-agent` audits the result

### Example 3: Debugging

``` md
/debug API returns 500 when creating orders with empty cart
```

The orchestrator:

1. Triages: symptom = 500 on empty cart order creation
2. `research-agent` maps order creation flow, finds suspect validation
3. Hypothesis: missing null check on cart items array
4. `planning-agent` creates minimal fix plan
5. `reviewer-agent` critiques (touches shared order logic)
6. Approval gate → `[y/N/edit]`
7. `implementation-agent` applies fix
8. `verifier-agent` confirms the fix resolves the 500

### Example 4: PR Review

``` md
@pr-review-agent review PR #42
```

The PR review agent:

1. Collects evidence via `gh pr view`, `gh pr diff`, `gh pr checks`
2. Reviews across 7 dimensions: correctness, regression, tests, security, performance, maintainability, CI
3. Returns verdict: `approve` | `comment` | `request changes`
4. Lists blocking and non-blocking findings with evidence

### Best Practices

1. **Start with the right lane** — use `/quick` for small changes, escalate to `/medium` or `/full` as needed
2. **Let skills auto-activate** — skills trigger based on context; use `@skill-name` for explicit invocation
3. **Review plans before approving** — the approval gate is your checkpoint
4. **Trust the pipeline** — research before planning, review before implementation, verify after
5. **Use caveman mode** for token efficiency when working with large contexts
