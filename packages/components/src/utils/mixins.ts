import React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import { lighten } from "@operational/utils"

export const inputFocus = ({ theme, isError }: { theme?: OperationalStyleConstants; isError?: boolean }): {} => ({
  outline: 0,
  border: "1px solid",
  borderColor: isError ? theme.color.error : theme.color.primary,
  boxShadow: `0 0 0 3px ${lighten(isError ? theme.color.error : theme.color.primary, 40)}`,
})

export const Label = styled("label")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => ({
    display: "inline-block",
    position: "relative",
    minWidth: 240,
  }),
)

export const LabelText = styled("span")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => ({
    fontSize: theme.font.size.fineprint,
    display: "inline-block",
    verticalAlign: "middle",
    marginBottom: theme.space.base,
    /**
     * Set font explicitly so it doesn't inherit overrides on the parent
     * (e.g. monospaced code in text areas)
     */
    opacity: 0.4,
  }),
)

export const FormFieldControls = styled("div")({
  position: "absolute",
  top: 3,
  right: 0,
})

export const FormFieldControl = styled("div")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => ({
    position: "relative",
    verticalAlign: "middle",
    display: "inline-block",
    width: "fit-content",
    marginLeft: 4,
    "& svg": {
      opacity: 0.4,
      position: "relative",
      top: -1,
    },
    // :nth-child(2) refers to the tooltip
    "& > :nth-child(2)": {
      display: "none",
    },
    ":hover": {
      "& svg": {
        opacity: 1,
      },
      "& > :nth-child(2)": {
        display: "block",
      },
    },
  }),
)

export const FormFieldError = styled("div")(
  ({ theme }: { theme?: OperationalStyleConstants }): {} => ({
    fontSize: theme.font.size.fineprint,
    color: theme.color.error,
    padding: `${theme.space.base / 2}px ${theme.space.element}px`,
    marginBottom: 0,
    width: "100%",
    borderRadius: theme.borderRadius,
    position: "absolute",
    backgroundColor: lighten(theme.color.error, 45),
    boxShadow: `0px 1px 5px #d3d1d3`,
    bottom: -theme.space.big,
    left: 0,
    zIndex: theme.zIndex.formFieldError,
  }),
)
