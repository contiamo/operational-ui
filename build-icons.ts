import svgr from "@svgr/core"
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from "fs"
import * as rimraf from "rimraf"
import { join, parse } from "path"
import * as ProgressBar from "progress"
import * as program from "commander"
import * as chokidar from "chokidar"

program
  .version(require("./package.json").version)
  .option("-o, --output [relative path]", "Output folder")
  .option("-i, --input [relative path]", "Input folder")
  .option("-c, --clean", "Clean output folder before processing")
  .option("-w, --watch", "Watch filesystem for rebuild")
  .parse(process.argv)

const inputFolder = program.input || "./icons"
const outputFolder = program.output || "./src/Icon"

// Make sure the output folder is clean
if (program.clean) {
  rimraf.sync(`${outputFolder}/*.tsx`)
}

// Ensure the output folder exists
if (!existsSync(outputFolder)) {
  mkdirSync(outputFolder)
}

const run = () => {
  console.clear()
  const files = readdirSync(inputFolder).filter(i => /\.svg$/.exec(i))

  // Create a progress bar for a pretty output
  const progressBar = new ProgressBar("  creating icons react components [:bar] :percent", files.length)

  /**
   * Component template.
   *
   * ref: https://www.smooth-code.com/open-source/svgr/docs/typescript/
   */
  function template({ template }, opts, { componentName, jsx }) {
    const typeScriptTpl = template.smart({ plugins: ["typescript"] })
    return typeScriptTpl.ast`
    import * as React from "react";
    import constants, { expandColor } from "../utils/constants";
    import { IconProps } from "./Icon";
    export const ${componentName} = ({size = 18, color, left, right, ...props}: React.SVGProps<SVGSVGElement> & IconProps) => {
      const iconColor: string = expandColor(constants, color) || "currentColor";
      const style = {
        marginLeft: right ? 8 : 0, // theme.space.small
        marginRight: left ? 8 : 0, // theme.space.small
        cursor: Boolean(props.onClick) ? "pointer" : "default",
        transition: "fill .075s ease"
      };
  
      return ${jsx}
    };
  `
  }

  // Copy everything into this repository
  files.forEach(fileName => {
    const { name } = parse(fileName)
    const svgCode = readFileSync(join(inputFolder, fileName), "utf-8")
    const output = svgr.sync(
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
    writeFileSync(join(outputFolder, `Icon.${name}.tsx`), output)
    progressBar.tick()
  })

  // Create Icon.ts
  const index = `import React from "react"

export interface IconPropsBase {
  /**
   * Size
   *
   * @default 18
   */
  size?: number
  /** Icon color, specified as a hex, or a color name (info, success, warning, error) */
  color?: string
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
}

run()

// Watch mode (input folder only)
if (program.watch) {
  chokidar.watch([`${inputFolder}/**.svg`]).on("change", run)
}
