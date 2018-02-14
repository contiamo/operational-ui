import { Theme } from "./index"

/*
 * Expands a color expressed either as a custom hex value
 * or a color key to pick from within the theme.colors object.
 */
export const expandColor = (theme: Theme, color?: string): string | null => {
  if (!color) {
    return null
  }
  const hexRegEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i
  const isHex = hexRegEx.test(color)
  if (isHex) {
    return color
  }
  // || null is necessary to coerce undefineds into nulls
  return (theme.colors as any)[color] || (null as string | null)
}
