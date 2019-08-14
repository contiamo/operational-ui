import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface ButtonGroupProps extends DefaultProps {
  children?: React.ReactNode
}

const Container = styled("div")({
  label: "buttongroup",
  "& > button": {
    margin: 0,
  },
  "& > button:not(:first-of-type)": {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  "& > button:not(:last-child)": {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
})

const ButtonGroup: React.SFC<ButtonGroupProps> = ({ children, ...props }) => (
  <Container {...props}>{children}</Container>
)

export default ButtonGroup
