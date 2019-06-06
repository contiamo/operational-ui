import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import Tooltip from "../Tooltip/Tooltip"
import { hoverTooltip } from "../utils/mixins"
import { IconHelp } from "../Icon/Icon"

export interface HintProps extends DefaultProps {
  className?: string
  children?: React.ReactNode
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
  tooltipPosition?: "left" | "top" | "right" | "bottom" | "smart"
  textId?: string
}

const Container = styled("div")<{ left?: HintProps["left"]; right?: HintProps["right"] }>(({ left, right, theme }) => ({
  position: "relative",
  display: "inline-flex",
  verticalAlign: "middle",
  alignItems: "center",
  color: theme.color.text.lightest,
  marginRight: left ? theme.space.base : 0,
  marginLeft: right ? theme.space.base : 0,
  ...hoverTooltip,
}))

const HintTooltip: React.SFC<{ position: HintProps["tooltipPosition"]; textId: HintProps["textId"] }> = props => {
  switch (props.position) {
    case "right":
      return <Tooltip right {...props} />
    case "top":
      return <Tooltip top {...props} />
    case "bottom":
      return <Tooltip bottom {...props} />
    case "left":
      return <Tooltip left {...props} />
    case "smart":
      return <Tooltip smart {...props} />
    default:
      return null
  }
}

const Hint: React.SFC<HintProps> = props => (
  <Container aria-label={typeof props.children === "string" ? props.children : undefined} {...props}>
    <IconHelp size={12} />
    <HintTooltip position={props.tooltipPosition!} textId={props.textId}>
      {props.children}
    </HintTooltip>
  </Container>
)

Hint.defaultProps = {
  tooltipPosition: "left",
}

export default Hint
