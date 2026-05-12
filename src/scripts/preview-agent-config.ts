import { getOpenCodePartialConfig } from "../adapters/opencode";

function main() {
  console.log(JSON.stringify(getOpenCodePartialConfig(), null, 2));
}

main();