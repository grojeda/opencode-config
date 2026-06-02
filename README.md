# OpenCode Configuration

[![OpenCode](https://img.shields.io/badge/OpenCode-Configuration-blue)](https://opencode.ai)
[![Plugin](https://img.shields.io/badge/Plugin-warp--dev-green)](https://github.com/warp-dot-dev/opencode-warp)
[![Agents](https://img.shields.io/badge/Agents-13-orange)]()
[![Skills](https://img.shields.io/badge/Skills-13-purple)]()
[![Commands](https://img.shields.io/badge/Commands-12-yellow)]()

Multi-agent development system for OpenCode with 13 specialized agents, 13 skills, and 12 commands organized around research → plan → review → implement → verify pipelines.

---

## Quick Start

```bash
# 1. Clone or copy this config to ~/.config/opencode
# 2. Install dependencies
pnpm install

# 3. Verify
pnpm check
```

**Requires:** OpenCode, Node.js, pnpm, Git. **Recommended:** GitHub CLI (`gh`), ripgrep (`rg`).

---

## Structure

```
~/.config/opencode/
├── opencode.json          # Agents, permissions, models, plugin
├── agents/                # 13 agent definitions (generated from src/)
├── commands/              # 12 commands (lanes, spec-first, learning, git)
├── skills/                # 13 skills (browser, testing, best practices, etc.)
├── src/                   # TypeScript source for agent authoring
│   ├── agents/            # Prompt definitions (source of truth)
│   ├── config/            # Agent metadata and routing
│   ├── adapters/          # Markdown renderer
│   └── scripts/           # Generation and validation
└── package.json           # Dependencies and scripts
```

> **Do not edit `agents/*.md` by hand.** Update TypeScript under `src/`, then run `pnpm generate:agents`.

---

## Agents

### Core Pipeline

| Agent | Purpose | Model |
|---|---|---|
| **orchestrator-agent** | Routes work, manages lanes and approval gates | `qwen3.6-plus` |
| **research-agent** | Codebase mapping, root-cause analysis | `deepseek-v4-flash` |
| **planning-agent** | Implementation-ready plans | `gpt-5.5` (xhigh) |
| **reviewer-agent** | Adversarial plan stress-testing | `glm-5.1` |
| **implementation-agent** | Step-by-step plan execution | `kimi-k2.6` |
| **test-fixer-agent** | Diagnose and repair failing tests | `deepseek-v4-pro` |
| **verifier-agent** | Post-implementation audit | `gpt-5.5` (xhigh) |

### Specialized

| Agent | Purpose | Model |
|---|---|---|
| **pr-review-agent** | PR review via `gh` CLI | `glm-5.1` |
| **prompt-agent** | Refine agent prompts | `qwen3.6-plus` |
| **spec-agent** | Proposal + capability specs | `kimi-k2.6` |
| **apply-agent** | Execute playbooks (RED→GREEN) | `deepseek-v4-flash` |
| **readme-architect** | Professional READMEs | `qwen3.6-plus` |
| **technical-product-guide** | Codebase navigation guidance | `qwen3.6-plus` |

---

## Commands

### Execution Lanes

| Command | Use | Flow |
|---|---|---|
| `/quick` | Small, single-file changes | research → plan → implement |
| `/medium` | Multi-file work, refactors | research → plan → review → implement → verify |
| `/full` | Risky, architecture-sensitive | research → plan → review → **approve** → implement → verify |
| `/debug` | Bug fixing | triage → research → plan → review → approve → implement → verify |

### Spec-First

| Command | Purpose |
|---|---|
| `/spec` | Create `proposal.md` + capability specs |
| `/design` | Generate `design.md` + `tasks.md` + `implementation.md` |
| `/apply` | Execute implementation playbook |
| `/review` | Multi-dimensional review of changes |
| `/spec-flow` | Full pipeline: spec → design → apply → review |

### Other

| Command | Purpose |
|---|---|
| `/learning-path` | Generate structured onboarding docs |
| `/mentor` | Senior dev guidance without direct solutions |
| `/commit` | Gitmoji commit from staged changes |

All lanes run through `orchestrator-agent` with `[y/N/edit]` approval gates before edits begin.

---

## Skills

| Skill | Purpose |
|---|---|
| **agent-browser** | Browser automation (navigate, forms, scrape, test) |
| **angular-best-practices** | Angular: standalone, signals, RxJS, routing |
| **nestjs-best-practices** | NestJS: modules, DI, security, performance |
| **vercel-react-best-practices** | React/Next.js performance optimization |
| **jest-testing** / **karma-testing** | Test authoring and stabilization |
| **playwright-cli** | Browser automation and Playwright tests |
| **pr-review** | Evidence-based PR review |
| **caveman** | Token-efficient communication mode |
| **budget-executor** / **budget-explorer** | Budget-aware operations |
| **find-skills** | Discover and install agent skills |

---

## Configuration Highlights

```json
{
  "model": "opencode-go/qwen3.6-plus",
  "permission": { "bash": "ask", "edit": "allow" },
  "compaction": { "auto": true, "prune": true },
  "watcher": { "ignore": ["node_modules/**", "dist/**", ".git/**"] }
}
```

- **bash**: `ask` — requires confirmation before shell commands
- **edit**: `allow` — agents can modify files within their permissions
- **Auto-compaction** with pruning keeps context windows efficient
- **Plugin**: `@warp-dot-dev/opencode-warp`

---

## Scripts

| Script | Purpose |
|---|---|
| `pnpm install` | Install dependencies |
| `pnpm check` | Full check: typecheck + validate + test |
| `pnpm generate:agents` | Generate agent Markdown from TypeScript |
| `pnpm test` | Run tests with Vitest |
| `pnpm ci` | Full CI pipeline |

---

## Usage Examples

```
/quick add null check to parseUser in auth.ts
/full add dark mode toggle to settings page
/debug API returns 500 when creating orders with empty cart
/spec-flow add OAuth2 authentication with Google provider
@pr-review-agent review PR #42
/learning-path authentication module
/mentor how do I implement rate limiting in Express?
```

---

## Agent Authoring

1. Edit files under `src/agents/`, `src/config/`, or `src/adapters/`
2. Run `pnpm generate:agents`
3. Review the `agents/*.md` diff
4. Run `pnpm check`
5. Commit both TypeScript and generated Markdown changes

Pre-commit hooks run `pnpm check:agents` and `pnpm test` automatically.
