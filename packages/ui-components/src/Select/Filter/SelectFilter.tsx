import * as React from "react"
import glamorous from "glamorous"

import { hexOrColor, darken } from "contiamo-ui-utils"

type Props = {
  className?: string
  placeholder?: string
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => Promise<void>
  theme?: Theme
  color?: string
}

const Container = glamorous.div(
  ({} = ({ theme, color }: Props) => {
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
)

const SelectFilter: React.SFC<Props> = ({ className, placeholder = "Filter...", onChange }: Props) => (
  <Container className={className}>
    <input onClick={e => e.stopPropagation()} onChange={onChange} placeholder={placeholder} />
  </Container>
)

export default SelectFilter
