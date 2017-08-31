// @flow
import React from "react"
import glamorous from "glamorous"
import GoX from "react-icons/lib/go/x"

import { hexOrColor, readableTextColor } from "contiamo-ui-utils"

const Chip = ({
    className,
    children,
    onClick,
    symbol
  }: {
    className: string,
    children?: string,
    onClick?: any,
    symbol?: string,
  }) =>
    <div className={`${className} chip`}>
      {children}
      {onClick &&
        <div tabIndex="-1" role="button" className="action" onClick={onClick}>
          {symbol || <GoX />}
        </div>}
    </div>,
  style = ({ theme, color, onClick }: { theme: THEME, color: string, onClick: any }) => {
    const backgroundColor = hexOrColor(color)(theme.colors ? theme.colors[color] || theme.colors.primary : "black"),
      actionStyles = onClick
        ? {
          "& .action": {
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: `0 ${theme.spacing >= 0 ? theme.spacing / 4 : 4}px`,
            width: "fit-content",
            opacity: 0,
            transform: "translateX(10px)",
            transition: ".3s transform ease, .3s opacity ease",
            backgroundColor
          },

          "& .action::before": {
            content: "\"\"",
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
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "fit-content",
      padding: theme.spacing >= 0 ? theme.spacing / 4 : 4,
      cursor: "pointer",
      overflow: "hidden",
      fontSize: ".8rem",
      backgroundColor,
      color: readableTextColor(backgroundColor)(["black", "white"]),

      "&.chip + .chip": {
        marginLeft: theme.spacing >= 0 ? theme.spacing / 4 : 4
      },

      ":hover .action": {
        opacity: 1,
        transform: "none"
      },

      ...actionStyles
    }
  }

export default glamorous(Chip)(style)
export { Chip }
