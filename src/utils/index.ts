import urlRegex from "url-regex"

export { default as deprecate } from "./deprecate"
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
  backspace: 8,
  tab: 9,
  clear: 12,
  enter: 13,
  return: 13,
  capsLock: 20,
  esc: 27,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  del: 46,
  ins: 45,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
}

/**
 * Make a type and all its (sub) properties optional.
 */
export type DeepPartial<T> = T extends any[] ? DeepPartialArray<T[number]> : T extends object ? DeepPartialObject<T> : T

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = { [P in keyof T]+?: DeepPartial<T[P]> }
