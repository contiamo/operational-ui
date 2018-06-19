import * as React from "react"
import styled from "react-emotion"
import { darken, readableTextColor, expandColor } from "@operational/utils"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { Icon, IconName } from "../"
import { isWhite } from "../utils/color"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** Id */
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  /**
   * What color of chip would you like? It can be a hex value, a named theme color, or a number
   * @default  0, the first of the default chip colors
   */

  color?: string
  /**
   * Color index - overridden by `color` prop, if provided
   * @default 0
   */

  colorIndex?: number
  /** Handle clicks on the chip's body. This is never triggered when the icon bar is clicked. When an icon is not specified, however, this basically turns into a full element click handler. */

  onClick?: () => void
  /** Handle clicks on the chip's icon area on the right. */

  onIconClick?: () => void
  /** Class name */

  className?: string
  children: React.ReactNode
  /** The name of the icon shown in the right icon bar area of the chip. A typical use here would be the `X` icon for closing the chip. Note that this icon is only displayed if there is an `onIconClick` prop present.  */

  icon?: IconName | React.ReactNode
}

const colors = ["#ffdfb2", "#a3d0e2", "#c3eac1"]

const Container = styled("div")(
  ({ theme, color, colorIndex }: { theme?: OperationalStyleConstants; color?: string; colorIndex?: number }): {} => {
    const definedColor = expandColor(theme, color)
    const definedTextColor =
      definedColor && readableTextColor(definedColor, [theme.color.text.default, theme.color.white])
    return {
      backgroundColor: definedColor || colors[(colorIndex || 0) % colors.length],
      fontSize: theme.font.size.small,
      label: "chip",
      position: "relative",
      height: theme.space.element,
      display: "inline-flex",
      alignItems: "center",
      boxSizing: "border-box",
      width: "fit-content",
      borderRadius: 2,
      cursor: "pointer",
      overflow: "hidden",
      color: definedTextColor || theme.color.text.default,
      margin: `0px ${theme.space.small}px 0px 0px`,
    }
  },
)

const Content = styled("div")(
  ({ theme }: WithTheme): {} => ({
    height: "100%",
    display: "flex",
    alignItems: "center",
    padding: `0px ${theme.space.base}px`,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  }),
)

const Action = styled("div")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => {
    return {
      borderLeft: `1px solid ${theme.color.ghost}`,
      width: theme.space.content,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    }
  },
)

const Chip: React.SFC<Props> = (props: Props) => (
  <Container
    id={props.id}
    className={props.className}
    css={props.css}
    color={props.color}
    colorIndex={props.colorIndex}
  >
    <Content onClick={props.onClick}>{props.children}</Content>
    {props.onIconClick && (
      <Action onClick={props.onIconClick}>
        {typeof props.icon === "string" ? <Icon name={props.icon as IconName} size={12} /> : props.icon}
      </Action>
    )}
  </Container>
)

export default Chip
