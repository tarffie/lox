import { writeFile } from "fs/promises";
import * as process from "process";

/* for refference, remember to delete this after
   export class Test extends Error {
   public constructor() {
   super();
   }
   }
   */

const defineType = async (
  filepath: string,
  baseName: string,
  className: string,
  fieldsString: string,
): Promise<void> => {
  const fields: string[] = fieldsString.split(",").map((field) => field.trim());
  const constructorParams: string[] = [];
  const classProperties: string[] = [];

  for (const field of fields) {
    const fieldParts = field.split(":");
    if (fieldParts.length !== 2) {
      console.error(`Invalid field definition: ${field}`);
      continue;
    }

    const fieldName = fieldParts[0]!.trim();
    const fieldType = fieldParts[1]!.trim();

    constructorParams.push(`public readonly ${fieldName} : ${fieldType}`);
    classProperties.push(`  readonly ${fieldName} : ${fieldType};`);
  }

  try {
    // class head
    await writeFile(
      filepath,
      `export class ${className} extends ${baseName} {\n`,
      {
        flag: "a+",
      },
    );

    await writeFile(
      filepath,
      `  constructor(${constructorParams.join(", ")}) {\n`,
      { flag: "a+" },
    );
    await writeFile(filepath, `    super();\n`, { flag: "a+" });
    await writeFile(filepath, `  }\n`, {
      flag: "a+",
    });

    await writeFile(filepath, `}\n`, { flag: "a+" });
  } catch (e) {
    const { message } = e as Error;
    console.error(message);
  }
};

const defineAst = async (
  outputDir: string,
  baseName: string,
  types: Array<string>,
): Promise<void> => {
  const filepath: string = outputDir + "/" + baseName.toLowerCase() + ".ts";

  try {
    await writeFile(filepath, `import { Token } from "../token";\n`, {
      flag: "a+",
    });

    await writeFile(filepath, `export abstract class ${baseName} {`, {
      flag: "a+",
    });

    await writeFile(filepath, `}\n`, { flag: "a+" });

    for (const type of types) {
      const parts = type.split(">");
      if (parts.length !== 2) {
        console.error(`Invalid type definition: ${type}\n`);
        continue;
      }

      const className: string = parts[0]!.trim();
      const fieldString: string = parts[1]!.trim();
      /*
       * where I need to capture type for arguments
       */
      await defineType(filepath, baseName, className, fieldString);
    }
  } catch (e) {
    const { message } = e as Error;
    console.error(message);
  }
};

/**
 * A Function which receives a path through cli to generate AST
 * @param {string[]} args
 */
const generateAst = async (args: string[]): Promise<void> => {
  //   0     1            2
  // node generate <output directory>
  const outputDir: string | undefined = args[2];

  if (!outputDir) {
    console.error("Usage: generate_ast <output directory>\n");
    return;
  }

  defineAst(outputDir, "Expr", [
    "Binary   > left: Expr, operator: Token , right: Expr ",
    "Grouping > expression: Expr ",
    "Literal  > value: any ",
    "Unary    > operator: Token , right: Expr ",
  ]);

  console.log(`Generated AST classes in ${outputDir}/expr.ts`);
};

(async () => {
  generateAst(process.argv);
})();
