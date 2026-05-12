import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getOpenCodePartialConfig } from "../adapters/opencode";

const outputPath = resolve(process.cwd(), "opencode.generated.json");

function main() {
  const generatedConfig = getOpenCodePartialConfig();

  writeFileSync(
    outputPath,
    `${JSON.stringify(generatedConfig, null, 2)}\n`,
    "utf8"
  );

  console.log(`Generated ${outputPath}`);
}

main();