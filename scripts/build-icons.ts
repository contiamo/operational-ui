import svgr from "@svgr/core"
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from "fs"
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
    import { IconProps } from "./Icon"
    import IconButton from "../Internals/IconButton"
    
    /**
     * {{previewImage}}
     */
    export const COMPONENT_NAME = ({size = 18, color, left, right, onClick, ...props}: IconProps) => {
      const iconColor: string = expandColor(constants, color) || "currentColor";
      const style = {
        // theme.space.small
        marginLeft: right ? 8 : 0,
        // theme.space.small
        marginRight: left ? 8 : 0,
        cursor: Boolean(onClick) ? "pointer" : "default",
        transition: "fill .075s ease",
      };
    
      const icon = (
        JSX
      )
      
      // {{iconButtonVariant}}

      return icon
    };
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
                style: "{style}",
              },
              template,
            },
            { componentName: `${name}Icon` },
          )

          // Add a preview in the documentation
          const preview = base64Img.base64Sync(join(inputFolder, fileName))
          const previewImage = `![${name}Icon](${preview}) `
          output = output.replace("{{previewImage}}", previewImage)

          // Add IconButton variant
          const iconButtonChunk = `

  if (onClick) {
    return (
      <IconButton size={size + 8} onClick={onClick}>
        {icon}
      </IconButton>
    )
  }`
          output = output.replace("// {{iconButtonVariant}}", iconButtonChunk)

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

      // Create Icon.ts
      const index = `import React, { MouseEventHandler } from "react"

export interface IconPropsBase {
  /**
   * Size
   *
   * @default 18
   */
  size?: number
  /** Icon color, specified as a hex, or a color name (info, success, warning, error) */
  color?: string
  /**
   * On click handler
   */
  onClick?: MouseEventHandler
}

export type IconProps =
  | (IconPropsBase & {
      left?: never
      /**
       * Indicates that this component is right of other content, and adds an appropriate left margin.
       */
      right?: boolean
    })
  | (IconPropsBase & {
      /**
       * Indicates that this component is left of other content, and adds an appropriate right margin.
       */
      left?: boolean
      right?: never
    })

export type IconComponentType = React.ComponentType<React.SVGProps<SVGSVGElement> & IconProps>
  
${files
  .map(fileName => {
    const { name } = parse(fileName)

    return `export * from "./Icon.${name}";`
  })
  .join("\n")}
`

      writeFileSync(join(outputFolder, "Icon.tsx"), index)
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
