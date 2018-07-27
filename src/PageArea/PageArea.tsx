import * as React from "react"
import styled from "../utils/styled"

export interface PageAreaProps {
  /** Name of the area */
  name?: "main" | "side"
  /** Fill the entire width */
  fill?: boolean
}

const StyledPageArea = styled("div")<PageAreaProps & { fill_?: boolean }>(({ name, fill_ }) => ({
  gridArea: name,
  maxWidth: fill_ ? "none" : 1150,
  minWidth: 800,
}))

const PageArea: React.SFC<PageAreaProps> = ({ fill, ...props }) => <StyledPageArea fill_={fill} {...props} />

export default PageArea
