import * as React from "react"
import styled, { Interpolation, Themed } from "react-emotion"

import Icon, { IconName } from "../Icon/Icon"
import OperationalContext from "../OperationalContext/OperationalContext"
import Spinner from "../Spinner/Spinner"
import { DefaultProps } from "../types"
import { darken, isModifiedEvent, isOutsideLink, isWhite, readableTextColor } from "../utils"
import { expandColor, OperationalStyleConstants } from "../utils/constants"

export interface ButtonProps extends DefaultProps {
  /** Invoked when you click on the button */
  onClick?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  type?: string
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Button color theme (hex or named color from `theme.color`) */
  color?: string
  /** Icon to display on right or left of button (optional) */
  icon?: IconName
  /** Icon position */
  iconPosition?: "start" | "end"
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
  children?: React.ReactNode
}

const makeColors = (theme: OperationalStyleConstants, color: string) => {
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

const containerStyles: Interpolation<
  Themed<
    {
      color_?: ButtonProps["color"]
      disabled?: boolean
      condensed?: ButtonProps["condensed"]
      loading?: ButtonProps["loading"]
      fullWidth?: ButtonProps["fullWidth"]
    },
    OperationalStyleConstants
  >
> = ({ theme, color_, disabled, condensed, loading, fullWidth }) => {
  const { background: backgroundColor, foreground: foregroundColor } = makeColors(theme, color_ || "")
  return {
    backgroundColor,
    lineHeight: `${condensed ? 28 : 36}px`,
    label: "button",
    fontSize: theme.font.size.small,
    fontFamily: theme.font.family.main,
    fontWeight: theme.font.weight.medium,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `0 ${condensed ? theme.space.medium : theme.space.element}px`,
    borderRadius: theme.borderRadius,
    border: 0,
    boxShadow: isWhite(backgroundColor) ? `0 0 0 1px ${theme.color.border.disabled} inset` : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1.0,
    outline: "none",
    position: "relative",
    width: fullWidth ? "100%" : "initial",
    // Apply styles with increased specificity to override defaults
    "&, a:link&, a:visited&": {
      textDecoration: "none",
      color: loading ? "transparent" : foregroundColor,
    },
    ...(!disabled
      ? {
          ":hover": {
            backgroundColor: darken(backgroundColor, 5),
          },
        }
      : {}),
    marginRight: theme.space.small,
  }
}

const Container = styled("button")(containerStyles)
const ContainerLink = styled("a")(containerStyles)

const ButtonSpinner = styled(Spinner)<{ containerColor?: ButtonProps["color"] }>(({ theme, containerColor }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  color: makeColors(theme, containerColor || "").foreground,
}))

const Button: React.SFC<ButtonProps> = ({
  to,
  children,
  icon,
  iconPosition,
  iconColor,
  color,
  onClick,
  loading,
  ...props
}) => {
  const ContainerComponent: React.ComponentType<any> = to ? ContainerLink : Container
  const iconProps = { name: icon!, size: 18, color: iconColor }

  return (
    <OperationalContext>
      {ctx => (
        <ContainerComponent
          {...props}
          color_={color}
          loading={loading}
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
          title={loading && children === String(children) ? String(children) : undefined}
        >
          {icon && iconPosition === "start" && <Icon left {...iconProps} />}
          {children}
          {icon && iconPosition === "end" && <Icon right {...iconProps} />}
          {loading && <ButtonSpinner containerColor={color} />}
        </ContainerComponent>
      )}
    </OperationalContext>
  )
}

Button.defaultProps = {
  iconPosition: "end",
}

export default Button
