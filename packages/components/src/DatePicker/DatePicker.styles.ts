import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { Card } from "../"
import * as mixins from "../utils/mixins"

const inputHeight: number = 33

export interface ContainerProps {
  isExpanded: boolean
}

const inputDefaultWidth = 240

export const Container = styled("div")(({ isExpanded, theme }: any) => ({
  label: "datepicker",
  width: inputDefaultWidth,
  position: "relative",
}))

export const DatePickerCard = styled("div")(
  {
    position: "absolute",
    left: 0,
  },
  ({ theme, isExpanded }: { theme?: OperationalStyleConstants; isExpanded: boolean }) => ({
    backgroundColor: theme.deprecated.colors.white,
    display: isExpanded ? "block" : "none",
    boxShadow: theme.deprecated.shadows.popup,
    borderRadius: theme.deprecated.borderRadius,
    // Push down the card to the bottom of the input field,
    // plus the twice the size of the outside focus shadow.
    top: inputHeight + 6,
    padding: `${(theme.deprecated.spacing * 3) / 4}px ${theme.deprecated.spacing}px ${(theme.deprecated.spacing * 4) /
      3}px`,
    width: inputDefaultWidth,
    zIndex: theme.deprecated.baseZIndex + 1000,
  }),
)

export const Toggle = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  position: "absolute",
  cursor: "pointer",
  top: 1,
  right: 1,
  borderTopRightRadius: theme.deprecated.borderRadius,
  borderBottomRightRadius: theme.deprecated.borderRadius,
  width: inputHeight - 2,
  height: inputHeight - 2,
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.deprecated.baseZIndex + 1000,
  color: theme.deprecated.colors.inputBorder,
  borderLeft: "1px solid",
  borderColor: theme.deprecated.colors.inputBorder,
  "& svg": {
    position: "relative",
    pointerEvents: "none",
  },
  ":hover": {
    backgroundColor: theme.deprecated.colors.lighterBackground,
  },
}))

export const MonthNav = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  marginBottom: theme.deprecated.spacing / 2,
  textAlign: "center",
  "& > *": {
    margin: `0 6px`,
    verticalAlign: "middle",
    display: "inline-block",
  },
  "& > span": {
    ...theme.deprecated.typography.body,
    userSelect: "none",
    width: 120,
    textAlign: "center",
  },
}))

export const IconContainer = styled("div")({
  backgroundColor: "#FFFFFF",
  padding: 4,
  height: "auto",
  width: "fit-content",
  cursor: "pointer",
})

export const Days = styled("div")({
  textAlign: "center",
  width: 210,
  margin: "auto -1px",
})

export const Day = styled("div")(
  {
    userSelect: "none",
    width: 30,
    height: 30,
    marginRight: -1,
    marginBottom: -1,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #efefef",
  },
  ({
    theme,
    selected,
    isPlaceholder,
  }: {
    theme?: OperationalStyleConstants
    selected?: boolean
    isPlaceholder?: boolean
  }) => ({
    ...theme.deprecated.typography.body,
    backgroundColor: selected ? theme.deprecated.colors.info : "transparent",
    color: selected
      ? theme.deprecated.colors.white
      : isPlaceholder
        ? theme.deprecated.colors.gray
        : theme.deprecated.colors.black,
  }),
)

export const Input = styled("input")(
  ({ theme, isExpanded }: { theme?: OperationalStyleConstants; isExpanded: boolean }) => ({
    ...theme.deprecated.typography.body,
    userSelect: "none",
    borderRadius: theme.deprecated.borderRadius,
    padding: (theme.deprecated.spacing * 2) / 3,
    height: inputHeight,
    cursor: "pointer",
    border: "1px solid",
    borderColor: "rgb(208, 217, 229)",
    width: "100%",
    position: "relative",
    "&:focus": mixins.inputFocus({
      theme,
    }),
    ...(isExpanded
      ? mixins.inputFocus({
          theme,
        })
      : {}),
  }),
)

export const ClearButton = styled("div")(({ theme }: { theme?: OperationalStyleConstants }) => ({
  width: inputHeight,
  height: inputHeight,
  cursor: "pointer",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bottom: 0,
  right: -inputHeight + 1,
  opacity: 0.3,
  textAlign: "center",
  zIndex: theme.deprecated.baseZIndex + 100,
  "&:hover": {
    opacity: 1,
    "& svg": {
      stroke: theme.deprecated.colors.warning,
    },
  },
}))
