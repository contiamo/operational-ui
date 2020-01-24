import styled from "../utils/styled"

// This is a span because it goes _inside_ a <label>
export const LabelText = styled("span")(({ theme }) => ({
  fontSize: theme.font.size.body,
  display: "block",
  verticalAlign: "middle",
  marginBottom: theme.space.base,
  fontWeight: theme.font.weight.bold,
  color: theme.color.text.lightest,
  height: labelTextHeight,
  lineHeight: theme.font.lineHeight,
  userSelect: "none",
}))

export const labelTextHeight = 15

export default LabelText
