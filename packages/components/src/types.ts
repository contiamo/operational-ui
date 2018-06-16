import { Theme, OperationalStyleConstants } from "@operational/theme"
import { CSSProperties } from "glamorous"
export type WithTheme = {
  theme?: OperationalStyleConstants & {
    deprecated: Theme
  }
}
/** @todo Rethink this line with Emotion */

export type Css = any // TODO: make this stricter to disallow { margin: 20, fruit: "much much" }

export type CssStatic = CSSProperties
export interface Context {
  pushState?: (path: string) => void
  replaceState?: (path: string) => void
}
