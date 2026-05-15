import { describe, expect, it } from "vitest";
import { renderMarkdownAgent } from "../adapters/markdown-agent";
import { markdownAgents } from "../agents/markdown-agents";
import { hasPermission } from "./prompt-test-utils";

describe("prompt invariants", () => {
  it.each(markdownAgents)("$name has a valid prompt shape", (agent) => {
    const rendered = renderMarkdownAgent(agent);

    expect(agent.frontmatter.name).toBe(agent.name);
    expect(agent.frontmatter.description.trim().length).toBeGreaterThan(20);
    expect(agent.frontmatter.mode).toBeDefined();
    expect(typeof agent.frontmatter.temperature).toBe("number");
    expect(agent.frontmatter.permission).toBeDefined();
    expect(agent.systemPrompt.trim().length).toBeGreaterThan(500);
    expect(rendered.startsWith("---\nname: ")).toBe(true);
    expect(rendered).toContain("---\n\n");
    expect(rendered).toContain(`name: ${agent.name}`);
    expect(rendered).toContain(
      `description: ${JSON.stringify(agent.frontmatter.description)}`,
    );
    expect(
      rendered.includes("## Output Contract") ||
        rendered.includes("## Output Template"),
      `${agent.name}: missing output contract or output template section`,
    ).toBe(true);
    expect(rendered).not.toContain("[object Object]");
  });

  it.each([
    "orchestrator-agent",
    "research-agent",
    "reviewer-agent",
    "pr-review-agent",
    "verifier-agent",
  ])("%s stays read-only", (agentName) => {
    const agent = markdownAgents.find((candidate) => candidate.name === agentName);

    expect(agent, `${agentName}: agent is not registered`).toBeDefined();
    expect(hasPermission(agent?.frontmatter.permission, "edit", "allow")).toBe(false);
    expect(hasPermission(agent?.frontmatter.permission, "write", "allow")).toBe(false);
  });

  it.each(["implementation-agent", "test-fixer-agent", "prompt-agent"])(
    "%s can edit files",
    (agentName) => {
      const agent = markdownAgents.find(
        (candidate) => candidate.name === agentName,
      );

      expect(agent, `${agentName}: agent is not registered`).toBeDefined();
      expect(hasPermission(agent?.frontmatter.permission, "edit", "allow")).toBe(true);
    },
  );

  it("orchestrator can delegate only through explicit task permissions", () => {
    const agent = markdownAgents.find(
      (candidate) => candidate.name === "orchestrator-agent",
    );
    const permission = agent?.frontmatter.permission;

    expect(agent).toBeDefined();
    expect(hasPermission(permission, "edit", "deny")).toBe(true);
    expect(permission?.task?.["*"]).toBe("deny");
    expect(permission?.task?.["implementation-agent"]).toBe("allow");
    expect(permission?.task?.["verifier-agent"]).toBe("allow");
  });

  it("research-agent keeps web research permissions", () => {
    const agent = markdownAgents.find(
      (candidate) => candidate.name === "research-agent",
    );
    const permission = agent?.frontmatter.permission;

    expect(agent).toBeDefined();
    expect(hasPermission(permission, "websearch", "allow")).toBe(true);
    expect(hasPermission(permission, "webfetch", "allow")).toBe(true);
  });

  it("planning-agent can write plans and only delegates research by default", () => {
    const agent = markdownAgents.find(
      (candidate) => candidate.name === "planning-agent",
    );
    const permission = agent?.frontmatter.permission;

    expect(agent).toBeDefined();
    expect(hasPermission(permission, "edit", "allow")).toBe(true);
    expect(permission?.task?.["*"]).toBe("deny");
    expect(permission?.task?.["research-agent"]).toBe("allow");
  });

  it("verifier-agent cannot edit and must handle unverifiable work", () => {
    const agent = markdownAgents.find(
      (candidate) => candidate.name === "verifier-agent",
    );
    const permission = agent?.frontmatter.permission;

    expect(agent).toBeDefined();
    expect(hasPermission(permission, "edit", "deny")).toBe(true);
    expect(permission?.bash).toBeDefined();
    expect(agent?.systemPrompt).toContain("Unable to Verify");
  });
});
