import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export type GridType = "3x2" | "1x1" | "2x2" | "IDE"

export interface Props {
  type?: GridType
  children?: React.ReactNode
}

const getGridCSSProperties = (gridType: GridType): {} => {
  if (gridType === "IDE") {
    return {
      gridTemplateColumns: "200px auto",
      gridTemplateRows: "auto"
    }
  }
  // Handle NxM case
  const gridNumbers = String(gridType).split("x")
  const cols = Number(gridNumbers[0])
  const rows = Number(gridNumbers[1])
  if (!isNaN(cols) && !isNaN(rows)) {
    return {
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`
    }
  }
  // Because GridType is defines types that all fall into the
  // cases above, this piece of code is never reached.
  // (may change if we start accepting arbitrary NxM values)
  return {}
}

const Container = glamorous.div(({ theme, gridType }: { theme: Theme; gridType: GridType }): {} => ({
  label: "Grid",
  width: "100%",
  height: "100%",
  display: "grid",
  padding: theme.spacing,
  gridColumnGap: theme.spacing,
  gridRowGap: theme.spacing,
  ...getGridCSSProperties(gridType)
}))

const Grid = (props: Props) => <Container gridType={props.type ? props.type : "3x2"}>{props.children}</Container>

export default Grid
