import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import Icon from "../Icon/Icon"
import DiscriminatedTooltip from "../Tooltip/Tooltip"
import { hoverTooltip } from "../utils/mixins"

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

const Tooltip: React.SFC<{ position: HintProps["tooltipPosition"] }> = props => {
  switch (props.position) {
    case "right":
      return <DiscriminatedTooltip right {...props} />
    case "top":
      return <DiscriminatedTooltip top {...props} />
    case "bottom":
      return <DiscriminatedTooltip bottom {...props} />
    case "left":
      return <DiscriminatedTooltip left {...props} />
    case "smart":
      return <DiscriminatedTooltip smart {...props} />
    default:
      return null
  }
}

const Hint: React.SFC<HintProps> = props => (
  <Container {...props}>
    <Icon name="Question" size={12} />
    <Tooltip position={props.tooltipPosition!}>{props.children}</Tooltip>
  </Container>
)

Hint.defaultProps = {
  tooltipPosition: "left",
}

export default Hint
