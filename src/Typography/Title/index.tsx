import { OperationalStyleConstants } from "../../utils/constants"
import styled from "../../utils/styled"

export const Title = styled("h1")<{
  color?: keyof OperationalStyleConstants["color"]["text"]
}>(({ theme, color }) => ({
  fontSize: theme.font.size.title,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.medium,
  lineHeight: theme.font.lineHeight,
  margin: `0 0 ${theme.space.element}px`,
  color: color ? theme.color.text[color] : "inherit",
}))

export default Title
