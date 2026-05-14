import { renderMarkdownAgent } from "../adapters/markdown-agent";
import { PLANNING_AGENT } from "../agents/planning-agent";

function main() {
  console.log(renderMarkdownAgent(PLANNING_AGENT));
}

main();
