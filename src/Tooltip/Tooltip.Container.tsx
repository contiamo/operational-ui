import tinycolor from "tinycolor2"

import styled from "../utils/styled"

export type Position = "top" | "left" | "right" | "bottom"

const makeContainerPositionStyles = (position: Position) => {
  switch (position) {
    case "top":
      return {
        left: "50%",
        top: -6,
        transform: "translate3d(-50%, -100%, 0)",
      }
    case "bottom":
      return {
        left: "50%",
        top: "100%",
        transform: "translate3d(-50%, 6px, 0)",
      }
    case "left":
      return {
        // 1px nudge fixes visual misalignment for carets that are rendered at half-pixel
        top: "calc(50% - 1px)",
        left: -6,
        transform: "translate3d(-100%, -50%, 0)",
      }
    case "right":
      return {
        // 1px nudge fixes visual misalignment for carets that are rendered at half-pixel
        top: "calc(50% - 1px)",
        right: -6,
        transform: "translate3d(100%, -50%, 0)",
      }
  }
}

const makeCaretPositionStyles = (position: Position, backgroundColor: string): {} => {
  switch (position) {
    case "top":
      return {
        bottom: -4,
        left: `calc(50% - 6px)`,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: `6px solid ${backgroundColor}`,
      }
    case "bottom":
      return {
        top: -4,
        left: `calc(50% - 6px)`,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderBottom: `6px solid ${backgroundColor}`,
      }
    case "left":
      return {
        right: -4,
        top: `calc(50% - 6px)`,
        borderTop: "6px solid transparent",
        borderBottom: "6px solid transparent",
        borderLeft: `6px solid ${backgroundColor}`,
      }
    case "right":
      return {
        left: -4,
        top: `calc(50% - 6px)`,
        borderTop: "6px solid transparent",
        borderBottom: "6px solid transparent",
        borderRight: `6px solid ${backgroundColor}`,
      }
  }
}

export const Container = styled("div")<{
  position: Position
  offScreenWidthTest?: boolean
  singleLineTextWidth: number
}>(({ position, offScreenWidthTest, singleLineTextWidth, theme }) => {
  const backgroundColor = tinycolor(theme.color.black)
    .setAlpha(0.9)
    .toString()
  return {
    backgroundColor,
    label: "tooltip",
    color: theme.color.white,
    position: "absolute",
    zIndex: theme.zIndex.tooltip,
    borderRadius: 2,
    boxShadow: "0 2px 6px rgba(0, 0, 0, .15)",
    "& > p": {
      fontSize: 11,
      lineHeight: 1.3,
      margin: 0,
      padding: "2px 6px",
      textAlign: "center",
    },
    ...(offScreenWidthTest
      ? {
          width: "fit-content",
          whiteSpace: "nowrap",
          position: "fixed",
          visibility: "hidden",
          top: -200,
          left: -200,
        }
      : {
          // If there was an issue determining singleLineTextWidth, default to the 150px width
          // Otherwise, honor the single line text width unless greater than 150px.
          width: singleLineTextWidth === 0 ? 150 : Math.min(singleLineTextWidth + 4, 150),
        }),
    ...makeContainerPositionStyles(position),
    // This pseudo-element extends the clickable area of a tooltip extending enough to disappear as the mouse moves over to the caret.
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: -32,
      display: "block",
      width: -32,
      height: "100%",
    },
    // They say behind every great tooltip is a great caret.
    "&::before": {
      content: "''",
      position: "absolute",
      zIndex: theme.zIndex.tooltip,
      width: 0,
      height: 0,
      ...makeCaretPositionStyles(position, backgroundColor),
    },
  }
})

export default Container
