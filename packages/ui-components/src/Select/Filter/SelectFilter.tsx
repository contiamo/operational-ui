import * as React from "react"
import glamorous from "glamorous"

import { hexOrColor, darken } from "contiamo-ui-utils"

interface IProps {
  css?: any
  className?: string
  placeholder?: string
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => Promise<void>
  theme?: Theme
  color?: string
}

const Container = glamorous.div(({ theme, color }: { theme: Theme; color?: string }) => {
  const backgroundColor = color ? hexOrColor(color)(theme.colors.palette[color]) : "white"

  return {
    padding: 0,
    borderBottom: "1px solid",
    borderColor: darken(backgroundColor)(10),

    "& > input": {
      width: "100%",
      padding: theme.spacing / 2,
      border: 0,
      outline: "none",
      font: "inherit"
    }
  }
})

const SelectFilter: React.SFC<IProps> = ({ css, className, placeholder = "Filter...", onChange }: IProps) => (
  <Container css={css} className={className}>
    <input onClick={e => e.stopPropagation()} onChange={onChange} placeholder={placeholder} />
  </Container>
)

export default SelectFilter
