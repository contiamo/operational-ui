import * as React from "react"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor } from "contiamo-ui-utils"

type Props = {
  theme?: Theme
  color?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
  symbol?: string
}

const style: {} = ({ theme, color, onClick }: Props) => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors[color]) : theme.colors.info
  const actionStyles = onClick
    ? {
        "& .action": {
          backgroundColor,
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: `0 ${theme.spacing / 4}px`,
          width: "fit-content",
          opacity: 0,
          transform: "translateX(10px)",
          transition: ".3s transform ease, .3s opacity ease"
        },

        "& .action::before": {
          content: "' '",
          position: "absolute",
          top: 0,
          left: "-100%",
          display: "block",
          width: "100%",
          height: "100%",
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${backgroundColor} 100%)`
        }
      }
    : {}

  return {
    backgroundColor,
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    padding: theme.spacing / 4,
    cursor: "pointer",
    overflow: "hidden",
    color: readableTextColor(backgroundColor)(["black", "white"]),

    "&.chip + .chip": {
      marginLeft: theme.spacing / 4
    },

    ":hover .action": {
      opacity: 1,
      transform: "none"
    },

    ...actionStyles
  }
}

const Chip = ({ className, children, onClick, symbol }: Props) => (
  <div className={`${className} chip`}>
    {children}
    {onClick && (
      <div tabIndex={-1} role="button" className="action" onClick={onClick}>
        {symbol || "x"}
      </div>
    )}
  </div>
)

export default glamorous(Chip)(style)
