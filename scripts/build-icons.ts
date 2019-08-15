import svgr from "@svgr/core"
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync, copyFileSync } from "fs"
import * as rimraf from "rimraf"
import { join, parse, sep } from "path"
import ProgressBar from "progress"
import program from "commander"
import chokidar from "chokidar"
import base64Img from "base64-img"

program
  .version(require("../package.json").version)
  .option("-o, --output [relative path]", "Output folder")
  .option("-i, --input [relative path]", "Input folder")
  .option("-c, --clean", "Clean output folder before processing")
  .option("-w, --watch", "Watch filesystem for rebuild")
  .parse(process.argv)

const inputFolder = join(__dirname, "..", program.input || "./icons")
const outputFolder = join(__dirname, "..", program.output || "./src/Icon")

// Make sure the output folder is clean
if (program.clean) {
  rimraf.sync(`${outputFolder}/*.tsx`)
}

/**
 * Main function.
 *
 * @param iconPath Given icon path on watch mode
 */
export const buildIcons = (iconPath?: string) =>
  new Promise((resolve, reject) => {
    try {
      // Ensure the output folder exists
      if (!existsSync(outputFolder)) {
        mkdirSync(outputFolder)
      }

      const files = readdirSync(inputFolder).filter(i => {
        if (!/\.svg$/.exec(i)) return false
        if (iconPath && iconPath.split(sep)[1] !== i) return false
        return true
      })

      // Create a progress bar for a pretty output
      const progressBar = iconPath
        ? {
            tick() {
              console.log(`  ${iconPath.split(sep)[1]} was recompiled!`)
            },
          }
        : new ProgressBar("  creating icons react components [:bar] :percent", files.length)

      /**
       * Component template.
       *
       * ref: https://www.smooth-code.com/open-source/svgr/docs/typescript/
       */
      const template = ({ template }, opts, { componentName, jsx }) => {
        const typeScriptTpl = template.smart(
          `
    import * as React from "react"
    import constants, { expandColor } from "../utils/constants"
    import { IconProps, Svg } from "./_base"
    
    /**
     * {{previewImage}}
     */
    export const COMPONENT_NAME = ({size = 18, color, ...props}: IconProps) => {
      const iconColor: string = expandColor(constants, color) || "currentColor";
    
      return (
        JSX
      )
    }
    `,
          { plugins: ["typescript"], preserveComments: true },
        )
        return typeScriptTpl({
          COMPONENT_NAME: componentName,
          JSX: jsx,
        })
      }

      // Copy everything into this repository
      files.forEach(fileName => {
        const { name } = parse(fileName)
        const svgCode = readFileSync(join(inputFolder, fileName), "utf-8")
        try {
          let output = svgr.sync(
            svgCode,
            {
              prettier: true,
              svgo: true,
              plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
              svgProps: {
                fill: "{iconColor}",
                width: "{size}",
                height: "{size}",
                size: "{size}",
                role: '{props.onClick ? "button" : undefined}',
                tabIndex: "{props.onClick ? 0 : undefined}",
              },
              template,
            },
            { componentName: `${name}Icon` },
          )

          // Add a preview in the documentation
          const preview = base64Img.base64Sync(join(inputFolder, fileName))
          const previewImage = `![${name}Icon](${preview}) `
          output = output.replace("{{previewImage}}", previewImage)

          // Replace `<svg>` by `<Svg>` because
          // first one is default React component,
          // second one is custom styled component which provides hover styles
          output = output.replace("<svg", "<Svg")
          output = output.replace("</svg>", "</Svg>")

          writeFileSync(join(outputFolder, `Icon.${name}.tsx`), output)
          progressBar.tick()
        } catch (e) {
          console.error(`\nError: ${name}Icon can't be generated!`)
          console.error(e)
        }
      })

      // Don't update the index if we are in watch mode
      // This prevent to break the components summary
      if (iconPath) return

      // Create _base.tsx
      const base = readFileSync(join(__dirname, "BaseIcon.template.tsx"), { encoding: "utf8" }).replace(
        `"../src/utils/styled"`,
        `"../utils/styled"`,
      )
      writeFileSync(join(outputFolder, "_base.tsx"), base)

      // Create index.ts
      const index =
        'export { IconProps, IconComponentType } from "./_base"\n' +
        files.map(fileName => `export * from "./Icon.${parse(fileName).name}"`).join("\n")
      writeFileSync(join(outputFolder, "index.tsx"), index)

      // Create Icon.tsx
      copyFileSync(join(__dirname, "DummyIcon.template.tsx"), join(outputFolder, "Icon.tsx"))
      resolve()
    } catch (e) {
      reject(e)
    }
  })

if (program.output) {
  buildIcons().catch(console.error)
}

// Watch mode (input folder only)
if (program.watch) {
  chokidar.watch([`${inputFolder}/**.svg`]).on("change", buildIcons)
}
