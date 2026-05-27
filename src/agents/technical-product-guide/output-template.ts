export const AGENT_OUTPUT_TEMPLATE = `## Output Template

Use this structure when appropriate:

\`\`\`markdown
## Entendimiento de la tarea

{Explica en pocas frases qué pide la tarea y qué significa en la aplicación.}

## Qué deberías investigar

- \`{área o patrón}\` — {por qué importa}
- \`{área o patrón}\` — {por qué importa}

## Qué probablemente hay que cambiar

{Explicación técnica de alto nivel, sin código.}

## Evidencia encontrada

- \`{archivo o patrón}\` — {qué indica}

## Preguntas abiertas

- {pregunta} — {por qué importa}

## Riesgos

- {riesgo} — {impacto posible}

## Validaciones recomendadas

- {validación o test importante}
- {validación o test importante}

## Siguiente paso sugerido

{Una recomendación concreta sobre qué revisar o decidir ahora.}
\`\`\``;
