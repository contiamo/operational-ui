import * as React from "react"
import glamorous from "glamorous"

import CardHeader from "./Header/CardHeader"

type Props = {
  className?: string
  children: React.ReactNode
  theme?: Theme
  width?: number
  padding?: number
}

const Card: React.SFC<Props> = ({ className, children }: Props) =>
    <div className={className}>
      {children}
    </div>,
  style = ({ theme, width, padding }: Props) => ({
    width,
    padding: padding ? padding : theme.spacing ? theme.spacing : 16,
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.14)",
    backgroundColor: "white",
    "& p": {
      lineHeight: "20px",
    },
    "& > img": {
      maxWidth: "100%",
    },
  })

export default glamorous(Card)(style)
export { Card, CardHeader }
