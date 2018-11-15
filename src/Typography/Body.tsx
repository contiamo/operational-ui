import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export const Body = styled("p")<{
  color?: keyof OperationalStyleConstants["color"]["text"]
}>(({ theme, color }) => ({
  fontSize: theme.font.size.body,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.regular,
  lineHeight: theme.font.lineHeight,
  margin: `0 0 ${theme.space.element}px 0`,
  color: theme.color.text[color || "default"],
}))

export default Body
