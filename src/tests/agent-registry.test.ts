import { describe, expect, it } from "vitest";
import { markdownAgents } from "../agents/markdown-agents";
import { agents } from "../config/agents";
import type { AgentName } from "../types/types";

describe("agent registry", () => {
  it("does not register duplicate markdown agents", () => {
    const names = markdownAgents.map((agent) => agent.name);
    const uniqueNames = new Set(names);

    expect(uniqueNames.size).toBe(names.length);
  });

  it("renders every configured agent", () => {
    const renderedNames = new Set(markdownAgents.map((agent) => agent.name));

    for (const configuredName of Object.keys(agents) as AgentName[]) {
      expect(
        renderedNames.has(configuredName),
        `Configured agent is not in markdownAgents: ${configuredName}`,
      ).toBe(true);
    }
  });

  it("configures every rendered agent", () => {
    for (const renderedName of markdownAgents.map((agent) => agent.name)) {
      expect(
        agents[renderedName],
        `Rendered agent is missing from config/agents.ts: ${renderedName}`,
      ).toBeDefined();
    }
  });
});
