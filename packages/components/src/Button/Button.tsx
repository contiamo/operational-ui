import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { readableTextColor, darken, lighten } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

import { isWhite } from "../utils/color"
import { WithTheme, Css, CssStatic } from "../types"
import Spinner from "../Spinner/Spinner"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Invoked when you click on the button */
  onClick?: React.HTMLProps<HTMLButtonElement>["onClick"]
  type?: string
  children?: React.ReactNode
  /** Color assigned to the avatar circle (hex or named color from `theme.colors`) */
  color?: string
  /** Loading flag - if enabled, the text hides and a spinner appears in the center */
  loading?: boolean
  /** Active state */
  active?: boolean
  /** Disabled option */
  disabled?: boolean
  /** Condensed option */
  condensed?: boolean
}

const Container = glamorous.button(
  ({
    theme,
    color,
    active,
    disabled,
    condensed,
    loading,
  }: {
    theme: Theme
    color?: string
    active?: boolean
    disabled?: boolean
    condensed?: boolean
    loading?: boolean
  }): CssStatic => {
    const defaultColor: string = theme.colors.white
    const backgroundColor: string = expandColor(theme, color) || defaultColor
    const activeBackgroundColor: string = darken(backgroundColor, 5)
    const foregroundColor = readableTextColor(backgroundColor, [theme.colors.text, "white"])
    const spacing = theme.spacing

    return {
      label: "button",
      ...theme.typography.body,
      display: "inline-block",
      padding: condensed ? `${spacing / 8}px ${spacing / 2}px` : `${spacing * 0.375}px ${spacing * 1.5}px`,
      borderRadius: theme.borderRadius,
      border: "1px solid",
      borderColor: isWhite(backgroundColor) ? theme.colors.gray : active ? activeBackgroundColor : backgroundColor,
      cursor: disabled ? "auto" : "pointer",
      backgroundColor: active ? activeBackgroundColor : backgroundColor,
      color: loading ? "transparent" : foregroundColor,
      opacity: disabled ? 0.6 : 1.0,
      outline: "none",
      position: "relative",

      "& .op_button-spinner": {
        color: foregroundColor,
      },

      ...!disabled
        ? {
            ":hover": {
              backgroundColor: activeBackgroundColor,
              color: loading ? "transparent" : readableTextColor(activeBackgroundColor, ["white", "#222"]),
            },

            ":focus": {
              outline: 0,
              boxShadow: `0 0 0 3px ${lighten(backgroundColor, 35)}`,
            },
          }
        : {},

      marginRight: spacing / 2,
    }
  }
)

const Button = (props: Props) => (
  <Container
    type={props.type}
    id={props.id}
    css={props.css}
    className={props.className}
    onClick={props.disabled ? null : props.onClick}
    color={props.color}
    loading={props.loading}
    active={props.active}
    disabled={props.disabled}
    condensed={props.condensed}
    title={props.loading && props.children === String(props.children) ? String(props.children) : undefined}
  >
    {props.children}
    {props.loading && (
      <Spinner
        className="op_button-spinner"
        color="currentColor"
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate3d(-50%, -50%, 0)",
        }}
      />
    )}
  </Container>
)

export default Button
