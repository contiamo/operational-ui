import * as React from "react"
import styled from "../utils/styled"

export interface Props {
  children?: React.ReactNode
}

const Container = styled("div")({
  label: "buttongroup",
  "& > button": {
    margin: 0,
  },
  "& > button:not(:first-child)": {
    // To avoid overlapping borders
    marginLeft: -1,
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  "& > button:not(:last-child)": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
})

const ButtonGroup: React.SFC<Props> = ({ children, ...props }) => <Container {...props}>{children}</Container>

export default ButtonGroup
