import * as React from "react"
import styled from "react-emotion"
import { readableTextColor } from "@operational/utils"

import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { CardHeader, CardItem } from "../"

export interface Props {
  color?: string
  /**
   * Indicates that this component is left of other content, and adds an appropriate right margin.
   */
  left?: boolean
  /**
   * Indicates that this component is right of other content, and adds an appropriate left margin.
   */
  right?: boolean
  children?: React.ReactNode
}

const Container = styled("div")(
  ({
    theme,
    color,
    left,
    right,
  }: {
    theme?: OperationalStyleConstants
    color?: string
    left?: boolean
    right?: boolean
  }) => {
    const backgroundColor = expandColor(theme, color) || theme.color.primary
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
  },
)

const NameTag: React.SFC<Props> = props => <Container {...props}>{props.children}</Container>

export default NameTag
