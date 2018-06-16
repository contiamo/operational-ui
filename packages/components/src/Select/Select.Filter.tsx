import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme, expandColor } from "@operational/theme"
import { darken } from "@operational/utils"
export interface Props {
  id?: string | number
  css?: any
  className?: string
  placeholder?: string
  onChange?: (newVal: string) => void
  color?: string
}
const Container = styled("div")(
  ({ theme, color }: { theme?: OperationalStyleConstants & { deprecated: Theme }; color?: string }) => {
    const backgroundColor = expandColor(theme.deprecated, color) || theme.deprecated.colors.white
    return {
      label: "selectfilter",
      "& > input": {
        width: "100%",
        padding: `${theme.deprecated.spacing / 2}px ${(theme.deprecated.spacing * 3) / 4}px`,
        border: 0,
        outline: "none",
        font: "inherit",
      },
    }
  },
)

const SelectFilter = (props: Props) => (
  <Container key={props.id} css={props.css} className={props.className}>
    <input
      onClick={e => e.stopPropagation()}
      onChange={(e: any) => {
        props.onChange(e.target.value)
      }}
      placeholder={props.placeholder || "Filter ..."}
    />
  </Container>
)

export default SelectFilter
