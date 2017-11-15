import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "contiamo-ui-theme"

import { hexOrColor, darken } from "contiamo-ui-utils"

export interface IProps {
  css?: any
  key?: string | number
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

const SelectFilter: React.SFC<IProps> = ({ css, key, className, placeholder = "Filter...", onChange }: IProps) => (
  <Container key={key} css={css} className={className}>
    <input onClick={e => e.stopPropagation()} onChange={onChange} placeholder={placeholder} />
  </Container>
)

export default SelectFilter
