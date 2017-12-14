import { spin } from "@operational/utils"
import { Theme } from "@operational/theme"

export default ({ theme, children }: { theme: Theme; children?: Node }): {} => {
  // If we have children, style a caret.
  const caret: {} = children
    ? {
        content: '""',
        display: "block",
        width: 0,
        height: 0,
        marginLeft: "auto",
        border: "4px solid transparent",
        borderLeftColor: theme.colors.gray20,
        transition: ".15s transform ease"
      }
    : {}

  return {
    position: "relative",
    color: theme.colors.emphasizedText,

    "& .header": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      padding: `${theme.spacing * 2 / 3}px ${theme.spacing}px`,
      borderTop: "1px solid",
      borderTopColor: theme.colors.gray10,
      cursor: "pointer",
      outline: "none",
      backgroundColor: theme.colors.white
    },

    "& .header:hover": {
      backgroundColor: theme.colors.gray10
    },

    "&.open .header": {
      borderBottom: "1px solid",
      borderBottomColor: theme.colors.separator,
      fontWeight: 600,
      backgroundColor: theme.colors.gray10
    },

    // Caret styles begin here.
    "& .header::after": {
      ...caret
    },

    "&:hover .header::after": {
      borderLeftColor: theme.colors.gray80
    },

    "&.open .header.open::after": {
      // rotate the caret to face down when an item is open.
      transform: "translate3d(-2px, 2px, 0) rotate(90deg)",
      borderLeftColor: theme.colors.gray80
    },

    // Spinner for async items replaces a caret.
    "&.updating .header::after": {
      width: 16,
      height: 16,
      border: 0,
      borderRadius: "50%",
      boxShadow: `1px 0px 0px 0px ${theme.colors.gray70} inset`,
      animation: `.7s ${spin} linear infinite`
    },

    "& .content": {
      position: "relative",
      paddingLeft: theme.spacing
    }
  }
}
