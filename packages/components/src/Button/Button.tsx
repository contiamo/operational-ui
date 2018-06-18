import * as React from "react"
import styled from "react-emotion"
import { readableTextColor, darken, lighten, expandColor } from "@operational/utils"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { isWhite, isModifiedEvent } from "../utils"
import { Css, CssStatic } from "../types"
import { ContextConsumer, Context, Icon, IconName } from "../"
import Spinner from "../Spinner/Spinner"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  /** Invoked when you click on the button */

  onClick?: () => void
  type?: string
  /** Navigation property à la react-router <Link/> */

  to?: string
  /** Color assigned to the avatar circle (hex or named color from `theme.color`) */

  color?: string
  /** Icon to display on right of button (optional) */
  icon?: string | React.ReactNode
  /** Loading flag - if enabled, the text hides and a spinner appears in the center */

  loading?: boolean
  /** Active state */

  active?: boolean
  /** Disabled option */

  disabled?: boolean
  /** Condensed option */

  condensed?: boolean
  children?: React.ReactNode
}

const containerStyles = ({
  theme,
  color,
  active,
  disabled,
  condensed,
  loading,
  icon,
}: {
  theme?: OperationalStyleConstants
  color?: string
  active?: boolean
  disabled?: boolean
  condensed?: boolean
  loading?: boolean
  icon?: string | React.ReactNode
}): CssStatic => {
  const defaultColor: string = theme.color.white
  const backgroundColor: string = expandColor(theme, color) || defaultColor
  const activeBackgroundColor: string = darken(backgroundColor, 5)
  const foregroundColor = readableTextColor(backgroundColor, [theme.color.text.default, "white"])
  const spacing = theme.space.content
  const padding = condensed ? theme.space.small : spacing
  const computedBorderColor = active ? activeBackgroundColor : backgroundColor

  return {
    lineHeight: `${condensed ? 26 : 34}px`,
    label: "button",
    fontSize: theme.font.size.small,
    fontFamily: theme.font.family.main,
    display: "inline-block",
    padding: `0 ${icon ? padding / 2 : padding}px 0 ${padding}px`,
    borderRadius: theme.borderRadius,
    border: "1px solid",
    borderColor: isWhite(backgroundColor) ? theme.color.border.default : computedBorderColor,
    cursor: disabled ? "auto" : "pointer",
    backgroundColor: active ? activeBackgroundColor : backgroundColor,
    opacity: disabled ? 0.6 : 1.0,
    outline: "none",
    position: "relative",
    // Apply styles with increased specificity to override defaults
    "&, a:link&, a:visited&": {
      textDecoration: "none",
      color: loading ? "transparent" : foregroundColor,
    },
    "& .op_button-spinner": {
      color: foregroundColor,
    },
    ...(!disabled
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
      : {}),
    marginRight: spacing / 2,
  }
}

const Container = styled("button")(containerStyles)
const ContainerLink = styled("a")(containerStyles)

const IconContainer = styled("div")(({ theme, condensed }: Css) => ({
  marginLeft: condensed ? theme.space.small : theme.space.small,
  float: "right",
  "& svg": {
    verticalAlign: "text-bottom",
  },
}))

const Button = (props: Props) => {
  const ContainerComponent = props.to ? ContainerLink : Container
  return (
    <ContextConsumer>
      {(ctx: Context) => (
        <ContainerComponent
          type={props.type}
          id={props.id}
          href={props.to}
          css={props.css}
          className={props.className}
          onClick={(ev: React.SyntheticEvent<Node>) => {
            if (props.disabled) {
              ev.preventDefault()
              return
            }

            props.onClick && props.onClick()

            if (!isModifiedEvent(ev) && props.to && ctx.pushState) {
              ev.preventDefault()
              ctx.pushState(props.to)
            }
          }}
          color={props.color}
          loading={props.loading}
          active={props.active}
          disabled={props.disabled}
          condensed={props.condensed}
          icon={props.icon}
          title={props.loading && props.children === String(props.children) ? String(props.children) : undefined}
        >
          {props.children}
          {props.icon && (
            <IconContainer condensed={props.condensed}>
              {typeof props.icon === "string" ? (
                <Icon name={props.icon as IconName} size={props.condensed ? 16 : 20} />
              ) : (
                props.icon
              )}
            </IconContainer>
          )}
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
        </ContainerComponent>
      )}
    </ContextConsumer>
  )
}

export default Button
