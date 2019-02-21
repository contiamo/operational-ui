import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface GridProps extends DefaultProps {
  /** Either 'IDE', or of an `MxN` format, with `M` and `N` as integers. */
  type: string
  children?: React.ReactNode
}

const getGridCSSProperties = (gridType: string) => {
  if (gridType === "IDE") {
    return {
      gridTemplateColumns: "200px auto",
      gridTemplateRows: "auto",
    }
  } // Handle NxM case

  const gridNumbers = String(gridType).split("x")
  const cols = Number(gridNumbers[0])
  const rows = Number(gridNumbers[1])

  if (!isNaN(cols) && !isNaN(rows)) {
    return {
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
    }
  }

  throw new Error(
    "Grid type can be either 'IDE' or of an `MxN` format, e.g. `1x2` or `5x6`. See https://ui.contiamo.com/components/grids/.",
  )
}

const Container = styled("div")<{ gridType: string }>(({ theme, gridType }) => ({
  label: "Grid",
  width: "100%",
  height: "100%",
  display: "grid",
  alignItems: "flex-start",
  padding: theme.space.content,
  gridColumnGap: theme.space.content,
  gridRowGap: theme.space.content,
  ...getGridCSSProperties(gridType),
}))

const Grid: React.SFC<GridProps> = ({ type, ...props }) => (
  <Container {...props} gridType={type}>
    {props.children}
  </Container>
)

Grid.defaultProps = {
  type: "3x2",
}

export default Grid
