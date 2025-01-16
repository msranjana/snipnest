import { Command } from "commander";

import { listSnippets } from "./commands/list";

import packageJson from "../../package.json";
import { newSnippet } from "./commands/new";

const program = new Command();

program
  .version(packageJson.version)
  .description("SnipNest CLI for easily managing snippets")
  .option("-l, --ls", "List all snippets")
  .option("-n, --new", "Create a new snippet")
  .showSuggestionAfterError(true)
  .parse(process.argv);

const options = program.opts();

async function main() {
  if (options.ls) {
    return await listSnippets();
  }

  if (options.new) {
    return await newSnippet();
  }

  console.log("Type `pnpm snipnest -h` for help.");
}

(async () => {
  await main();
})();
