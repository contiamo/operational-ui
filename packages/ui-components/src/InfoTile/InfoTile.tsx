import * as React from "react"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

type Props = {
  className?: string
  label?: string
  children: React.ReactNode
  theme?: Theme
  color?: string
}

const Label = glamorous.small(({ color, theme }: Props): any => {
  const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"
  return {
    ...theme.typography.small,
    marginBottom: 3,
    fontWeight: 600,
    color: readableTextColor(backgroundColor)([theme.colors.grey60, theme.colors.grey10])
  }
})

const Container = glamorous.div(({ theme, color }: Props): any => {
  const backgroundColor = color ? hexOrColor(color)((theme.colors && theme.colors[color]) || "white") : "white"

  return {
    backgroundColor,
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    padding: theme.spacing / 2,
    color: readableTextColor(backgroundColor)(["black", "white"]),

    "& + &": {
      borderLeft: "1px solid",
      borderLeftColor: darken(backgroundColor)(10)
    }
  }
})

const InfoTile: React.SFC<Props> = ({ className, label, children, color }: Props) => (
  <Container color={color} className={`${className}`}>
    <Label color={color}>{label}</Label>
    <span>{children}</span>
  </Container>
)

export default InfoTile
