import * as React from "react"
import tinycolor from "tinycolor2"
import { Icon, IconName } from "../"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"

export interface Props {
  /** Id */
  id?: string

  /** Chip color, provided as a hex value or a named theme color */
  color?: string

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

const Container = styled("div")<{ color?: string }>(({ theme, color }) => {
  const backgroundColor = tinycolor(expandColor(theme, color) || theme.color.primary)
    .setAlpha(0.1)
    .toString()
  return {
    backgroundColor,
    fontSize: theme.font.size.small,
    fontWeight: theme.font.weight.medium,
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
    color: theme.color.text.default,
    margin: `0px ${theme.space.small}px 0px 0px`,
  }
})

const Content = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  padding: `0px ${theme.space.base}px`,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}))

const Action = styled("div")(({ theme }) => {
  return {
    borderLeft: `1px solid ${theme.color.ghost}`,
    width: theme.space.element,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  }
})

const Chip: React.SFC<Props> = (props: Props) => (
  <Container id={props.id} className={props.className} color={props.color}>
    <Content onClick={props.onClick}>{props.children}</Content>
    {props.onIconClick && (
      <Action onClick={props.onIconClick}>
        {typeof props.icon === "string" ? <Icon name={props.icon as IconName} size={12} /> : props.icon}
      </Action>
    )}
  </Container>
)

export default Chip
