import { css } from "glamor"
import { operational as theme } from "@operational/theme"

const flagFocusStyle = {
  fontFamily: theme.fontFamily,
  color: theme.colors.text,
  "& li.name": {
    fontWeight: "bold",
  },
  "& li.description": {
    lineHeight: "1em",
    paddingTop: "7px",
  },
}

export const flagFocus = css(flagFocusStyle).toString()
