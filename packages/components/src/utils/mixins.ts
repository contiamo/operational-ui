import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

export const inputFocus = ({ theme }: { theme: Theme }) => ({
  outline: 0,
  border: "1px solid",
  borderColor: theme.colors.info,
  boxShadow: `0 0 0 3px ${lighten(theme.colors.info, 40)}`
})
