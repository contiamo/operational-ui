import * as React from "react"
import { SFC } from "react"
import { Link } from "react-router-dom"

import glamorous, { Div } from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type Props = {
  className?: string
  children: React.ReactNode
  to?: string
  onClick?: () => void
  symbol?: string
  theme?: Theme
  color?: string
  disabled?: boolean
  tooltip?: string
}

const style: {} = ({ theme, color, disabled }: Props) => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors && theme.colors[color]) : "#fff",
    textColor = readableTextColor(backgroundColor)([theme.colors.grey80, "white"]),
    disabledStyle = disabled ? { opacity: 0.25 } : { opacity: 1 }

  return {
    ...theme.typography.body,
    position: "relative",
    display: "flex",
    padding: theme.spacing / 2,
    transition: "background-color .1s ease",
    cursor: "pointer",
    // react-router <Link /> wraps an <a> which can be underlined by default so
    textDecoration: "none",
    color: textColor,
    backgroundColor,
    ...disabledStyle,

    "&:link, &:visited": {
      color: textColor
    },

    "&.SideNavigationLink + .SideNavigationLink": {
      borderTop: "1px solid",
      borderColor: theme.colors.grey10
    },

    ":hover": {
      backgroundColor: darken(backgroundColor)(5),

      // The text color needs to change too if it gets too dark 😁
      // Also, here's a prime benefit of functional JS: function composition!
      color: readableTextColor(darken(backgroundColor)(5))(["black", "white"])
    },
    // Symbol goes on the right.
    "& > .symbol": {
      marginLeft: "auto"
    }
  }
}

const SidebarLink: SFC<Props> = ({ className, children, to, onClick, symbol }: Props) => {
  // if this is expected to work with react-router,
  if (to) {
    return (
      <Link to={to ? to : ""} className={`${className} SideNavigationLink`}>
        {children}
        {symbol ? <div className="symbol">{symbol}</div> : ""}
      </Link>
    )
  }

  return (
    <div onClick={onClick} className={`${className} SideNavigationLink`}>
      {children}
      {symbol ? <div className="symbol">{symbol}</div> : ""}
    </div>
  )
}
export default glamorous(SidebarLink)(style)
export { SidebarLink, style }
