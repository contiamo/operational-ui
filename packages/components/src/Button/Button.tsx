import * as React from "react"
import styled, { Interpolation } from "react-emotion"
import { readableTextColor, darken, lighten, expandColor } from "@operational/utils"
import { OperationalStyleConstants } from "@operational/theme"
import { isWhite, isModifiedEvent } from "../utils"
import { Css } from "../types"
import { ContextConsumer, Context, Icon, IconName } from "../"
import Spinner from "../Spinner/Spinner"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Invoked when you click on the button */
  onClick?: (e?: React.SyntheticEvent<React.ReactNode>) => void
  type?: string
  /** Navigation property à la react-router <Link/> */
  to?: string
  /** Color assigned to the avatar circle (hex or named color from `theme.color`) */
  color?: string
  /** Icon to display on right of button (optional) */
  icon?: string | React.ReactNode
  /** Loading flag - if enabled, the text hides and a spinner appears in the center */
  loading?: boolean
  /** Disabled option */
  disabled?: boolean
  /** Condensed option */
  condensed?: boolean
  children?: React.ReactNode
}

type PropsWithTheme = Props & { theme?: OperationalStyleConstants }

const makeColors = (theme: OperationalStyleConstants, color: string) => {
  const defaultColor: string = theme.color.white
  const grey: string = theme.color.background.light
  const greyText: string = theme.color.text.action
  const backgroundColor: string = color === "grey" ? grey : expandColor(theme, color) || defaultColor
  const textColor: string =
    color === "grey" ? greyText : readableTextColor(backgroundColor, [theme.color.text.default, theme.color.white])
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
  icon,
}: PropsWithTheme) => {
  const { background: backgroundColor, foreground: foregroundColor } = makeColors(theme, color)
  return {
    backgroundColor,
    lineHeight: `${condensed ? 26 : 34}px`,
    label: "button",
    fontSize: theme.font.size.small,
    fontFamily: theme.font.family.main,
    display: "inline-block",
    padding: `0 ${condensed ? theme.space.small : theme.space.content}px`,
    borderRadius: theme.borderRadius,
    border: 0,
    boxShadow: isWhite(backgroundColor) && `0 0 0 1px ${theme.color.border.default} inset`,
    cursor: disabled ? "auto" : "pointer",
    opacity: disabled ? 0.6 : 1.0,
    outline: "none",
    position: "relative",
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
          ":focus": {
            outline: 0,
            boxShadow: `0 0 0 3px ${lighten(backgroundColor, 35)}`,
          },
        }
      : {}),
    marginRight: theme.space.small,
  }
}

const Container = styled("button")(containerStyles)
const ContainerLink = styled("a")(containerStyles)

const IconContainer = styled("div")(({ theme }: Css) => ({
  marginLeft: theme.space.small,
  float: "right",
  "& svg": {
    verticalAlign: "text-bottom",
  },
}))

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
          disabled={props.disabled}
          condensed={props.condensed}
          icon={props.icon}
          title={props.loading && props.children === String(props.children) ? String(props.children) : undefined}
        >
          {props.children}
          {props.icon && (
            <IconContainer condensed={props.condensed}>
              {typeof props.icon === "string" ? <Icon name={props.icon as IconName} size={16} /> : props.icon}
            </IconContainer>
          )}
          {props.loading && <ButtonSpinner containerColor={props.color} />}
        </ContainerComponent>
      )}
    </ContextConsumer>
  )
}

export default Button
