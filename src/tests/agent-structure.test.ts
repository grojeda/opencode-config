import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { markdownAgents } from "../agents/markdown-agents";
import { agents } from "../config/agents";
import { taskToAgent } from "../config/routing";
import type { AgentName } from "../types/types";

const agentsDir = join(process.cwd(), "src", "agents");

// planning-agent uses a legacy structure (agent.ts, PLANNING_AGENT_* naming,
// no boundaries.ts). It is exempt from structural checks that it cannot pass.
// New agents must NOT follow this pattern. See docs/agent-creation-harness.md.
const LEGACY_EXCEPTIONS = new Set(["planning-agent"]);

const MANDATORY_FILES = [
  "index.ts",
  "frontmatter.ts",
  "identity.ts",
  "system-prompt.ts",
  "boundaries.ts",
  "workflow.ts",
  "output-contract.ts",
  "validation.ts",
] as const;

function getAgentFolders(): string[] {
  return readdirSync(agentsDir)
    .filter((entry) => {
      const fullPath = join(agentsDir, entry);
      return statSync(fullPath).isDirectory() && entry !== "shared";
    })
    .sort();
}

function readFileContent(agentFolder: string, fileName: string): string {
  const filePath = join(agentsDir, agentFolder, fileName);
  if (!existsSync(filePath)) {
    return "";
  }
  return readFileSync(filePath, "utf8");
}

function isLegacy(folder: string): boolean {
  return LEGACY_EXCEPTIONS.has(folder);
}

