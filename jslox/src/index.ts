import { readFile } from "fs/promises";
import process from "process";
import readline from "readline/promises";
import { Lexer } from "./lexer";
import { LoxError } from "./LoxError";

let lineNumber = 1;

async function runFile(filePath: string | undefined): Promise<void> {
  if (!filePath) throw new Error("Could not retrieve file");

  try {
    const input = await readFile(filePath!, "utf8");
    run(input);
  } catch (e) {
    const { message } = e as Error;
    console.error(message);
  }
}

function run(source: string) {
  const tokens = new Lexer(source).scanTokens();

  for (const token of tokens) {
    console.log(token);
  }
}

// the repl
async function runPrompt() {
  try {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: ` > `,
    });

    for await (const line of rl) {
      if (line === null || line == "exit") break;
      run(line);
      lineNumber++;
      rl.prompt();
    }

    rl.close();
  } catch (e) {
    const { message } = e as LoxError;
    const reportedLine = lineNumber;
    console.error(message, reportedLine);
  }
}

/**
 * @param {string[]} args
 */

async function lox(args: string[]) {
  if (args.length > 3) {
    console.log("Usage: jslox [script]");
  } else if (args.length === 3) {
    await runFile(args[2]).catch(console.error);
  } else {
    await runPrompt().catch(console.error);
  }
}

(async () => {
  lox(process.argv);
})();
