import urlRegex from "url-regex"

export { default as deprecate } from "./deprecate"
export * from "./mixins"
export * from "./color"
export { default as wrapDefaultTheme } from "./wrap-default-theme"

export const isModifiedEvent = (event: any) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

export const isOutsideLink = (url: string) => urlRegex({ exact: true }).test(url)

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

/**
 * Make a type and all its (sub) properties optional.
 */
export type DeepPartial<T> = T extends any[] ? DeepPartialArray<T[number]> : T extends object ? DeepPartialObject<T> : T

interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = { [P in keyof T]+?: DeepPartial<T[P]> }
