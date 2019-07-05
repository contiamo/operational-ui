import styled from "../utils/styled"
import { DataTableProps } from "./DataTable"
import { getHeaderRowHeight } from "./DataTable.util"

export const Container = styled("div", { shouldForwardProp: prop => prop !== "width" })<{ width: string }>`
  width: ${({ width }) => width};
  overflow: visible;
`

export const HeadersContainer = styled("div")<{
  numColumns: number
  numHeaders: number
  columnWidth: string
  rowHeight: DataTableProps<any, any>["rowHeight"]
}>`
  display: grid;
  grid-template-columns: repeat(${({ numColumns, columnWidth }) => `${numColumns}, ${columnWidth}`});
  grid-template-rows: repeat(${({ numHeaders, rowHeight }) => `${numHeaders}, ${getHeaderRowHeight(rowHeight)}px`});
`

export const Row = styled("div")<{ numCells: number; cellWidth: string }>`
  display: grid;
  grid-template-columns: repeat(${({ numCells, cellWidth }) => `${numCells}, ${cellWidth}`});
`

export const Cell = styled("div", {
  shouldForwardProp: prop => !["isEvenRow", "height", "cell", "rowIndex"].includes(prop),
})<{
  height: number
  cell: number
  rowIndex: number
  isEvenRow?: boolean
}>`
  position: relative;
  display: flex;
  align-items: center;
  border-top: 0;
  border-left: ${({ cell }) => (cell === 1 ? "1px solid" : 0)};
  border-bottom: 1px solid;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.color.border.medium};
  height: ${({ height }) => height}px;
  font-family: ${({ theme }) => theme.font.family.code};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  padding: 0 ${({ theme }) => theme.space.content}px;
  color: ${({ theme }) => theme.color.text.default};
  grid-column: ${({ cell }) => cell};
  background-color: ${({ theme, isEvenRow }) => (isEvenRow ? theme.color.background.almostWhite : theme.color.white)};
`

export const HeaderRow = styled("div", { shouldForwardProp: prop => prop !== "rowHeight" })<{
  rowHeight: DataTableProps<any, any>["rowHeight"]
}>`
  left: 0;
  width: 100%;
  position: sticky;
  grid-row: 1;
  top: 0;
  z-index: 100;
  height: ${({ rowHeight }) => getHeaderRowHeight(rowHeight)}px;
`

export const HeaderCell = styled(Cell, {
  shouldForwardProp: prop => !["rowHeight", "rowIndex"].includes(prop),
})<{
  rowHeight: DataTableProps<any, any>["rowHeight"]
  rowIndex: number
}>`
  position: relative;
  background-color: ${({ theme }) => theme.color.background.light};
  color: ${({ theme }) => theme.color.text.dark};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  border-top: ${({ rowIndex }) => (rowIndex === 0 ? "1px solid" : 0)};
  border-color: ${({ theme }) => theme.color.border.default};
  height: ${({ rowHeight }) => getHeaderRowHeight(rowHeight)}px;
`

export const DataWrapper = styled("div")<{ numHeaders: number; rowHeight: DataTableProps<any, any>["rowHeight"] }>`
  position: absolute;
  width: 100%;
  top: ${({ numHeaders, rowHeight }) => numHeaders * getHeaderRowHeight(rowHeight)}px;
`
