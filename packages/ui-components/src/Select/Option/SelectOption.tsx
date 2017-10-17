import * as React from "react"
import glamorous from "glamorous"

import { hexOrColor, readableTextColor, darken } from "contiamo-ui-utils"

interface IProps {
  key: number | string
  css?: any
  className?: string
  selected?: boolean
  onClick?: () => void
  children?: React.ReactNode
  theme?: Theme
  color?: string
}

const Container = glamorous.div(({ theme, color, selected }: { theme: Theme; color?: string; selected: boolean }) => {
  const backgroundColor = color && theme.colors ? hexOrColor(color)(theme.colors.palette[color]) : "white"

  return {
    backgroundColor,
    padding: theme.spacing / 2,
    color: selected
      ? readableTextColor(backgroundColor)(["#aaa"])
      : readableTextColor(backgroundColor)(["black", "white"]),
    outline: "none",

    ":hover": {
      backgroundColor: darken(backgroundColor)(5),
      color: readableTextColor(darken(backgroundColor)(5))(["black", "white"])
    },

    "&:not(:first-child)": {
      borderTop: "1px solid",
      borderColor: darken(backgroundColor)(10)
    }
  }
})

const SelectOption: React.SFC<IProps> = ({ css, className, selected, color, onClick, children }: IProps) => (
  <Container
    css={css}
    className={className}
    selected={!!selected}
    color={color}
    tabIndex={-2}
    role="option"
    aria-selected={selected}
    onClick={onClick}
  >
    {children}
  </Container>
)

export default SelectOption
