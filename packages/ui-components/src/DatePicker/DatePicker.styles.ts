import * as React from "react"
import glamorous from "glamorous"

export const Container = glamorous.div(({ isExpanded, theme }: { isExpanded: boolean; theme: Theme }): any => ({
  display: "inline-block",
  width: "auto",
  position: "relative",
  "& .co_card": {
    display: isExpanded ? "block" : "none",
    position: "absolute",
    top: 30,
    left: "50%",
    transform: "translate3d(-50%, 0, 0)",
    width: 240
  }
}))

export const Toggle = glamorous.div(({ theme }: { theme: Theme }): any => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: 24,
  height: 24,
  fontSize: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: theme.baseZIndex + 1,
  color: theme.colors.palette.grey80,
  borderLeft: `1px solid ${theme.colors.palette.grey60}`
}))

export const Nav = glamorous.div(({ theme }: { theme: Theme }): any => ({
  marginBottom: theme.spacing / 2,
  textAlign: "center",
  "& > *": {
    margin: `0 6px`,
    verticalAlign: "middle",
    display: "inline-block"
  },
  "& > span": {
    ...theme.typography.body,
    width: 100,
    textAlign: "center"
  }
}))

export const IconContainer = glamorous.div({
  width: 16,
  height: 16,
  cursor: "pointer"
})

export const Days = glamorous.div({
  width: 210,
  margin: "auto"
})

export const Day = glamorous.div(
  {
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
  ({ theme, selected, isPlaceholder }: { theme: Theme; selected?: boolean; isPlaceholder?: boolean }): any => ({
    ...theme.typography.body,
    backgroundColor: selected ? theme.colors.palette.success : "transparent",
    color: selected ? "#FFF" : "#000",
    opacity: isPlaceholder ? 0.6 : 1.0
  })
)

export const Input = glamorous.input(({ theme }: { theme: Theme }): any => ({
  padding: theme.spacing / 2,
  height: 24,
  border: "1px solid",
  borderColor: theme.colors.palette.grey30,
  width: 160,
  position: "relative"
}))
