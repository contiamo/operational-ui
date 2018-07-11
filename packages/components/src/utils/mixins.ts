import React from "react"
import styled from "react-emotion"
import { lighten } from "@operational/utils"
import { OperationalStyleConstants } from "./constants"
import { dangerousTooltipContainerClassName } from "../Tooltip/Tooltip"

export const inputFocus = ({ theme, isError }: { theme?: OperationalStyleConstants; isError?: boolean }) => ({
  outline: 0,
  border: "1px solid",
  borderColor: isError ? theme.color.error : theme.color.primary,
  boxShadow: `0 0 0 3px ${isError ? lighten(theme.color.error, 60) : lighten(theme.color.primary, 40)}`,
})

export const Label = styled("label")(
  ({ fullWidth, theme, left }: { fullWidth?: boolean; theme?: OperationalStyleConstants; left?: boolean }) => ({
    display: "inline-block",
    position: "relative",
    minWidth: fullWidth ? "100%" : 360,
    marginRight: left ? theme.space.small : 0,
  }),
)

export const LabelText = styled("span")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  fontSize: theme.font.size.fineprint,
  display: "inline-block",
  verticalAlign: "middle",
  marginBottom: theme.space.base,
  fontWeight: theme.font.weight.bold,
  color: theme.color.text.lightest,
}))

export const FormFieldControls = styled("div")({
  position: "absolute",
  top: 3,
  right: 0,
})

export const hoverTooltip: {} = {
  [`.${dangerousTooltipContainerClassName}`]: {
    /*
     * Rendering at 0.01 opacity is still necessary in order to determine tooltip dimensions
     * See ../Tooltip/Tooltip.tsx implementation for more details
     */
    opacity: 0.01,
    pointerEvents: "none",
  },
  ":hover": {
    [`.${dangerousTooltipContainerClassName}`]: {
      opacity: 1,
      pointerEvents: "all",
    },
  },
}

export const FormFieldControl = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  cursor: "pointer",
  position: "relative",
  verticalAlign: "middle",
  display: "inline-block",
  width: "fit-content",
  marginLeft: theme.space.base,
  color: theme.color.text.lightest,
  ...hoverTooltip,
  "& svg": {
    position: "relative",
  },
  ":hover": {
    color: theme.color.text.default,
  },
}))

export const FormFieldError = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  fontSize: theme.font.size.fineprint,
  color: theme.color.error,
  padding: `${theme.space.base / 2}px ${theme.space.element}px`,
  marginBottom: 0,
  width: "100%",
  borderBottomLeftRadius: theme.borderRadius,
  borderBottomRightRadius: theme.borderRadius,
  border: `1px solid ${theme.color.error}`,
  borderTop: 0,
  transform: "translate3d(0, 100%, 0)",
  position: "absolute",
  backgroundColor: lighten(theme.color.error, 60),
  boxShadow: `0px 3px 5px #d3d1d3`,
  // Nudge up just a little bit to look blended into the form
  bottom: 2,
  left: 0,
  zIndex: theme.zIndex.formFieldError,
}))
