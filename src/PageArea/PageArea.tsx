import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface PageAreaProps extends DefaultProps {
  /** Name of the area */
  name?: "main" | "side"
}

export const PageArea = styled("div")<PageAreaProps>(({ name }) => ({
  gridArea: name,
}))

export default PageArea
