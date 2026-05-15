import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderMarkdownAgent } from "../adapters/markdown-agent";
import {
  IMPLEMENTATION_AGENT,
  ORCHESTRATOR_AGENT,
  PLANNING_AGENT,
  PR_REVIEW_AGENT,
  PROMPT_AGENT,
  RESEARCH_AGENT,
  REVIEWER_AGENT,
  TEST_FIXER_AGENT,
  VERIFIER_AGENT,
} from "../agents";
import type { AuthoredMarkdownAgent } from "../types/types";

const agents = [
  ORCHESTRATOR_AGENT,
  RESEARCH_AGENT,
  PLANNING_AGENT,
  REVIEWER_AGENT,
  IMPLEMENTATION_AGENT,
  VERIFIER_AGENT,
  TEST_FIXER_AGENT,
  PR_REVIEW_AGENT,
  PROMPT_AGENT,
] satisfies AuthoredMarkdownAgent[];

const outputDir = join(process.cwd(), ".tmp", "agents");

function main(): void {
  mkdirSync(outputDir, { recursive: true });

  for (const agent of agents) {
    const outputPath = join(outputDir, `${agent.name}.md`);
    writeFileSync(outputPath, renderMarkdownAgent(agent));
    console.log(`Generated .tmp/agents/${agent.name}.md`);
  }

  console.log(`Generated ${agents.length} Markdown agents in .tmp/agents`);
}

main();
