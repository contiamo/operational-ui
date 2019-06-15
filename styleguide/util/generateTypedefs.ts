import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import glob from "glob"
import chokidar from "chokidar"
import { join } from "path"
import program from "commander"

export interface GeneratedTypedef {
  path: string
  content: string
}

program
  .version(require(join(__dirname, "../../package.json")).version)
  .option("-w, --watch", "Watch filesystem for rebuild")
  .parse(process.argv)

const watchDir = join(__dirname, "../../lib")

const run = () =>
  new Promise((resolve, reject) => {
    try {
      const generatedFolder = join(__dirname, "../__generated__")

      const parentProject = require(join(__dirname, "../../package.json"))
      const parentPath = join(__dirname, "../../")

      const getTypesDir = () => join(__dirname, "../../lib")

      // This is used in Monaco. It simulates a virtual filesystem.
      const virtualModuleDir = `node_modules/${parentProject.name}`

      const replaceStringLiteralTokens = (str: string) => str.replace(/`/gm, "'").replace(/\$\{/gm, "{")

      const getReactTypedefs = () => {
        const reactInCurrentProject = `${parentPath}/node_modules/@types/react/index.d.ts`
        if (existsSync(reactInCurrentProject)) {
          return readFileSync(reactInCurrentProject, "utf8")
        }

        const reactInThisProject = join(__dirname, "../../node_modules/@types/react/index.d.ts")
        return readFileSync(reactInThisProject, "utf8")
      }

      const getTypedefs = (): GeneratedTypedef[] => {
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

        const indexFile =
          components.find(
            component => component.includes("index.d.ts") && component.includes(join(parentPath, getTypesDir())),
          ) || ""

        // Index file uses __dirname, so we want to get all of it without the actual file name.
        const indexPath = join(__dirname, "../../lib")

        const typeMap = components.map(path => {
          return {
            path: virtualModuleDir + path.replace(indexPath, ""), // Remove the indexPath, making all other module declarations root-level.
            content: replaceStringLiteralTokens(readFileSync(path, "utf8")).replace(
              new RegExp("//# sourceMappingURL=(.*)", "mgi"), // clean up garbage if any
              "",
            ),
          }
        })

        return [
          // Our type definitions
          ...typeMap,

          // React's type definitions
          {
            path: "node_modules/@types/react/index.d.ts",
            content: replaceStringLiteralTokens(getReactTypedefs()),
          },
        ]
      }

      if (!existsSync(generatedFolder)) {
        mkdirSync(generatedFolder)
      }

      // Write the generated code to disk.
      writeFileSync(
        join(generatedFolder, `typeMap.js`),
        `module.exports = ${JSON.stringify(getTypedefs(), null, 2).replace(
          /"content": "(.*)"/gm,
          `"content": \`$1\``,
        )}`,
      )
    } catch (e) {
      reject(e)
    }

    resolve("Done!")
  })

run()

if (program.watch) {
  // Watch mode (input folder only)
  chokidar.watch(watchDir).on("change", run)
}
