import * as React from "react"
import glamorous, { GlamorousComponent, CSSProperties } from "glamorous"
import { Theme } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import { Card } from "../"
import * as mixins from "../utils/mixins"
import { inputDefaultWidth } from "../constants"

const inputHeight: number = 33

export interface ContainerProps {
  isExpanded: boolean
}

export const Container: GlamorousComponent<ContainerProps, ContainerProps & { theme: Theme }> = glamorous.div(
  ({ isExpanded, theme }): CSSProperties => ({
    label: "datepicker",
    width: inputDefaultWidth,
    position: "relative",
  }),
)

export const DatePickerCard = glamorous.div(
  {
    position: "absolute",
    left: 0,
  },
  ({ theme, isExpanded }: { theme: Theme; isExpanded: boolean }): CSSProperties => ({
    backgroundColor: theme.colors.white,
    display: isExpanded ? "block" : "none",
    boxShadow: theme.shadows.popup,
    borderRadius: theme.borderRadius,
    // Push down the card to the bottom of the input field,
    // plus the twice the size of the outside focus shadow.
    top: inputHeight + 6,
    padding: `${(theme.spacing * 3) / 4}px ${theme.spacing}px ${(theme.spacing * 4) / 3}px`,
    width: inputDefaultWidth,
    zIndex: theme.baseZIndex + 1000,
  }),
)

export const Toggle: GlamorousComponent<
  { onClick?: (ev: React.SyntheticEvent<MouseEvent>) => void },
  {}
> = glamorous.div(
  ({ theme }: { theme: Theme }): {} => ({
    position: "absolute",
    cursor: "pointer",
    top: 1,
    right: 1,
    borderTopRightRadius: theme.borderRadius,
    borderBottomRightRadius: theme.borderRadius,
    width: inputHeight - 2,
    height: inputHeight - 2,
    fontSize: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: theme.baseZIndex + 1000,
    color: theme.colors.inputBorder,
    borderLeft: "1px solid",
    borderColor: theme.colors.inputBorder,
    "& svg": {
      position: "relative",
      pointerEvents: "none",
    },
    ":hover": {
      backgroundColor: theme.colors.lighterBackground,
    },
  }),
)

export const MonthNav: GlamorousComponent<{}, {}> = glamorous.div(
  ({ theme }: { theme: Theme }): {} => ({
    marginBottom: theme.spacing / 2,
    textAlign: "center",
    "& > *": {
      margin: `0 6px`,
      verticalAlign: "middle",
      display: "inline-block",
    },
    "& > span": {
      ...theme.typography.body,
      userSelect: "none",
      width: 120,
      textAlign: "center",
    },
  }),
)

export const IconContainer: GlamorousComponent<React.HTMLProps<{}>, {}> = glamorous.div({
  backgroundColor: "#FFFFFF",
  padding: 4,
  height: "auto",
  width: "fit-content",
  cursor: "pointer",
})

export const Days: GlamorousComponent<{}, {}> = glamorous.div({
  textAlign: "center",
  width: 210,
  margin: "auto -1px",
})

export const Day: GlamorousComponent<
  { selected?: boolean; isPlaceholder?: boolean } & React.HTMLProps<{}>,
  {}
> = glamorous.div(
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
  ({ theme, selected, isPlaceholder }: { theme: Theme; selected?: boolean; isPlaceholder?: boolean }): {} => ({
    ...theme.typography.body,
    backgroundColor: selected ? theme.colors.info : "transparent",
    color: selected ? theme.colors.white : isPlaceholder ? theme.colors.gray : theme.colors.black,
  }),
)

export const Input = glamorous.input(
  ({ theme, isExpanded }: { theme: Theme; isExpanded: boolean }): {} => ({
    ...theme.typography.body,
    userSelect: "none",
    borderRadius: theme.borderRadius,
    padding: (theme.spacing * 2) / 3,
    height: inputHeight,
    cursor: "pointer",
    border: "1px solid",
    borderColor: "rgb(208, 217, 229)",
    width: 200,
    position: "relative",
    "&:focus": mixins.inputFocus({ theme }),
    ...(isExpanded ? mixins.inputFocus({ theme }) : {}),
  }),
)

export const ClearButton: GlamorousComponent<{ onClick?: (ev: MouseEvent) => void }, {}> = glamorous.div(
  ({ theme }: { theme: Theme }): {} => ({
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
    zIndex: theme.baseZIndex + 100,
    "&:hover": {
      opacity: 1,
      "& svg": {
        stroke: theme.colors.warning,
      },
    },
  }),
)
