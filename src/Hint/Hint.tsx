import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import Tooltip from "../Tooltip/Tooltip"
import { HelpIcon } from "../Icon/Icon"

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
  tooltipPosition?: "left" | "top" | "right" | "bottom"
  textId?: string
}

const Container = styled("div")<{ left?: HintProps["left"]; right?: HintProps["right"] }>(({ left, right, theme }) => ({
  position: "relative",
  display: "inline-flex",
  verticalAlign: "middle",
  alignItems: "center",
  justifyContent: "center",
  color: theme.color.text.lightest,
  marginRight: left ? theme.space.base : 0,
  marginLeft: right ? theme.space.base : 0,
  width: 24,
}))

const HintTooltip = styled(Tooltip)`
  max-height: 100px;
  overflow: auto;
`

const Hint: React.SFC<HintProps> = props => {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false)

  return (
    <Container
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseOut={() => setIsTooltipVisible(false)}
      aria-label={typeof props.children === "string" ? props.children : undefined}
      {...props}
    >
      <HelpIcon size={12} />
      {isTooltipVisible && (
        <HintTooltip position={props.tooltipPosition} textId={props.textId}>
          {props.children}
        </HintTooltip>
      )}
    </Container>
  )
}

Hint.defaultProps = {
  tooltipPosition: "left",
}

export default Hint
