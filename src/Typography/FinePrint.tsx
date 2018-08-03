import styled from "../utils/styled"

export const FinePrint = styled("p")(({ theme }) => ({
  fontSize: theme.font.size.fineprint,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.regular,
  lineHeight: theme.font.lineHeight,
  margin: `${theme.space.small}px 0 ${theme.space.big}px 0`,
  color: theme.color.text.lightest,
  ":last-child": {
    marginBottom: 0,
  },
}))

export default FinePrint
