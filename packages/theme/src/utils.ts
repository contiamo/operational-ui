import { Theme } from "./index"

/*
 * Expands a color expressed either as a custom hex value
 * or a color key to pick from within the theme.colors object.
 */
/*
 * This version is for use with the old theme, and is deprecated in favour of the version
 * in @operational/utils which can be used for components that use OperationalStyleConstants rather than Theme
 */
export const expandColor = (theme: Theme, color?: string): string | null => {
  if (!color) {
    return null
  }
  const hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|currentColor/i
  const isHex = hexRegEx.test(color)
  if (isHex) {
    return color
  }
  // || null is necessary to coerce undefineds into nulls
  return (theme.colors as any)[color] || (null as string | null)
}
