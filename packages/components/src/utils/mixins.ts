import React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

export const inputFocus = ({ theme }: { theme: Theme }): {} => ({
  outline: 0,
  border: "1px solid",
  borderColor: theme.colors.info,
  boxShadow: `0 0 0 3px ${lighten(theme.colors.info, 40)}`
})

export const Label = glamorous.label(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  minWidth: 240
}))

export const LabelText = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  marginBottom: theme.spacing / 4,
  ...theme.typography.small,
  fontWeight: 600,
  opacity: 0.7
}))
