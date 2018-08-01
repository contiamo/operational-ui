import { OperationalStyleConstants } from "../utils/constants"
import styled from "../utils/styled"

export const Title = styled("h1")<{
  color?: keyof OperationalStyleConstants["color"]["text"]
}>(({ theme, color }) => ({
  fontSize: theme.font.size.title,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.medium,
  margin: 0,
  color: theme.color.text[color || "default"],
}))

export default Title
