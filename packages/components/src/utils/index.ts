/**
 * What is the purpose of this file?
 * Can we not use @operational/utils?
 */
export { default as deprecate } from "./deprecate"
export * from "./mixins"
export * from "./color"
export { default as withLabel } from "./with-label"
export { default as wrapDefaultTheme } from "./wrap-default-theme"

export const isModifiedEvent = (event: any) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
