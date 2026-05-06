---
name: pr-review
description: Review pull requests and local branch diffs with evidence-based findings, risk assessment, and actionable feedback.
allowed-tools: Bash(git:*) Bash(gh:*) Bash(rg:*)
---

# PR Review

## When to use

Use this skill when reviewing a GitHub pull request, a PR URL, a PR number, or the current local branch diff before merge.

## PR context collection commands

```bash
gh pr view <number> --json title,body,baseRefName,headRefName,files,commits,additions,deletions,reviewDecision,statusCheckRollup
gh pr diff <number>
gh pr checks <number>
```

## Local branch review commands

```bash
git status --short --branch
git merge-base origin/main HEAD
git diff --stat origin/main...HEAD
git diff origin/main...HEAD
git log --oneline origin/main..HEAD
rg "TODO|FIXME|console\.log|debugger|\.only\("
```

## Review checklist

- Correctness/behavior: changed logic matches intended behavior and handles edge cases.
- Regression risk: existing behavior, compatibility, migrations, and public contracts remain safe.
- Missing tests: changed behavior has meaningful positive, negative, and regression coverage.
- Security/privacy: auth, permissions, secrets, PII, data exposure, and injection risks are addressed.
- Performance/reliability: query, render, API, bundle, retry, timeout, and failure modes are acceptable.
- Maintainability/scope creep: changes are focused, understandable, and consistent with project patterns.
- CI/check failures: failed or missing checks are included in the review risk.

## Finding quality rules

- Every finding must cite concrete evidence: file path, diff hunk/context, command output, or exact observed fact.
- Prefer actionable, minimal feedback over broad advice.
- Distinguish blockers from non-blocking improvements.
- Do not infer intent beyond the PR description, diff, tests, and observed context.

## Output guidance

Use this structure:

- Verdict: `approve` | `comment` | `request changes`
- Summary
- Blocking Findings
- Non-Blocking Findings
- Missing Tests
- Risk Notes
- Suggested Follow-up Commands

## Anti-patterns

- Generic best-practice advice without diff evidence.
- Requesting broad rewrites when a targeted fix is enough.
- Treating style preferences as blockers.
- Ignoring failed checks or missing tests for changed behavior.
- Reviewing files outside the PR or branch diff unless needed for direct context.

## References

- GitHub CLI PR commands: `gh pr view`, `gh pr diff`, `gh pr checks`
- Git comparison syntax: `origin/main...HEAD` for branch diff review
- Repository test, lint, and validation scripts when available
