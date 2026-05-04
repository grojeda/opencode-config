# Angular Best Practices

Compact Angular best-practices repository for agent-friendly code generation and review.

## Structure

- `rules/` - Individual rule files
- `rules/_sections.md` - Section metadata and ordering
- `rules/_template.md` - Rule authoring template
- `metadata.json` - Document metadata
- `AGENTS.md` - Compiled human and agent guide
- `SKILL.md` - Skill entrypoint and quick reference

## Scope

This skill targets modern Angular applications using:

- Standalone APIs
- Signals and computed state
- RxJS for async orchestration
- Lazy routing and deferrable views
- Typed reactive forms

## Creating a New Rule

1. Copy `rules/_template.md`.
2. Pick the right filename prefix:
   - `change-` for change detection and state
   - `template-` for templates and rendering
   - `rxjs-` for async and RxJS flows
   - `routing-` for routing and bundle splitting
   - `forms-` for forms and component APIs
3. Add clear bad and good examples.
4. Keep guidance specific enough for automated review or generation.

## Rule File Structure

Each rule should include frontmatter and a short explanation, plus one incorrect and one correct example.

## Notes

This skill intentionally stays smaller than the React/Vercel guide. The goal is fast, practical Angular guidance, not exhaustive framework coverage.
