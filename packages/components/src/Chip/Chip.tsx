import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { darken, readableTextColor } from "@operational/utils"
import { Theme, expandColor } from "@operational/theme"

import { Icon, IconName } from "../"
import { isWhite } from "../utils/color"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** Id */
  id?: string
  /** Glamorous CSS */
  css?: Css
  /**
   * What color of chip would you like? It can be a hex value or a named theme color
   * @default  The `primary` color of your theme.
   */
  color?: string
  /** Handle clicks on the chip's body. This is never triggered when the icon bar is clicked. When an icon is not specified, however, this basically turns into a full element click handler. */
  onClick?: () => void
  /** Handle clicks on the chip's icon area on the right  */
  onIconClick?: () => void
  /** Class name */
  className?: string
  children: React.ReactNode
  /** The name of the icon shown in the right icon bar area of the chip. A typical use here would be the `X` icon for closing the chip. Note that this icon is only displayed if there is an `onIconClick` prop present.  */
  icon?: IconName | React.ReactNode
}

const Container = glamorous.div(({ theme, color, hasChip }: { theme: Theme; color?: string; hasChip: boolean }): {} => {
  const backgroundColor = expandColor(theme, color) || theme.colors.info
  const border = isWhite(backgroundColor) ? `1px solid ${theme.colors.lightGray}` : "0"

  return {
    backgroundColor,
    border,
    label: "chip",
    position: "relative",
    height: theme.spacing * 1.5,
    display: "inline-flex",
    alignItems: "center",
    boxSizing: "border-box",
    width: "fit-content",
    borderRadius: 2,
    cursor: "pointer",
    overflow: "hidden",
    color: readableTextColor(backgroundColor, ["black", "white"]),
    margin: `0px ${theme.spacing / 2}px 0px 0px`,
  }
})

const Content = glamorous.div(({ theme }: WithTheme): {} => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: `0px ${theme.spacing / 2}px`,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}))

const Action = glamorous.div(({ theme, color }: { theme: Theme; color?: string }): {} => {
  const backgroundColor = expandColor(theme, color) || theme.colors.info
  const borderColor = isWhite(backgroundColor) ? theme.colors.lightGray : "rgba(255, 255, 255, 0.15)"
  return {
    borderLeft: `1px solid ${borderColor}`,
    color: readableTextColor(backgroundColor, ["black", "white"]),
    width: theme.spacing * 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  }
})

const Chip = (props: Props) => (
  <Container id={props.id} className={props.className} css={props.css} color={props.color} hasChip={!!props.onClick}>
    <Content onClick={props.onClick}>{props.children}</Content>
    {props.onIconClick && (
      <Action color={props.color} onClick={props.onIconClick}>
        {typeof props.icon === "string" ? <Icon name={props.icon as IconName} size={12} /> : props.icon}
      </Action>
    )}
  </Container>
)

export default Chip
