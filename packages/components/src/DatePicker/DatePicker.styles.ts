import * as React from "react"
import glamorous, { GlamorousComponent, CSSProperties } from "glamorous"
import { Theme } from "@operational/theme"
import { fadeIn } from "@operational/utils"

import Card from "../Card"
import * as mixins from "../utils/mixins"

const inputHeight: number = 31

export const Container: GlamorousComponent<{ isExpanded?: boolean }, {}> = glamorous.div(
  ({ isExpanded, theme }: { isExpanded?: boolean; theme: Theme }): {} => ({
    label: "datepicker",
    width: 210 + 2 * theme.spacing,
    position: "relative"
  })
)

export interface DatePickerCardProps {
  theme: Theme
  isExpanded?: boolean
}

export const DatePickerCard = glamorous(Card)(
  {
    position: "absolute",
    left: 0
  },
  ({ theme, isExpanded }: DatePickerCardProps): CSSProperties => ({
    display: isExpanded ? "block" : "none",
    boxShadow: theme.shadows.popup,
    top: inputHeight + 4,
    padding: `${theme.spacing * 3 / 4}px ${theme.spacing}px ${theme.spacing * 4 / 3}px`,
    width: 210 + 2 * theme.spacing,
    zIndex: theme.baseZIndex + 1000
  })
)

export const Toggle: GlamorousComponent<
  { onClick?: (ev: React.SyntheticEvent<MouseEvent>) => void },
  {}
> = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "absolute",
  cursor: "pointer",
  top: 1,
  right: 1,
  borderTopRightRadius: 2,
  borderBottomRightRadius: 2,
  width: inputHeight - 2,
  height: inputHeight - 2,
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.baseZIndex + 1000,
  color: theme.colors.gray80,
  borderLeft: `1px solid ${theme.colors.gray40}`,
  "& svg": {
    position: "relative",
    pointerEvents: "none"
  },
  ":hover": {
    backgroundColor: theme.colors.gray10
  }
}))

export const MonthNav: GlamorousComponent<{}, {}> = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  marginBottom: theme.spacing / 2,
  textAlign: "center",
  "& > *": {
    margin: `0 6px`,
    verticalAlign: "middle",
    display: "inline-block"
  },
  "& > span": {
    ...theme.typography.body,
    userSelect: "none",
    width: 100,
    textAlign: "center"
  }
}))

export const IconContainer: GlamorousComponent<React.HTMLProps<{}>, {}> = glamorous.div({
  backgroundColor: "#FFFFFF",
  padding: 4,
  height: "auto",
  width: "fit-content",
  cursor: "pointer"
})

export const Days: GlamorousComponent<{}, {}> = glamorous.div({
  textAlign: "center",
  width: 210,
  margin: "auto -1px"
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
    border: "1px solid #efefef"
  },
  ({ theme, selected, isPlaceholder }: { theme: Theme; selected?: boolean; isPlaceholder?: boolean }): {} => ({
    ...theme.typography.body,
    backgroundColor: selected ? theme.colors.success : "transparent",
    color: selected ? "#FFF" : isPlaceholder ? theme.colors.gray80 : theme.colors.black
  })
)

export const Input: GlamorousComponent<React.HTMLProps<{}>, {}> = glamorous.input(
  ({ theme }: { theme: Theme }): {} => ({
    ...theme.typography.body,
    userSelect: "none",
    borderRadius: 2,
    padding: theme.spacing * 2 / 3,
    height: inputHeight,
    cursor: "pointer",
    border: "1px solid",
    borderColor: theme.colors.gray30,
    width: 200,
    position: "relative",
    "&:focus": mixins.inputFocus({ theme })
  })
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
        stroke: theme.colors.warning
      }
    }
  })
)
