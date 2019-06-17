import { languages } from "monaco-editor"

import { GeneratedTypedef } from "../scripts/generate-type-dictionary"

// @ts-ignore this file is guaranteed to exist, but has variable type declarations.
import typedefs from "./__generated__/typeMap"
import compilerOptions from "./compilerOptions"

const addLibraries = () => {
  try {
    const mySet = new Set() // Let's add only unique things.
    typedefs.forEach(({ path, content }: GeneratedTypedef) => {
      if (!mySet.has(path)) {
        languages.typescript.typescriptDefaults.addExtraLib(
          content,
          "file:///" + path, // monaco expects module definitions to live under `node_modules/MODULE_NAME/index.d.ts`
        )
        mySet.add(path)
      }
    })
  } catch {
    // Monaco throws if a lib already exists. IMO it should warn and not re-add it.
  }
}

const setTypescriptDefaults = () => {
  languages.typescript.typescriptDefaults.setCompilerOptions(compilerOptions)
  languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  })
}

export const bootstrapMonaco = () =>
  new Promise((resolve, reject) => {
    try {
      addLibraries()
      setTypescriptDefaults()
      resolve("Successfully bootstrapped Monaco")
    } catch (e) {
      reject(e)
    }
  })
