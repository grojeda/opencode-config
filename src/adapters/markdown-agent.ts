import type {
  AuthoredMarkdownAgent,
  OpenCodeMarkdownAgentFrontmatter,
} from "../types/types";

function renderPermissionValue(
  indent: string,
  key: string,
  value: unknown,
): string[] {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return [
      `${indent}${key}:`,
      ...Object.entries(value).map(([nestedKey, nestedValue]) => {
        return `${indent}  ${JSON.stringify(nestedKey)}: ${nestedValue}`;
      }),
    ];
  }

  return [`${indent}${key}: ${value}`];
}

function renderYamlScalar(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  return String(value);
}

export function renderFrontmatter(
  frontmatter: OpenCodeMarkdownAgentFrontmatter,
): string {
  const lines = [
    "---",
    `name: ${renderYamlScalar(frontmatter.name)}`,
    `description: ${renderYamlScalar(frontmatter.description)}`,
  ];

  if (frontmatter.mode !== undefined) {
    lines.push(`mode: ${renderYamlScalar(frontmatter.mode)}`);
  }

  if (frontmatter.temperature !== undefined) {
    lines.push(`temperature: ${frontmatter.temperature}`);
  }

  if (frontmatter.permission) {
    lines.push("permission:");

    for (const [key, value] of Object.entries(frontmatter.permission)) {
      lines.push(...renderPermissionValue("  ", key, value));
    }
  }

  lines.push("---");

  return lines.join("\n");
}

export function renderMarkdownAgent(agent: AuthoredMarkdownAgent): string {
  return `${renderFrontmatter(agent.frontmatter)}\n\n${agent.systemPrompt.trim()}\n`;
}
