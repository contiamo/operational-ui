import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { darken } from "@operational/utils"

export interface Props {
  id?: string | number
  className?: string
  placeholder?: string
  onChange?: (newVal: string) => void
  color?: string
}

const Container = styled("div")(({ theme, color }: { theme?: OperationalStyleConstants; color?: string }) => {
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
})

const SelectFilter = (props: Props) => (
  <Container key={props.id} className={props.className}>
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
