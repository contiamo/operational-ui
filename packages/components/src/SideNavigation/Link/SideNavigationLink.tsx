import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor, readableTextColor, darken } from "@operational/utils"

export interface IProps {
  id?: string | number
  style?: {}
  className?: string
  children: React.ReactNode
  onClick?: any
  theme?: Theme
}

const style = ({ theme, color }: { theme: Theme; color?: string }): {} => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors[color]) : theme.colors.gray90

  return {
    backgroundColor,
    position: "relative",
    zIndex: theme.baseZIndex + 1,
    margin: `0 ${theme.spacing * -0.5}px`,
    padding: `${theme.spacing}px`,
    minWidth: 200,
    borderRadius: 2,
    transition: ".1s background-color ease",
    color: readableTextColor(backgroundColor)(["black", "white"]),

    "& + &": {
      borderTop: `1px solid ${theme.colors.gray90}`
    },

    ":hover": {
      backgroundColor: darken(backgroundColor)(10)
    },

    ":focus": {
      outline: 0,
      backgroundColor: darken(backgroundColor)(15)
    },

    ":first-child": {
      marginTop: `${theme.spacing * -0.5}px`
    },

    ":last-child": {
      marginBottom: `${theme.spacing * -0.5}px`
    }
  }
}

const SideNavigationLink = (props: IProps) => (
  <div
    key={props.id}
    style={props.style}
    className={props.className}
    onClick={props.onClick}
    role="button"
    tabIndex={-1}
  >
    {props.children}
  </div>
)

export default glamorous(SideNavigationLink)(style)
export { SideNavigationLink, style } // for testing.
