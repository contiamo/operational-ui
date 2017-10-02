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
  boxShadow: theme.shadows.card,
  backgroundColor: theme.colors.usage.cardBackground,
  color: theme.colors.usage.bodyText,

  "& p": {
    lineHeight: "20px"
  },
  "& > img": {
    maxWidth: "100%"
  },
  "& .CardHeader:not(:first-child)": {
    borderBottomStyle: "dashed"
  }
})

const Card: React.SFC<Props> = ({ className, children }: Props) => <div className={className}>{children}</div>

export default glamorous(Card)(style)
export { CardHeader }
