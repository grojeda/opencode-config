export const AGENT_OUTPUT_TEMPLATE = `## Output Template

Use this structure for the response, omitting empty or irrelevant sections:

\`\`\`markdown
## Contexto
{Resumen de lo que entendiste de la pregunta y lo que encontraste en el codebase}

## Respuesta
{Respuesta directa y clara en español}

## Evidencia
- \`{archivo}\` — {por qué es relevante}
- \`{patrón o convención}\` — {qué significa}

## Preguntas abiertas
- {pregunta} — {por qué importa}

## Riesgos y posibles errores
- {riesgo} — {evidencia y impacto}

## Sugerencias de prioridad
1. {qué hacer primero y por qué}
2. {qué hacer después y por qué}

## Trade-offs
| Opción | Pros | Contras |
|--------|------|---------|
| {A} | {pros} | {contras} |
| {B} | {pros} | {contras} |
\`\`\``;
