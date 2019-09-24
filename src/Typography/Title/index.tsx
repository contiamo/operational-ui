import { OperationalStyleConstants } from "../../utils/constants"
import styled from "../../utils/styled"

export const Title = styled("h1")<{
  color?: keyof OperationalStyleConstants["color"]["text"]
}>(({ theme, color }) => ({
  fontSize: theme.font.size.title,
  fontFamily: theme.font.family.main,
  fontWeight: theme.font.weight.bold,
  lineHeight: theme.font.lineHeight,
  margin: 0,
  color: theme.color.text[color ? color : "dark"],
  width: "100%",
}))

export default Title
