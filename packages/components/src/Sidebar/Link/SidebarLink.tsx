import * as React from "react"
import { Link } from "react-router-dom"
import glamorous, { Div, GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor, readableTextColor, darken } from "@operational/utils"

export interface IProps {
  id?: string | number
  style?: {}
  className?: string
  children?: React.ReactNode
  to?: string
  onClick?: () => void
  symbol?: string
  theme?: Theme
  color?: string
  disabled?: boolean
  tooltip?: string
  active?: boolean
}

const style = ({ theme, color, disabled, active }: IProps): {} => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors.palette && theme.colors.palette[color]) : "#fff"
  const textColor = active
    ? theme.colors.usage.link
    : readableTextColor(backgroundColor)([theme.colors.palette.grey80, "white"])
  const disabledStyle = disabled ? { opacity: 0.25 } : { opacity: 1 }

  return {
    backgroundColor,
    ...theme.typography.body,
    fontWeight: active ? 600 : 400,
    position: "relative",
    display: "flex",
    padding: `${theme.spacing / 3}px ${theme.spacing}px`,
    cursor: "pointer",
    // react-router <Link /> wraps an <a> which can be underlined by default so
    textDecoration: "none",
    color: textColor,
    ...disabledStyle,

    "&:link, &:visited": {
      color: textColor
    },

    ":focus": {
      outline: 0
    },

    "&.co_link + .co_link": {
      borderTop: "1px solid",
      borderColor: theme.colors.usage.subContentSeparatorLine
    },

    ":hover": {
      backgroundColor: darken(backgroundColor)(2),

      // The text color needs to change too if it gets too dark 😁
      // Also, here's a prime benefit of functional JS: function composition!
      color: active ? textColor : readableTextColor(darken(backgroundColor)(5))(["black", "white"])
    }
  }
}

const Symbol = glamorous.div({
  marginLeft: "auto"
})

const SidebarLink: React.SFC<IProps> = ({ id, style, className, children, to, onClick, symbol }: IProps) => {
  // if this is expected to work with react-router,
  if (to) {
    return (
      <Link to={to ? to : ""} style={style} key={id} className={`${className} co_link`}>
        {children}
        {symbol ? <Symbol>{symbol}</Symbol> : ""}
      </Link>
    )
  }

  return (
    <div key={id} style={style} onClick={onClick} className={`${className} co_link`}>
      {children}
      {symbol ? <Symbol>{symbol}</Symbol> : ""}
    </div>
  )
}
export default glamorous(SidebarLink)(style)
export { SidebarLink, style }
