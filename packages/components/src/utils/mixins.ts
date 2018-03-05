import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

export const inputFocus = ({ theme }: { theme: Theme }): {} => ({
  outline: 0,
  border: "1px solid",
  borderColor: theme.colors.info,
  boxShadow: `0 0 0 3px ${lighten(theme.colors.info, 40)}`
})

export const label = ({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.small,
  fontWeight: 600,
  opacity: 0.7,
  display: "inline-block",
  marginBottom: theme.spacing / 4
})
