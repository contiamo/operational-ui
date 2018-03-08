import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export type GridType = "3x2" | "1x1" | "2x2" | "IDE"

export interface Props {
  type?: GridType
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme, gridType }: { theme: Theme; gridType: GridType }): {} => {
  return {
    label: "Grid",
    width: "100%",
    height: "100%",
    display: "grid",
    padding: theme.spacing,
    gridColumnGap: theme.spacing,
    gridRowGap: theme.spacing,
    ...(() => {
      switch (gridType) {
        case "3x2":
          return {
            gridTemplateColumns: "auto auto auto",
            gridTemplateRows: "auto auto"
          }
        case "1x1":
          return {
            gridTemplateColumns: "auto",
            gridTemplateRows: "auto"
          }
        case "2x2":
          return {
            gridTemplateColumns: "auto auto",
            gridTemplateRows: "auto auto"
          }
        case "IDE":
          return {
            gridTemplateColumns: "200px auto",
            gridTemplateRows: "auto"
          }
      }
    })()
  }
})

const Grid = (props: Props) => <Container gridType={props.type ? props.type : "3x2"}>{props.children}</Container>

export default Grid
