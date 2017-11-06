import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"

import { fadeIn } from "contiamo-ui-utils"

const inputHeight: number = 31

const Container: GlamorousComponent<
  { isExpanded: boolean },
  {}
> = glamorous.div(({ isExpanded, theme }: { isExpanded: boolean; theme: Theme }): {} => ({
  display: "inline-block",
  width: "auto",
  position: "relative",
  "& .co_card": {
    display: isExpanded ? "block" : "none",
    position: "absolute",
    boxShadow: theme.shadows.popup,
    top: inputHeight + 4,
    left: 0,
    padding: `${theme.spacing * 3 / 4}px ${theme.spacing}px ${theme.spacing * 4 / 3}px`,
    width: 210 + 2 * theme.spacing,
    zIndex: theme.baseZIndex + 1000
  }
}))

const Toggle: GlamorousComponent<{ onClick?: {} }, {}> = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  width: inputHeight,
  height: inputHeight,
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.baseZIndex + 1,
  color: theme.colors.palette.grey80,
  borderLeft: `1px solid ${theme.colors.palette.grey40}`
}))

const MonthNav: GlamorousComponent<{}, {}> = glamorous.div(({ theme }: { theme: Theme }): {} => ({
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

const IconContainer: GlamorousComponent<React.HTMLProps<{}>, {}> = glamorous.div({
  backgroundColor: "#FFFFFF",
  padding: 4,
  height: "auto",
  width: "fit-content",
  cursor: "pointer"
})

const Days: GlamorousComponent<{}, {}> = glamorous.div({
  textAlign: "center",
  width: 210,
  margin: "auto -1px"
})

const Day: GlamorousComponent<
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
    backgroundColor: selected ? theme.colors.palette.success : "transparent",
    color: selected ? "#FFF" : isPlaceholder ? theme.colors.palette.grey80 : theme.colors.palette.black
  })
)

const Input: GlamorousComponent<React.HTMLProps<{}>, {}> = glamorous.input(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.body,
  userSelect: "none",
  borderRadius: 2,
  padding: theme.spacing * 2 / 3,
  height: inputHeight,
  border: "1px solid",
  borderColor: theme.colors.palette.grey30,
  width: 200,
  position: "relative",
  "&:focus": {
    outline: 0,
    borderColor: "rgba(82,168,236,.8)",
    boxShadow: theme.shadows.focus
  }
}))

const ClearButton: GlamorousComponent<React.HTMLProps<{}>, {}> = glamorous.div(({ theme }: { theme: Theme }): {} => ({
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
      stroke: theme.colors.palette.warning
    }
  }
}))

export { Container, Toggle, MonthNav, IconContainer, Days, Day, Input, ClearButton }
