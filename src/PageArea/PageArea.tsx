import styled from "../utils/styled"

export interface PageAreaProps {
  /** Name of the area */
  name?: "main" | "side"
}

export const PageArea = styled("div")<PageAreaProps>(({ name }) => ({
  gridArea: name,
}))

export default PageArea
