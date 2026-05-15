import type {
  OpenCodeMarkdownAgentFrontmatter,
  OpenCodePermissionValue,
} from "../types/types";

export function hasPermission(
  permission: OpenCodeMarkdownAgentFrontmatter["permission"],
  key: keyof NonNullable<OpenCodeMarkdownAgentFrontmatter["permission"]>,
  value: OpenCodePermissionValue,
): boolean {
  return permission?.[key] === value;
}
