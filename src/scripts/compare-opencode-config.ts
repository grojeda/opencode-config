import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { getOpenCodePartialConfig } from "../adapters/opencode";

type OpenCodeConfigFile = {
  agent?: unknown;
};

function readCurrentOpenCodeConfig(): OpenCodeConfigFile {
  const opencodePath = resolve(process.cwd(), "opencode.json");
  const rawConfig = readFileSync(opencodePath, "utf8");

  return JSON.parse(rawConfig) as OpenCodeConfigFile;
}

function sortObjectRecursively(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortObjectRecursively);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
        .map(([key, nestedValue]) => [key, sortObjectRecursively(nestedValue)])
    );
  }

  return value;
}

function stableStringify(value: unknown): string {
  return JSON.stringify(sortObjectRecursively(value), null, 2);
}

function main() {
  const currentConfig = readCurrentOpenCodeConfig();
  const generatedConfig = getOpenCodePartialConfig();

  const currentAgentConfig = stableStringify(currentConfig.agent);
  const generatedAgentConfig = stableStringify(generatedConfig.agent);

  if (currentAgentConfig !== generatedAgentConfig) {
    throw new Error(
      [
        'Generated agent config does not match opencode.json "agent" section.',
        "",
        "Run:",
        "  pnpm preview:opencode",
        "",
        "Then update either src/config/models.ts or opencode.json so they match.",
      ].join("\n"),
    );
  }

  console.log('OpenCode "agent" config matches generated TypeScript config.');
}

main();
