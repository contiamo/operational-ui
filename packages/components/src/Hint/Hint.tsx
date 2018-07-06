import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { Icon, Tooltip } from "../"
import { hoverTooltip } from "../utils/mixins"

export interface Props {
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

const Container = styled("div")(
  ({ left, right, theme }: { left?: boolean; right?: boolean; theme?: OperationalStyleConstants }) => ({
    ...hoverTooltip,
    position: "relative",
    display: "inline-block",
    verticalAlign: "middle",
    color: theme.color.text.lightest,
    ...(left ? { marginRight: theme.space.small } : {}),
    ...(right ? { marginLeft: theme.space.small } : {}),
  }),
)

const Hint: React.SFC<Props> = props => (
  <Container {...props}>
    <Icon name="Question" size={12} />
    <Tooltip right>{props.children}</Tooltip>
  </Container>
)

export default Hint
