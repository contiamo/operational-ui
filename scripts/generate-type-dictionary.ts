import {
  readFile as oldSchoolreadFile,
  writeFile as oldSchoolwriteFile,
  exists as oldSchoolexists,
  mkdir as oldSchoolmkdir,
} from "fs"
import glob from "glob"
import chokidar from "chokidar"
import { join } from "path"
import program from "commander"
import { promisify } from "util"

const readFile = promisify(oldSchoolreadFile)
const writeFile = promisify(oldSchoolwriteFile)
const exists = promisify(oldSchoolexists)
const mkdir = promisify(oldSchoolmkdir)

export interface GeneratedTypedef {
  path: string
  content: string
}

program
  .version(require(join(__dirname, "../package.json")).version)
  .option("-w, --watch", "Watch filesystem for rebuild")
  .option("-o, --output [relative path]", "Output dictionary to a file (relative path)")
  .parse(process.argv)

const watchDir = join(__dirname, "../lib")

export const generateTypeDictionary = (outputPath = "styleguide/__generated__") =>
  new Promise(async (resolve, reject) => {
    try {
      const generatedFolder = join(__dirname, "..", outputPath)
      const parentProject = require(join(__dirname, "../package.json"))
      // This is used in Monaco. It simulates a virtual filesystem.
      const virtualModuleDir = `node_modules/${parentProject.name}`

      const parentPath = join(__dirname, "../")
      const getTypesDir = () => join(__dirname, "../lib")
      const replaceStringLiteralTokens = (str: string) => str.replace(/`/gm, "'").replace(/\$\{/gm, "{")
      const getTypedefs = async () => {
        const components = glob
          .sync(join(getTypesDir(), "**/*.d.ts"))
          .filter(path => path.includes(join(getTypesDir())))

        /**
         * Monaco requires an index.d.ts file IMMEDIATELY after the
         * module name in the path node_modules/MODULE_NAME/index.d.ts.
         *
         * Paths like node_modules/MODULE_NAME/lib/src/index.d.ts are
         * silently ignored by Monaco. index.d.ts must always be root level,
         * along with all other related type declaration modules.
         */

        // Index file uses __dirname, so we want to get all of it without the actual file name.
        const indexPath = join(__dirname, "../lib")

        const typeMap = components.map(async path => {
          return {
            path: virtualModuleDir + path.replace(indexPath, ""), // Remove the indexPath, making all other module declarations root-level.
            content: replaceStringLiteralTokens(await readFile(path, "utf8")).replace(
              new RegExp("//# sourceMappingURL=(.*)", "mgi"), // clean up garbage if any
              "",
            ),
          }
        })

        return [
          // Our type definitions
          ...(await Promise.all(typeMap)),

          // React's type definitions
          {
            path: "node_modules/@types/react/index.d.ts",
            content: replaceStringLiteralTokens(
              await readFile(join(parentPath, "node_modules/@types/react/index.d.ts"), "utf8"),
            ),
          },

          // Emotion's type definitions
          {
            path: "node_modules/@emotion/styled/index.d.ts",
            content: replaceStringLiteralTokens(
              await readFile(join(parentPath, "node_modules/@emotion/styled/types/index.d.ts"), "utf8"),
            ),
          },
          {
            path: "node_modules/@emotion/react/index.d.ts",
            content: replaceStringLiteralTokens(
              await readFile(join(parentPath, "node_modules/@emotion/react/types/index.d.ts"), "utf8"),
            ),
          },
        ]
      }

      if (!(await exists(generatedFolder))) {
        await mkdir(generatedFolder)
      }

      // Write the generated code to disk.
      await writeFile(
        join(generatedFolder, `typeMap.js`),
        `module.exports = ${JSON.stringify(await getTypedefs(), null, 2).replace(
          /"content": "(.*)"/gm,
          `"content": \`$1\``,
        )}`,
      )
    } catch (e) {
      reject(e)
    }

    resolve("Done!")
  })

if (program.output) {
  generateTypeDictionary(program.output)
}

if (program.watch) {
  // Watch mode (input folder only)
  chokidar.watch(`${watchDir}/**/*.d.ts`).on("change", generateTypeDictionary)
}
