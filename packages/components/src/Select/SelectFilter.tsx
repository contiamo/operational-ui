import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme, expandColor } from "@operational/theme"
import { darken } from "@operational/utils"

export interface Props {
  id?: string | number
  css?: any
  className?: string
  placeholder?: string
  onChange?: (e: React.SyntheticEvent<HTMLInputElement>) => Promise<void>
  theme?: Theme
  color?: string
}

const Container = glamorous.div(({ theme, color }: { theme: Theme; color?: string }) => {
  const backgroundColor = expandColor(theme, color) || theme.colors.white

  return {
    label: "selectfilter",
    padding: 0,
    borderBottom: "1px solid",
    borderColor: darken(backgroundColor, 10),

    "& > input": {
      width: "100%",
      padding: theme.spacing / 2,
      border: 0,
      outline: "none",
      font: "inherit"
    }
  }
})

const SelectFilter = (props: Props) => (
  <Container key={props.id} css={props.css} className={props.className}>
    <input
      onClick={e => e.stopPropagation()}
      onChange={props.onChange}
      placeholder={props.placeholder || "Filter ..."}
    />
  </Container>
)

export default SelectFilter
