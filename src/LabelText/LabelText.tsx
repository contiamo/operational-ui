import * as React from "react"
import styled from "../utils/styled"

const StyledLabelText = styled("label")(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  display: "block",
  verticalAlign: "middle",
  marginBottom: theme.space.base,
  fontWeight: theme.font.weight.bold,
  color: theme.color.text.lightest,
  height: labelTextHeight,
}))

export const LabelText: React.SFC = props => <StyledLabelText {...props} />

export const labelTextHeight = 15

export default LabelText
