import { readFile } from "fs/promises";
import process from "process";
import readline from "readline/promises";
import { Lexer } from "./lexer";
import { LoxError } from "./LoxError";

let lineNumber = 0;

async function runFile(filePath: string | undefined): Promise<void> {
  if (!filePath) throw new Error("Could not retrieve file");
  const input = await readFile(filePath!, "utf8");
  run(input);
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
    const error = e as Error;
    const reportedLine = lineNumber;
    throw new LoxError(reportedLine, error.message);
  }
}

/**
 * @param {Array<string>} args
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
  await lox(process.argv);
})()
