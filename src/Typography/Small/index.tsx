import { OperationalStyleConstants } from "../../utils/constants"
import styled from "../../utils/styled"

export const Small = styled("p")<{
  color?: keyof OperationalStyleConstants["color"]["text"]
}>(({ theme, color }) => ({
  fontSize: theme.font.size.small,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.regular,
  lineHeight: theme.font.lineHeight,
  margin: `${theme.space.base}px 0`,
  color: theme.color.text[color || "default"],
}))

export default Small
