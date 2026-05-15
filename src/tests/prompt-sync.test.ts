import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderMarkdownAgent } from "../adapters/markdown-agent";
import { markdownAgents } from "../agents/markdown-agents";

describe("generated prompt markdown", () => {
  it.each(markdownAgents)("$name is synchronized with agents/*.md", (agent) => {
    const outputPath = join(process.cwd(), "agents", `${agent.name}.md`);

    expect(
      existsSync(outputPath),
      `${agent.name}: agents/${agent.name}.md is missing. Run pnpm generate:agents.`,
    ).toBe(true);

    const expected = renderMarkdownAgent(agent);
    const actual = readFileSync(outputPath, "utf8");

    expect(
      actual,
      `${agent.name}: agents/${agent.name}.md is out of date. Run pnpm generate:agents and review the diff.`,
    ).toBe(expected);
  });
});
