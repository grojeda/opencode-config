import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderMarkdownAgent } from "../adapters/markdown-agent";
import { markdownAgents } from "../agents/markdown-agents";

const outputDir = join(process.cwd(), "agents");

function main(): void {
  mkdirSync(outputDir, { recursive: true });

  for (const agent of markdownAgents) {
    const outputPath = join(outputDir, `${agent.name}.md`);
    writeFileSync(outputPath, renderMarkdownAgent(agent));
    console.log(`Generated agents/${agent.name}.md`);
  }

  console.log(`Generated ${markdownAgents.length} Markdown agents in agents`);
}

main();
