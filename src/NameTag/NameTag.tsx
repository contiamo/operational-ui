import * as React from "react"

import { DefaultProps } from "../types"
import { readableTextColor } from "../utils"
import { colorMapper } from "../utils/color"
import { expandColor } from "../utils/constants"
import styled from "../utils/styled"

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
  /** Is it condensed? */
  condensed?: boolean
}

const shouldForwardProp = (prop: string) => !["color", "left", "assignColor", "condensed"].includes(prop.toString())

const Container = styled("div", {
  shouldForwardProp,
})<{
  color?: NameTagProps["color"]
  left?: NameTagProps["left"]
  right?: NameTagProps["right"]
  children: string
  assignColor: boolean
  condensed: boolean
}>(({ theme, color, left, right, children, assignColor, condensed }) => {
  const backgroundColor = assignColor
    ? colorMapper(theme.color.palette)(children)
    : expandColor(theme, color) || theme.color.primary
  const textColor = readableTextColor(backgroundColor, [theme.color.white, theme.color.black])

  return {
    backgroundColor,
    color: textColor,
    fontSize: condensed ? theme.font.size.tag : theme.font.size.small,
    fontWeight: theme.font.weight.bold,
    fontStretch: "condensed",
    width: condensed ? 16 : 28,
    height: condensed ? 14 : 20,
    borderRadius: theme.borderRadius,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    ...(left ? { marginRight: theme.space.small } : {}),
    ...(right ? { marginLeft: theme.space.small } : {}),
  }
})

const NameTag: React.SFC<NameTagProps> = ({ condensed, children, ...props }) => (
  <Container {...props} condensed={Boolean(condensed)} assignColor={!props.color}>
    {children || ""}
  </Container>
)

NameTag.defaultProps = {
  children: "",
}

export default NameTag
