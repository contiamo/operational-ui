import * as React from "react"

import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type Modifier = "group" | "space"

type StyleProps = {
  theme?: Theme
  color?: string
  colorOverride?: string
  active?: boolean
  modifiers?: Modifier[]
}

type Props = StyleProps & {
  className?: string
  onClick?: any
  children?: any
}

const Container = glamorous.div(({ theme, color, active, modifiers }: StyleProps): any => {
  const backgroundColor: string = color ? hexOrColor(color)(theme.colors.palette[color] || "white") as string : "white"
  const activeBackgroundColor: string = darken(backgroundColor)(5)
  const textColor = readableTextColor(backgroundColor)([theme.colors.usage.emphasizedText, "white"])
  const activeBoxShadow = theme.shadows.pressed
  const isGroup = modifiers && modifiers.indexOf("group") > -1
  const isSpace = modifiers && modifiers.indexOf("space") > -1
  const spacing = theme.spacing

  return {
    display: "inline-block",
    padding: `${spacing * 2 / 3}px ${spacing}px`,
    border: "1px solid rgba(0, 0, 0, .2)",
    borderRadius: 2,
    cursor: "pointer",
    boxShadow: active ? activeBoxShadow : "none",
    backgroundColor: active ? activeBackgroundColor : backgroundColor,
    color: textColor,
    outline: "none",

    ":hover": {
      backgroundColor: activeBackgroundColor,
      color: readableTextColor(activeBackgroundColor)(["white", "#222"]),
    },

    ":active": {
      boxShadow: activeBoxShadow,
    },

    marginLeft: isGroup ? -1 : isSpace ? spacing / 2 : "0",
  }
})

const Button: React.SFC<Props> = props => <Container tabIndex={-1} role="button" {...props} />

export default Button
