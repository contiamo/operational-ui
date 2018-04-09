import React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { lighten } from "@operational/utils"

export const inputFocus = ({ theme, isError }: { theme: Theme; isError?: boolean }): {} => ({
  outline: 0,
  border: "1px solid",
  borderColor: isError ? theme.colors.error : theme.colors.info,
  boxShadow: `0 0 0 3px ${lighten(isError ? theme.colors.error : theme.colors.info, 40)}`
})

export const Label = glamorous.label(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  position: "relative",
  minWidth: 240
}))

export const LabelText = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  verticalAlign: "middle",
  marginBottom: theme.spacing / 6,
  marginLeft: theme.spacing * 2 / 3,
  ...theme.typography.small,
  fontWeight: 400,
  opacity: 0.4
}))
