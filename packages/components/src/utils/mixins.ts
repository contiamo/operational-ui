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
  ...theme.typography.small,
  display: "inline-block",
  verticalAlign: "middle",
  marginBottom: theme.spacing / 8,
  // Set font explicitly so it doesn't inherit overrides on the parent
  // (e.g. monospaced code in text areas)
  fontFamily: theme.fontFamily,
  opacity: 0.4
}))

export const FormFieldControls = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "absolute",
  top: 3,
  right: 0
}))

export const FormFieldControl = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "relative",
  verticalAlign: "middle",
  display: "inline-block",
  width: "fit-content",
  marginLeft: 4,
  "& svg": {
    opacity: 0.4,
    position: "relative",
    top: -1
  },
  // :nth-child(2) refers to the tooltip
  "& > :nth-child(2)": {
    display: "none"
  },
  ":hover": {
    "& svg": {
      opacity: 1
    },
    "& > :nth-child(2)": {
      display: "block"
    }
  }
}))

export const FormFieldError = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.small,
  color: theme.colors.error,
  padding: `${theme.spacing / 6}px ${theme.spacing * 3 / 4}px`,
  marginBottom: 0,
  width: "100%",
  borderRadius: theme.borderRadius,
  position: "absolute",
  backgroundColor: lighten(theme.colors.error, 45),
  boxShadow: theme.shadows.card,
  bottom: theme.spacing * -1.75,
  left: 0
}))
