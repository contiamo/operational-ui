import { spin } from "contiamo-ui-utils"
import { Theme } from "contiamo-ui-theme"

export default ({ theme, children }: { theme: Theme; children?: Node }): {} => {
  // If we have children, style a caret.
  const caret: {} = children
    ? {
        content: "\"\"",
        display: "block",
        width: 0,
        height: 0,
        marginLeft: "auto",
        border: "4px solid transparent",
        borderLeftColor: theme.colors.palette.grey20,
        transition: ".15s transform ease"
      }
    : {}

  return {
    position: "relative",
    color: theme.colors.usage.emphasizedText,

    "& .header": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: `${theme.spacing * 2 / 3}px ${theme.spacing}px`,
      borderTop: "1px solid",
      borderTopColor: theme.colors.palette.grey10,
      cursor: "pointer",
      outline: "none",
      backgroundColor: theme.colors.palette.white
    },

    "& .header:hover": {
      backgroundColor: theme.colors.palette.grey10
    },

    "&.open .header": {
      borderBottom: "1px solid",
      borderBottomColor: theme.colors.usage.contentSeparatorLine,
      fontWeight: 600,
      backgroundColor: theme.colors.palette.grey10
    },

    // Caret styles begin here.
    "& .header::after": {
      ...caret
    },

    "&:hover .header::after": {
      borderLeftColor: theme.colors.palette.grey80
    },

    "&.open .header.open::after": {
      // rotate the caret to face down when an item is open.
      transform: "translate3d(-2px, 2px, 0) rotate(90deg)",
      borderLeftColor: theme.colors.palette.grey80
    },

    // Spinner for async items replaces a caret.
    "&.updating .header::after": {
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: `1px 0px 0px 0px ${theme.colors.palette.grey70} inset`,
      animation: `.7s ${spin} linear infinite`
    },

    "& .content": {
      position: "relative",
      paddingLeft: theme.spacing
    }
  }
}
