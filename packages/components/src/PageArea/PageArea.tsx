import * as React from "react"
import styled from "react-emotion"

export interface PageAreaProps {
  /** Name of the area */
  name?: "main" | "side"
  /** Your content */
  children?: React.ReactNode
}

export const PageArea = styled("div")(({ name }: PageAreaProps) => ({
  gridArea: name,
}))

export default PageArea
