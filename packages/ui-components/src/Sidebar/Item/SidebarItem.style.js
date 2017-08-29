// @flow
import { spin } from "contiamo-ui-utils"

export default ({ theme, children }: { theme: THEME, children: mixed }): {} => {
  // If we have children, style a caret.
  const caret: {} = children
    ? {
      content: "\"\"",
      display: "block",
      width: 0,
      height: 0,
      marginLeft: "auto",
      border: "4px solid transparent",
      borderLeftColor: theme.greys ? theme.greys["30"] : "#ccc",
      transition: ".15s transform ease"
    }
    : {}

  return {
    position: "relative",

    "& .header": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: theme.spacing >= 0 ? theme.spacing / 2 : 8,
      borderTop: "1px solid",
      borderTopColor: theme.greys ? theme.greys["20"] : "#eee",
      cursor: "pointer",
      backgroundColor: theme.greys ? theme.greys.white : "white"
    },

    "& .header:hover": {
      backgroundColor: theme.greys && theme.greys["10"]
    },

    "&.open .header": {
      borderBottom: "1px solid",
      borderBottomColor: theme.greys ? theme.greys["30"] : "#ccc"
    },

    // Caret styles begin here.
    "& .header::after": {
      ...caret
    },

    "&.open .header.open::after": {
      // rotate the caret to face down when an item is open.
      transform: "translateX(-2px) rotate(90deg)"
    },

    // Spinner for async items replaces a caret.
    "&.updating .header::after": {
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: `1px 0px 0px 0px ${theme.greys
        ? theme.greys["70"]
        : "#666"} inset`,
      animation: `.7s ${spin} linear infinite`
    },

    "& .content": {
      position: "relative",
      paddingLeft: theme.spacing
    },

    // This pseudo-element creates a visible indent for structure clarity.
    "& .content::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      width: theme.spacing,
      height: "100%",
      borderRight: `1px solid ${theme.greys ? theme.greys["30"] : "#ccc"}`,
      backgroundColor: theme.greys ? theme.greys["10"] : "#eee"
    }
  }
}
