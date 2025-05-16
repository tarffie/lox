import { readFile } from "fs/promises";
import { Lexer } from "./lexer.mjs";
import process from "process";
import readline from "readline/promises";
import { LoxError } from "./LoxError.mjs";

let lineNumber = new Number(0);

async function runFile(filePath) {
  const input = await readFile(filePath, "utf8");
  run(input);
}

function run(source) {
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
      rl.prompt();
    }

    rl.close();
  } catch (e) {
    const reportedLine = lineNumber;
    throw new LoxError(reportedLine, e);
  }
}

/**
 * @param {Array} args
 */
async function lox(args) {
  if (args.length > 3) {
    console.log("Usage: jslox [script]");
  } else if (args.length === 3) {
    await runFile(args[2]).catch(console.error);
  } else {
    await runPrompt().catch(console.error);
  }
}

await lox(process.argv);
