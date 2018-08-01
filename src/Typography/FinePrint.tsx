import styled from "../utils/styled"

export const FinePrint = styled("p")(({ theme }) => ({
  fontSize: theme.font.size.small,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.regular,
  lineHeight: theme.font.lineHeight,
  margin: `${theme.space.base}px 0`,
  color: theme.color.text.lightest,
}))

export default FinePrint
