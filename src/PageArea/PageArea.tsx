import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface PageAreaProps extends DefaultProps {
  /** Name of the area */
  name?: "main" | "side"
  fill?: boolean
}

const PageArea = styled("div", { shouldForwardProp: prop => prop !== "fill" })<PageAreaProps>(
  ({ name, fill = false }) => ({
    gridArea: name,
    height: fill ? "100%" : "auto",
  }),
)

export default PageArea
