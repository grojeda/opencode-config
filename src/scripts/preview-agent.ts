import { renderMarkdownAgent } from "../adapters/markdown-agent";
import { markdownAgents } from "../agents/markdown-agents";
import type { AgentName } from "../types/types";

function main(): void {
  const agentName = process.argv[2] as AgentName | undefined;

  if (!agentName) {
    const names = markdownAgents.map((agent) => agent.name).join(", ");
    throw new Error(`Usage: pnpm preview:agent <agent-name>. Available: ${names}`);
  }

  const agent = markdownAgents.find((candidate) => candidate.name === agentName);

  if (!agent) {
    const names = markdownAgents.map((candidate) => candidate.name).join(", ");
    throw new Error(`Unknown agent "${agentName}". Available: ${names}`);
  }

  console.log(renderMarkdownAgent(agent));
}

main();
