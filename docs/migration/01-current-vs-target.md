# Current vs Target Architecture

## Current repository

This repository is currently an OpenCode configuration setup.

Its main purpose is to provide reusable agents, commands, permissions, and workflow rules that can be copied or reused across different projects.

The configuration is useful, but most of the behavior is still defined as static config files and documentation.

## Target architecture

The target architecture is inspired by oh-my-openagent.

The goal is not to copy the project blindly, but to move towards a more structured system where agents, model routing, permissions, prompts, and workflows can be defined through TypeScript modules.

This should make the configuration easier to evolve, test, document, and reuse.

## Migration principle

We will migrate progressively.

Each step should preserve the existing behavior first, then improve the structure.

No big rewrite unless there is a clear reason.