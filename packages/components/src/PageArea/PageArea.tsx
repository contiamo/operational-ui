import * as React from "react"
import styled from "react-emotion"

export interface PageAreaProps {
  /** Name of the area */
  name?: string
  /** Your content */
  children?: React.ReactNode
}

const Area = styled("div")(({ name = "main" }: PageAreaProps) => ({
  gridArea: name,
}))

export default (props: PageAreaProps) => <Area {...props} />
