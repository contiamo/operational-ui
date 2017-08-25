// @flow
import { hexOrColor, readableTextColor } from "../../utils/color"
import { spin, fadeIn, resetTransform } from "../../utils/animations"

export default (
  {
    theme,
    color,
    disabled
  }: {
    theme: THEME,
    color?: string,
    disabled?: boolean,
  } = {}
) => {
  const backgroundColor =
    color && theme.colors ? hexOrColor(color)(theme.colors[color]) : "white"

  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: theme.spacing ? theme.spacing / 2 : 8,
    paddingRight: theme.spacing ? theme.spacing / 2 + 40 : 48,
    width: "fit-content",
    minHeight: 20,
    border: "1px solid",
    borderColor: theme.greys ? theme.greys[30] : "#ccc",
    opacity: disabled ? 0.5 : 1,
    cursor: "pointer",
    backgroundColor,
    color: readableTextColor(backgroundColor)(["black", "white"]),
    outline: "none",
    pointerEvents: disabled ? "none" : "all",

    // downward caret.
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      right: theme.spacing ? theme.spacing / 2 : 8,
      width: 0,
      height: 0,
      border: "4px solid transparent",
      borderTopColor: theme.greys ? theme.greys[70] : "#888",
      transform: "translateY(calc(-50% + 2px))"
    },

    // spinner when loading.
    "&.Select_updating::after": {
      top: 6,
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: `1px 0px 0px 0px ${theme.greys
        ? theme.greys["70"]
        : "#666"} inset`,
      animation: `.7s ${spin} linear infinite`
    },

    "& .Select__options": {
      position: "absolute",
      top: "calc(100% + 1px)",
      left: 0,
      zIndex: theme.baseZIndex ? theme.baseZIndex * 1000 : 1000,
      width: "100%",
      boxShadow: "0 2px 7px 2px rgba(0, 0, 0, .14)",
      opacity: 0,
      transform: "translateY(-10px)",
      animation: `${fadeIn} .15s forwards ease,
        ${resetTransform} .15s forwards ease`
    },

    "& .Select__options_list": {
      maxHeight: "50vh"
    }
  }
}
