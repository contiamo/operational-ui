import { css } from "glamor"
import { Theme } from "@operational/theme"

export const baseStylesheet = (theme: Theme): string => `
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: ${theme.fontFamily};
  font-size: 13px;
}

body {
  background-color: ${theme.colors.background};
}
`

export const injectStylesheet = (cssString: string): void => {
  if (!document) {
    return
  }
  const styleEl = document.createElement("style")
  styleEl.innerHTML = cssString
  document.head.appendChild(styleEl)
}

export const fadeIn = css.keyframes({
  from: {
    opacity: 0,
    transform: "translate3d(0, -6px, 0)"
  },
  to: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)"
  }
})

export const resetTransform = css.keyframes({
  to: {
    transform: "none"
  }
})

export const spin = css.keyframes({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(359deg)"
  }
})
