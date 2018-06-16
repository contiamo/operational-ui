import React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { lighten } from "@operational/utils"
export const inputFocus = ({
  theme,
  isError,
}: {
  theme?: OperationalStyleConstants & {
    deprecated: Theme
  }
  isError?: boolean
}): {} => ({
  outline: 0,
  border: "1px solid",
  borderColor: isError ? theme.deprecated.colors.error : theme.deprecated.colors.info,
  boxShadow: `0 0 0 3px ${lighten(isError ? theme.deprecated.colors.error : theme.deprecated.colors.info, 40)}`,
})
export const Label = styled("label")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    display: "inline-block",
    position: "relative",
    minWidth: 240,
  }),
)
export const LabelText = styled("span")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    ...theme.deprecated.typography.small,
    display: "inline-block",
    verticalAlign: "middle",
    marginBottom: theme.deprecated.spacing / 8,
    // Set font explicitly so it doesn't inherit overrides on the parent
    // (e.g. monospaced code in text areas)
    fontFamily: theme.deprecated.fontFamily,
    opacity: 0.4,
  }),
)
export const FormFieldControls = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    position: "absolute",
    top: 3,
    right: 0,
  }),
)
export const FormFieldControl = styled("div")(
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
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
  ({
    theme,
  }: {
    theme?: OperationalStyleConstants & {
      deprecated: Theme
    }
  }): {} => ({
    ...theme.deprecated.typography.small,
    color: theme.deprecated.colors.error,
    padding: `${theme.deprecated.spacing / 6}px ${(theme.deprecated.spacing * 3) / 4}px`,
    marginBottom: 0,
    width: "100%",
    borderRadius: theme.deprecated.borderRadius,
    position: "absolute",
    backgroundColor: lighten(theme.deprecated.colors.error, 45),
    boxShadow: theme.deprecated.shadows.card,
    bottom: theme.deprecated.spacing * -1.75,
    left: 0,
  }),
)
