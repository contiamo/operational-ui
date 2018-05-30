import { Theme } from "@operational/theme"
import { CSSProperties } from "glamorous"

export type WithTheme = { theme: Theme }

export type Css = CSSProperties | (<T>(props: T & WithTheme) => CSSProperties)

// TODO: make this stricter to disallow { margin: 20, fruit: "much much" }
export type CssStatic = CSSProperties

export interface Context {
  pushState?: (path: string) => void
  replaceState?: (path: string) => void
}
