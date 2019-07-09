import { languages } from "monaco-editor"

export default {
  target: languages.typescript.ScriptTarget.ESNext,
  allowNonTsExtensions: true,
  allowSyntheticDefaultImports: true,
  esModuleInterop: true,
  jsx: languages.typescript.JsxEmit.React,
  moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
  module: languages.typescript.ModuleKind.CommonJS,
  noEmit: true,
}