describe("agent folder structure", () => {
  const agentFolders = getAgentFolders();
  const configuredAgents = new Set(Object.keys(agents) as AgentName[]);
  const renderedAgents = new Set(markdownAgents.map((agent) => agent.name));
  const routedAgents = new Set(Object.values(taskToAgent) as AgentName[]);

  it("every configured agent has a folder under src/agents/", () => {
    for (const agentName of configuredAgents) {
      const folderPath = join(agentsDir, agentName);
      expect(
        existsSync(folderPath),
        `Agent "${agentName}" is configured in config/agents.ts but has no folder at src/agents/${agentName}/`,
      ).toBe(true);
    }
  });

  it("every rendered agent has a folder under src/agents/", () => {
    for (const agentName of renderedAgents) {
      const folderPath = join(agentsDir, agentName);
      expect(
        existsSync(folderPath),
        `Agent "${agentName}" is in markdownAgents but has no folder at src/agents/${agentName}/`,
      ).toBe(true);
    }
  });

  it("every routed agent has a folder under src/agents/", () => {
    for (const agentName of routedAgents) {
      const folderPath = join(agentsDir, agentName);
      expect(
        existsSync(folderPath),
        `Agent "${agentName}" is in routing.ts but has no folder at src/agents/${agentName}/`,
      ).toBe(true);
    }
  });

  it("every agent folder is registered in config/agents.ts", () => {
    for (const folder of agentFolders) {
      expect(
        configuredAgents.has(folder as AgentName),
        `Folder src/agents/${folder}/ exists but is not registered in config/agents.ts`,
      ).toBe(true);
    }
  });

  it.each(agentFolders)("%s has all mandatory files", (agentFolder) => {
    if (isLegacy(agentFolder)) return;

    for (const fileName of MANDATORY_FILES) {
      const filePath = join(agentsDir, agentFolder, fileName);
      expect(
        existsSync(filePath),
        `src/agents/${agentFolder}/${fileName} is missing. This is a mandatory file. See docs/agent-creation-harness.md section 2.`,
      ).toBe(true);
    }
  });

  it.each(agentFolders)("%s index exports an agent object with correct name and type safety", (agentFolder) => {
    if (isLegacy(agentFolder)) return;

    const indexContent = readFileContent(agentFolder, "index.ts");

    expect(
      indexContent.includes("export const AGENT"),
      `src/agents/${agentFolder}/index.ts must export a constant named "AGENT". See docs/agent-creation-harness.md section 3.1.`,
    ).toBe(true);

    expect(
      indexContent.includes(`name: "${agentFolder}"`),
      `src/agents/${agentFolder}/index.ts must set name: "${agentFolder}". See docs/agent-creation-harness.md section 3.1.`,
    ).toBe(true);

    expect(
      indexContent.includes("satisfies AuthoredMarkdownAgent"),
      `src/agents/${agentFolder}/index.ts must use "as const satisfies AuthoredMarkdownAgent". See docs/agent-creation-harness.md section 3.1.`,
    ).toBe(true);
  });

  it.each(agentFolders)("%s frontmatter.ts uses AGENT_FRONTMATTER and satisfies type", (agentFolder) => {
    if (isLegacy(agentFolder)) return;

    const frontmatterContent = readFileContent(agentFolder, "frontmatter.ts");

    expect(
      frontmatterContent.includes("AGENT_FRONTMATTER"),
      `src/agents/${agentFolder}/frontmatter.ts must export "AGENT_FRONTMATTER". See docs/agent-creation-harness.md section 3.2.`,
    ).toBe(true);

    expect(
      frontmatterContent.includes("satisfies OpenCodeMarkdownAgentFrontmatter"),
      `src/agents/${agentFolder}/frontmatter.ts must use "as const satisfies OpenCodeMarkdownAgentFrontmatter". See docs/agent-creation-harness.md section 3.2.`,
    ).toBe(true);

    expect(
      frontmatterContent.includes(`"name": "${agentFolder}"`) ||
        frontmatterContent.includes(`name: "${agentFolder}"`) ||
        frontmatterContent.includes(`name: "${agentFolder}",`),
      `src/agents/${agentFolder}/frontmatter.ts must set name to "${agentFolder}". See docs/agent-creation-harness.md section 3.2.`,
    ).toBe(true);
  });

  it.each(agentFolders)("%s system-prompt.ts uses composePromptSections with identity and workflow", (agentFolder) => {
    if (isLegacy(agentFolder)) return;

    const systemPromptContent = readFileContent(agentFolder, "system-prompt.ts");

    expect(
      systemPromptContent.includes("composePromptSections"),
      `src/agents/${agentFolder}/system-prompt.ts must use composePromptSections to compose sections. See docs/agent-creation-harness.md section 3.15.`,
    ).toBe(true);

    expect(
      systemPromptContent.includes("AGENT_IDENTITY"),
      `src/agents/${agentFolder}/system-prompt.ts must import and include AGENT_IDENTITY as the first section. See docs/agent-creation-harness.md section 3.15.`,
    ).toBe(true);

    expect(
      systemPromptContent.includes("AGENT_BOUNDARIES"),
      `src/agents/${agentFolder}/system-prompt.ts must import and include AGENT_BOUNDARIES. See docs/agent-creation-harness.md section 3.15.`,
    ).toBe(true);

    expect(
      systemPromptContent.includes("AGENT_WORKFLOW"),
      `src/agents/${agentFolder}/system-prompt.ts must import and include AGENT_WORKFLOW. See docs/agent-creation-harness.md section 3.15.`,
    ).toBe(true);

    expect(
      systemPromptContent.includes("AGENT_OUTPUT_CONTRACT"),
      `src/agents/${agentFolder}/system-prompt.ts must import and include AGENT_OUTPUT_CONTRACT. See docs/agent-creation-harness.md section 3.15.`,
    ).toBe(true);

    expect(
      systemPromptContent.includes("AGENT_VALIDATION"),
      `src/agents/${agentFolder}/system-prompt.ts must import and include AGENT_VALIDATION. See docs/agent-creation-harness.md section 3.15.`,
    ).toBe(true);
  });

  it.each(agentFolders)("%s has output contract or output template in system prompt", (agentFolder) => {
    const systemPromptContent = readFileContent(agentFolder, "system-prompt.ts");
    const hasOutputContract = systemPromptContent.includes("AGENT_OUTPUT_CONTRACT") ||
      systemPromptContent.includes("OUTPUT_CONTRACT");
    const hasOutputTemplate = systemPromptContent.includes("AGENT_OUTPUT_TEMPLATE") ||
      systemPromptContent.includes("OUTPUT_TEMPLATE");

    expect(
      hasOutputContract || hasOutputTemplate,
      `src/agents/${agentFolder}/system-prompt.ts must include an output contract or output template. At least one is required. See docs/agent-creation-harness.md section 7.`,
    ).toBe(true);
  });

  it.each(agentFolders)("%s delegating agents have subagent-usage.ts", (agentFolder) => {
    const frontmatterContent = readFileContent(agentFolder, "frontmatter.ts");

    if (frontmatterContent.includes("task:")) {
      const subagentUsagePath = join(agentsDir, agentFolder, "subagent-usage.ts");
      expect(
        existsSync(subagentUsagePath),
        `src/agents/${agentFolder}/ has task permissions but is missing subagent-usage.ts. Delegating agents must define subagent usage. See docs/agent-creation-harness.md section 2.`,
      ).toBe(true);
    }
  });

  it("planning-agent is the only legacy exception", () => {
    for (const folder of agentFolders) {
      if (folder === "planning-agent") {
        expect(isLegacy(folder)).toBe(true);
      } else {
        expect(
          isLegacy(folder),
          `${folder} should not be a legacy exception. Only planning-agent is exempt from structural checks.`,
        ).toBe(false);
      }
    }
  });
});
