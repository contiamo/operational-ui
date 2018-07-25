import * as React from "react"
import styled, { Interpolation } from "react-emotion"

import Icon, { IconName } from "../Icon/Icon"
import { Consumer as OperationalContext } from "../OperationalUI/OperationalUI"
import Spinner from "../Spinner/Spinner"
import { darken, isModifiedEvent, isWhite, readableTextColor } from "../utils"
import { expandColor, OperationalStyleConstants } from "../utils/constants"

export interface Props {
  id?: string
  className?: string
  /** Invoked when you click on the button */
  onClick?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  type?: string
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Button color theme (hex or named color from `theme.color`) */
  color?: string
  /** Icon to display on right of button (optional) */
  icon?: IconName
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

type PropsWithTheme = Props & { theme?: OperationalStyleConstants }

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

const containerStyles: Interpolation<Props> = ({
  theme,
  color,
  disabled,
  condensed,
  loading,
  fullWidth,
}: PropsWithTheme) => {
  const { background: backgroundColor, foreground: foregroundColor } = makeColors(theme, color)
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
    boxShadow: isWhite(backgroundColor) && `0 0 0 1px ${theme.color.border.disabled} inset`,
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

const ButtonSpinner = styled(Spinner)(
  ({ theme, containerColor }: { theme?: OperationalStyleConstants; containerColor: string }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate3d(-50%, -50%, 0)",
    color: makeColors(theme, containerColor).foreground,
  }),
)

const Button = (props: Props) => {
  const ContainerComponent = props.to ? ContainerLink : Container
  return (
    <OperationalContext>
      {ctx => (
        <ContainerComponent
          {...props}
          href={props.to}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            if (props.disabled) {
              ev.preventDefault()
              return
            }

            if (props.onClick) {
              props.onClick()
            }

            if (!isModifiedEvent(ev) && props.to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(props.to)
            }
          }}
          title={props.loading && props.children === String(props.children) ? String(props.children) : undefined}
        >
          {props.children}
          {props.icon && <Icon right name={props.icon} size={18} />}
          {props.loading && <ButtonSpinner containerColor={props.color} />}
        </ContainerComponent>
      )}
    </OperationalContext>
  )
}

export default Button
