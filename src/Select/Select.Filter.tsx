import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

export interface Props {
  id?: string | number
  className?: string
  placeholder?: string
  onChange?: (newVal: string) => void
  color?: string
}

const Container = styled("div")(({ theme, color }: { theme?: OperationalStyleConstants; color?: string }) => {
  return {
    label: "selectfilter",
    "& > input": {
      width: "100%",
      padding: `${theme.deprecated.spacing / 2}px ${theme.deprecated.spacing * 3 / 4}px`,
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
