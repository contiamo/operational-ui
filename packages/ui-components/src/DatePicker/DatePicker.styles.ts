import * as React from "react"
import glamorous from "glamorous"
import { css } from "glamor"

const inputHeight: number = 27

const fadeIn = css.keyframes({
  from: {
    opacity: 0,
    transform: "translate3d(-50%, -6px, 0)"
  },
  to: {
    opacity: 1,
    transform: "translate3d(-50%, 0, 0)"
  }
})

export const Container = glamorous.div(({ isExpanded, theme }: { isExpanded: boolean; theme: Theme }): any => ({
  display: "inline-block",
  width: "auto",
  position: "relative",
  "& .co_card": {
    animation: `${fadeIn} ease-in-out forwards 0.2s`,
    display: isExpanded ? "block" : "none",
    position: "absolute",
    top: 30,
    left: "50%",
    transform: "translate3d(-50%, 0, 0)",
    padding: `${theme.spacing * 3 / 4}px ${theme.spacing}px ${theme.spacing * 4 / 3}px`,
    width: 210 + 2 * theme.spacing,
    zIndex: theme.baseZIndex + 1000
  }
}))

export const Toggle = glamorous.div(({ theme }: { theme: Theme }): any => ({
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

export const MonthNav = glamorous.div(({ theme }: { theme: Theme }): any => ({
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

export const IconContainer = glamorous.div({
  backgroundColor: "#FFFFFF",
  padding: 4,
  height: "auto",
  width: "fit-content",
  cursor: "pointer"
})

export const Days = glamorous.div({
  textAlign: "center",
  width: 210,
  margin: "auto -1px"
})

export const Day = glamorous.div(
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
  ({ theme, selected, isPlaceholder }: { theme: Theme; selected?: boolean; isPlaceholder?: boolean }): any => ({
    ...theme.typography.body,
    backgroundColor: selected ? theme.colors.palette.success : "transparent",
    color: selected ? "#FFF" : isPlaceholder ? theme.colors.palette.grey80 : theme.colors.palette.black
  })
)

export const Input = glamorous.input(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.body,
  userSelect: "none",
  padding: theme.spacing / 2,
  height: inputHeight,
  border: "1px solid",
  borderColor: theme.colors.palette.grey30,
  width: 200,
  position: "relative"
}))

export const ClearButton = glamorous.div(({ theme }: { theme: Theme }): any => ({
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
