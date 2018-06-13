import { Theme } from "@operational/theme"
import { CSSProperties } from "glamorous"
import { Interpolation } from "create-emotion"

export type WithTheme = { theme: Theme }

export type Css = any

// TODO: make this stricter to disallow { margin: 20, fruit: "much much" }
export type CssStatic = CSSProperties

export interface Context {
  pushState?: (path: string) => void
  replaceState?: (path: string) => void
}
