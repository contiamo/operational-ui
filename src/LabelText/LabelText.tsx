import styled from "../utils/styled"

export const LabelText = styled("label")(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  display: "block",
  verticalAlign: "middle",
  marginBottom: theme.space.base,
  fontWeight: theme.font.weight.bold,
  color: theme.color.text.lightest,
  height: labelTextHeight,
  lineHeight: theme.font.lineHeight,
}))

export const labelTextHeight = 15

export default LabelText
