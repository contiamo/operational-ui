import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"

import { hexOrColor } from "contiamo-ui-utils"

export interface IProps {
  css?: any
  className?: string
  size?: number
  children?: React.ReactNode
  onClick?: () => void
  color?: string
}

const Container = glamorous.div(({ theme, color, size }: { theme: Theme; color?: string; size: number }): any => {
  const borderColor = color ? hexOrColor(color)(theme.colors.palette[color] || "white") : "black"

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: size,
    height: size,
    border: "1px solid",
    cursor: "pointer",
    color: borderColor
  }
})

const PlusChip: React.SFC<IProps> = ({ css, size = 15, color, className, children, onClick }: IProps) => (
  <Container css={css} className={className} size={size} color={color} onClick={onClick} tabIndex={-1} role="button">
    {children || "+"}
  </Container>
)

export default PlusChip
