import * as React from "react"

import { IconComponentType } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import Spinner from "../Spinner/Spinner"
import { DefaultProps } from "../types"
import { darken, inputFocus, isModifiedEvent, isOutsideLink, isWhite, readableTextColor } from "../utils"
import { expandColor, OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export interface ButtonProps extends DefaultProps {
  /** Invoked when you click on the button */
  onClick?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  type?: string
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Button color theme (hex or named color from `theme.color`) */
  color?: string
  /** Button color theme (hex or named color from `theme.color`) */
  textColor?: keyof OperationalStyleConstants["color"] | string
  /** Icon to display on right or left of button (optional) */
  icon?: IconComponentType
  /** Icon position */
  iconPosition?: "start" | "end"
  /** Icon size */
  iconSize?: number
  /** Icon color */
  iconColor?: string
  /** Loading flag - if enabled, the text hides and a spinner appears in the center */
  loading?: boolean
  /** Disabled option */
  disabled?: boolean
  /** Condensed option */
  condensed?: boolean
  /** Should the button fill its container? */
  fullWidth?: boolean
  /** What is the tab index, for accessibility? */
  tabIndex?: number
  children?: React.ReactNode
}

export const makeColors = (theme: OperationalStyleConstants, color: string) => {
  const defaultColor = theme.color.white

  const backgroundColors: { [key: string]: string } = {
    grey: theme.color.background.light,
    warning: defaultColor,
  }

  const textColors: { [key: string]: string } = {
    grey: theme.color.text.action,
    warning: theme.color.error,
  }

  const backgroundColor = backgroundColors[color] || expandColor(theme, color) || defaultColor
  const textColor =
    textColors[color] || readableTextColor(backgroundColor, [theme.color.text.default, theme.color.white])
  return {
    background: backgroundColor,
    foreground: textColor,
  }
}

const ButtonSpinner = styled(Spinner)<{ containerColor?: ButtonProps["color"] }>(({ theme, containerColor }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  color: makeColors(theme, containerColor || "").foreground,
}))

const BaseButton = styled<"button" | "a">("button")<{
  condensed?: ButtonProps["condensed"]
  loading?: ButtonProps["loading"]
  fullWidth?: ButtonProps["fullWidth"]
  textColor?: ButtonProps["textColor"]
  disabled?: ButtonProps["disabled"]
  color_?: ButtonProps["color"]
  as?: "button" | "a"
}>(({ theme, color_, disabled, condensed, loading, fullWidth, textColor }) => {
  const { background: backgroundColor, foreground: foregroundColor } = makeColors(theme, color_ || "")
  return {
    backgroundColor,
    lineHeight: `${condensed ? 26 : 34}px`,
    minWidth: "max-content",
    fontSize: theme.font.size.small,
    fontFamily: theme.font.family.main,
    fontWeight: theme.font.weight.medium,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `0 ${condensed ? theme.space.medium : theme.space.element}px`,
    borderRadius: theme.borderRadius,
    border: isWhite(backgroundColor) ? `1px solid ${theme.color.border.disabled}` : 0,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1.0,
    position: "relative",
    width: fullWidth ? "100%" : "initial",
    marginRight: theme.space.small,
    // Apply styles with increased specificity to override defaults
    "&, a:link&, a:visited&": {
      textDecoration: "none",
      color: loading ? "transparent" : expandColor(theme, textColor) || foregroundColor,
    },
    "&:focus": {
      ...inputFocus({ theme, isError: color_ === "error" }),
      border: isWhite(backgroundColor) ? theme.shadows.insetFocus : 0,
      //Higher zIndex will make right border appear on ButtonGroup Focus.
      zIndex: theme.zIndex.confirm,
    },
    ...(!disabled
      ? {
          ":hover": {
            backgroundColor: darken(backgroundColor, 5),
            border: isWhite(backgroundColor) ? theme.shadows.insetFocus : 0,
            zIndex: theme.zIndex.confirm,
          },
        }
      : {}),
  }
})

const Button: React.SFC<ButtonProps> = ({
  to,
  children,
  icon: Icon,
  iconPosition,
  iconSize = 18,
  iconColor,
  color,
  onClick,
  tabIndex,
  ...props
}) => {
  const iconProps = { size: iconSize, color: iconColor }

  return (
    <OperationalContext>
      {ctx => (
        <BaseButton
          {...props}
          as={to ? "a" : undefined}
          role="button"
          aria-label={typeof children === "string" ? children : undefined}
          tabIndex={tabIndex}
          color_={color}
          href={to}
          onClick={(ev: React.SyntheticEvent<React.ReactNode>) => {
            if (props.disabled) {
              ev.preventDefault()
              return
            }

            if (onClick) {
              onClick()
            }

            if (!isModifiedEvent(ev) && ctx.pushState && to && !isOutsideLink(to)) {
              ev.preventDefault()
              ctx.pushState(to)
            }
          }}
          title={props.loading && children === String(children) ? String(children) : undefined}
        >
          {Icon && iconPosition === "start" && <Icon left {...iconProps} />}
          {children}
          {Icon && iconPosition === "end" && <Icon right {...iconProps} />}
          {props.loading && <ButtonSpinner containerColor={color} />}
        </BaseButton>
      )}
    </OperationalContext>
  )
}

Button.defaultProps = {
  iconPosition: "end",
}

export default Button
