export { default as deprecate } from "./deprecate"
export * from "./mixins"
export * from "./color"
export { default as withLabel } from "./with-label"
export { default as wrapDefaultTheme } from "./wrap-default-theme" // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/Link.js

export const isModifiedEvent = (event: any) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
