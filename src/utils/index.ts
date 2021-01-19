import urlRegex from "url-regex"

export * from "./mixins"
export * from "./color"
export { default as wrapDefaultTheme } from "./wrap-default-theme"

export const isModifiedEvent = (event: any) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

export const isOutsideLink = (url: string) => urlRegex({ exact: true }).test(url)

/**
 * Detect if a key event originated from a cmd+enter
 */
export const isCmdEnter = (ev: React.KeyboardEvent<HTMLElement>) => {
  const crossBrowserSafeKeycode = ev.which || ev.keyCode
  const modifierKey = ev.ctrlKey || ev.metaKey
  return crossBrowserSafeKeycode === keyCodes.enter && modifierKey
}

/**
 * Return the initials in 2 letters from a full name.
 *
 * @param name
 */
export const getInitials = (name: string): string => {
  name = name.trim()
  if (!name) {
    return ""
  }
  const fullInitials = name
    .split(" ")
    .map(([firstLetter]) => firstLetter.toUpperCase())
    .join("")

  const [firstInitial, , lastInitial] = fullInitials
  return fullInitials.length > 2 ? firstInitial + lastInitial : fullInitials
}

export const keyCodes = {
  /** 38 */
  up: 38,

  /** 40 */
  down: 40,

  /** 13 */
  enter: 13,

  /** 27 */
  esc: 27,
}

/**
 * Make a type and all its (sub) properties optional.
 */
export type DeepPartial<T> = T extends any[] ? DeepPartialArray<T[number]> : T extends object ? DeepPartialObject<T> : T

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = { [P in keyof T]+?: DeepPartial<T[P]> }
