import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { hexOrColor } from "@operational/utils"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  size?: number
  children?: React.ReactNode
  onClick?: () => void
  color?: string
}

const Container = glamorous.div(({ theme, color, size }: { theme: Theme; color?: string; size: number }): any => {
  const borderColor = color ? hexOrColor(color)(theme.colors[color] || "white") : "black"

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

const PlusChip = (props: IProps) => (
  <Container
    key={props.id}
    css={props.css}
    className={props.className}
    size={props.size || 15}
    color={props.color}
    onClick={props.onClick}
    tabIndex={-1}
    role="button"
  >
    {props.children || "+"}
  </Container>
)

export default PlusChip
