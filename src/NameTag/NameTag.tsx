import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import { readableTextColor } from "../utils"
import { colorMapper } from "../utils/color"
import { expandColor } from "../utils/constants"

export interface NameTagProps extends DefaultProps {
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

const Container = styled("div")<{
  color?: NameTagProps["color"]
  left?: NameTagProps["left"]
  right?: NameTagProps["right"]
  children: string
  assignColor: boolean
}>(({ theme, color, left, right, children, assignColor }) => {
  const backgroundColor = assignColor
    ? colorMapper(theme.color.palette)(children)
    : expandColor(theme, color) || theme.color.primary
  const textColor = readableTextColor(backgroundColor, [theme.color.white, theme.color.black])
  return {
    backgroundColor,
    color: textColor,
    fontSize: theme.font.size.small,
    fontWeight: theme.font.weight.bold,
    width: 28,
    height: 20,
    borderRadius: theme.borderRadius,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    ...(left ? { marginRight: theme.space.small } : {}),
    ...(right ? { marginLeft: theme.space.small } : {}),
  }
})

const NameTag: React.SFC<NameTagProps> = props => (
  <Container {...props} assignColor={Boolean(!props.color)}>
    {props.children || ""}
  </Container>
)

NameTag.defaultProps = {
  children: "",
}

export default NameTag
