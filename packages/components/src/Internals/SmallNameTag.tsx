import * as React from "react"
import styled from "react-emotion"

import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { colorMapper } from "../utils/color"
import { readableTextColor } from "../utils"
import { CardHeader, CardItem } from "../"

export interface Props {
  /** Background color */
  color?: string
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
  /**
   * Children to this component are expected to be a plain string
   */
  children?: string
}

const Container = styled("div")(
  ({
    theme,
    color,
    left,
    right,
    children,
    assignColor,
  }: {
    theme?: OperationalStyleConstants
    color?: Props["color"]
    left?: Props["left"]
    right?: Props["right"]
    children: string
    assignColor: boolean
  }) => {
    const backgroundColor = assignColor
      ? colorMapper(theme.color.palette)(children)
      : expandColor(theme, color) || theme.color.primary
    const textColor = readableTextColor(backgroundColor, [theme.color.white, theme.color.black])
    return {
      backgroundColor,
      color: textColor,
      fontSize: theme.font.size.fineprint,
      fontWeight: theme.font.weight.bold,
      width: 18,
      height: 18,
      borderRadius: theme.borderRadius,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      ...(left ? { marginRight: theme.space.small } : {}),
      ...(right ? { marginLeft: theme.space.small } : {}),
    }
  },
)

const SmallNameTag: React.SFC<Props> = props => (
  <Container {...props} assignColor={Boolean(!props.color)}>
    {props.children}
  </Container>
)

SmallNameTag.defaultProps = {
  children: "",
}

export default SmallNameTag
