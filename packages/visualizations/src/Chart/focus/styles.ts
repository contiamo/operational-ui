import { css } from "glamor"
import theme from "../../utils/constants"

const dateFocusStyle = {
  "& li": {
    width: "max-content",
    lineHeight: "16px",
  },
  "& .title": {
    padding: "7px 0 3px 0",
  },
  "& .title:first-child": {
    paddingTop: 0,
  },
  "& .series-color": {
    width: "10px",
    height: "10px",
    margin: "3px 3px 0 0",
    float: "left",
    borderRadius: "2px",
  },
  "& .series-value": {
    fontWeight: "bold",
    float: "right",
    marginLeft: "6px",
  },
}

const elementFocusStyle = {
  "& li": {
    width: "max-content",
    lineHeight: "16px",
  },
  "& .name": {
    marginRight: "6px",
    float: "left",
  },
  "& .value": {
    fontWeight: "bold",
    float: "left",
  },
}

const flagFocusStyle = {
  fontFamily: theme.font.family,
  color: theme.colors.focus.label,
  "& li.name": {
    fontWeight: "bold",
  },
  "& li.description": {
    lineHeight: "1em",
    paddingTop: "7px",
  },
}

export const dateFocus = css(dateFocusStyle).toString()
export const elementFocus = css(elementFocusStyle).toString()
export const flagFocus = css(flagFocusStyle).toString()
