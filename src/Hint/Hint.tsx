import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import Icon from "../Icon/Icon"
import Tooltip from "../Tooltip/Tooltip"
import { hoverTooltip } from "../utils/mixins"

export interface Props extends DefaultProps {
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
}

const Container = styled("div")<{ left?: Props["left"]; right?: Props["right"] }>(({ left, right, theme }) => ({
  position: "relative",
  display: "inline-block",
  verticalAlign: "middle",
  color: theme.color.text.lightest,
  marginRight: left ? theme.space.base : 0,
  marginLeft: right ? theme.space.base : 0,
  ...hoverTooltip,
}))

const Hint: React.SFC<Props> = props => (
  <Container {...props}>
    <Icon name="Question" size={12} />
    <Tooltip right>{props.children}</Tooltip>
  </Container>
)

export default Hint
