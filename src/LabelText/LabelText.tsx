import styled from "react-emotion"

export const labelTextHeight = 15

export const LabelText = styled("span")(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  display: "block",
  verticalAlign: "middle",
  marginBottom: theme.space.base,
  fontWeight: theme.font.weight.bold,
  color: theme.color.text.lightest,
  height: labelTextHeight,
}))
