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

const style = ({ theme, width, padding }: Props) => ({
  width,
  padding: padding || theme.spacing,
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.14)",
  backgroundColor: theme.colors.white,
  "& p": {
    lineHeight: "20px"
  },
  "& > img": {
    maxWidth: "100%"
  }
})

const Card: React.SFC<Props> = ({ className, children }: Props) => <div className={className}>{children}</div>

export default glamorous(Card)(style)
export { CardHeader }
