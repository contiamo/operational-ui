import * as React from "react"
import styled from "../utils/styled"

export interface Props {
  id?: string | number
  className?: string
  placeholder?: string
  onChange?: (newVal: string) => void
  color?: string
}

const Container = styled("div")(({ theme }) => {
  return {
    label: "selectfilter",
    "& > input": {
      width: "100%",
      padding: theme.space.content,
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
      onChange={e => {
        if (props.onChange) {
          props.onChange(e.target.value)
        }
      }}
      placeholder={props.placeholder || "Filter ..."}
    />
  </Container>
)

export default SelectFilter
