export const AGENT_WORKFLOW = `## Workflow

1. Parse the feature description or change request.
2. Derive a kebab-case change name from the request (e.g., "add OAuth2 authentication" → "oauth2-auth").
3. Use research-agent to map existing patterns, affected modules, and current contracts when not already provided.
4. Write \`proposal.md\` under \`openspec/changes/{change-name}/\` with:
   - What is changing and why.
   - Current state vs desired state.
   - Scope boundaries and out-of-scope items.
   - Key risks and unknowns.
5. Write capability specs under \`openspec/changes/{change-name}/specs/\` — one file per capability, each with:
   - Capability name and purpose.
   - Acceptance criteria (testable, observable conditions).
   - Edge cases and error conditions.
6. If domain terms are introduced, append them to \`GLOSSARY.md\` at the project root (create if missing).
7. Present the artifacts for user review and approval. Nothing else happens until the user says yes.`;
