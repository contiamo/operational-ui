import * as React from "react"

import glamorous from "glamorous"

type Props = {
  className?: string
  children: Node
  onClick?: any
  theme: Theme
  active?: boolean
}

const style: {} = ({ theme, active }: Props) => {
  const opacity = 0.1,
    activeBackground = `rgba(0, 0, 0, ${opacity * 2})`

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${theme.spacing / 4}px ${theme.spacing / 2}px`,
    minHeight: 32,
    borderRadius: 2,
    cursor: "pointer",
    transition: ".1s background-color ease, .05s transform ease",
    userSelect: "none",
    backgroundColor: active ? activeBackground : "transparent",

    ":hover": {
      backgroundColor: `rgba(0, 0, 0, ${opacity})`
    },

    ":not(.active):active": {
      transform: "scale(0.95)",
      backgroundColor: `rgba(0, 0, 0, ${opacity * 2})`
    },

    "&.active": {
      backgroundColor: activeBackground
    },

    "& + &": {
      marginLeft: theme.spacing / 2
    },

    "& > svg": {
      width: 16,
      marginRight: theme.spacing / 2
    }
  }
}

const HeaderItem: React.SFC<Props> = ({ className, children, onClick }) => (
  <div tabIndex={-1} role="button" onClick={onClick} className={className}>
    {children}
  </div>
)

export default glamorous(HeaderItem)(style)
export { HeaderItem }
