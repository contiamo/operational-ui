import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"

import { readableTextColor, darken, lighten } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"
import { isWhite } from "./utils/color"

export interface IStyleProps {
  theme?: Theme
  color?: string
  active?: boolean
  disabled?: boolean
  condensed?: boolean
}

export interface Props {
  id?: string | number
  css?: any
  className?: string
  onClick?: any
  type?: string
  children?: React.ReactNode
  color?: string
  active?: boolean
  disabled?: boolean
  condensed?: boolean
}

const Container = glamorous.button(({ theme, color, active, disabled, condensed }: IStyleProps): any => {
  const defaultColor: string = theme.colors.white
  const backgroundColor: string = expandColor(theme, color) || defaultColor
  const activeBackgroundColor: string = darken(backgroundColor, 5)
  const textColor = readableTextColor(backgroundColor, [theme.colors.emphasizedText, "white"])
  const activeBoxShadow = theme.shadows.pressed
  const spacing = theme.spacing

  return {
    label: "button",
    ...theme.typography.body,
    display: "inline-block",
    padding: condensed ? `${spacing / 3}px ${spacing}px` : `${spacing * 2 / 3}px ${spacing * 2}px`,
    borderRadius: 2,
    border: "1px solid",
    borderColor: isWhite(backgroundColor) ? theme.colors.gray30 : active ? activeBackgroundColor : backgroundColor,
    cursor: disabled ? "auto" : "pointer",
    boxShadow: active ? activeBoxShadow : "none",
    backgroundColor: active ? activeBackgroundColor : backgroundColor,

    color: textColor,
    opacity: disabled ? 0.6 : 1.0,
    outline: "none",

    ...!disabled
      ? {
          ":hover": {
            backgroundColor: activeBackgroundColor,
            color: readableTextColor(activeBackgroundColor, ["white", "#222"])
          },

          ":focus": {
            outline: 0,
            boxShadow: `0 0 0 3px ${lighten(backgroundColor, 35)}`
          },

          ":active": {
            boxShadow: activeBoxShadow
          }
        }
      : {},

    marginRight: spacing / 2
  }
})

const Button = (props: Props) => (
  <Container
    type={props.type}
    key={props.id}
    css={props.css}
    className={props.className}
    onClick={props.disabled ? null : props.onClick}
    color={props.color}
    active={props.active}
    disabled={props.disabled}
    condensed={props.condensed}
  >
    {props.children}
  </Container>
)

export default Button
