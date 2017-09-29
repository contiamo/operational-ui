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
  boxShadow: "0px 1px 2px #d3d1d1",
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
