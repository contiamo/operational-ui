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

export const Cell = styled.div<{
  height: number
  cell: number
  rowIndex: number
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
  font-size: ${({ theme }) => theme.font.size.fineprint}px;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.color.text.default};
  grid-column: ${({ cell }) => cell};
  background-color: ${({ theme }) => theme.color.white};
`

export const dataTableActionContainerSize = 36

export const CellGrid = styled.div<{ canTruncate: boolean }>`
  display: ${({ canTruncate }) => (canTruncate ? "grid" : "flex")};
  align-items: center;
  width: 100%;
  ${({ canTruncate }) =>
    canTruncate
      ? `grid-template-columns: calc(100% - ${dataTableActionContainerSize}px) ${dataTableActionContainerSize}px`
      : ""};
  padding: 0 ${({ theme }) => theme.space.content}px;
`

export const CellTruncator = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre;
`

export const HeaderRow = styled.div<{
  rowHeight: DataTableProps<any, any>["rowHeight"]
}>`
  width: 100%;
  position: sticky;
  grid-row: 1;
  top: 0;
  z-index: 100;
`

export const HeaderCell = styled(Cell)<{
  rowHeight: DataTableProps<any, any>["rowHeight"]
  rowIndex: number
}>`
  position: relative;
  background-color: ${({ theme }) => theme.color.background.almostWhite};
  color: ${({ theme }) => theme.color.text.dark};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  border-top: ${({ rowIndex }) => (rowIndex === 0 ? "1px solid" : 0)};
  border-color: ${({ theme }) => theme.color.border.medium};
`

export const DataWrapper = styled("div")<{ numHeaders: number; rowHeight: DataTableProps<any, any>["rowHeight"] }>`
  position: absolute;
  width: 100%;
  top: ${({ numHeaders, rowHeight }) => numHeaders * getHeaderRowHeight(rowHeight)}px;
`

/**
 * We need to render a "ghost cell" in the table
 * in order to understand if a cell's content is
 * overflowing its container and then show a
 * "see more" icon.
 *
 * This is that ghost cell.
 */

export const GhostCell = styled.div`
  position: absolute;
  top: 0;
  left: ${({ theme }) => theme.space.content}px;
  overflow: hidden;
  visibility: hidden;
  white-space: pre;
  pointer-events: none;
  max-width: 100%;
`
