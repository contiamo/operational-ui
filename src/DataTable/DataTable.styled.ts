import { keyframes } from "@emotion/core"

import styled from "../utils/styled"
import { DataTableProps } from "./DataTable"
import { getHeaderRowHeight } from "./DataTable.util"
import { customScrollbar } from "../utils"

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

export const HeaderRow = styled.div<{
  rowHeight: DataTableProps<any, any>["rowHeight"]
}>`
  width: 100%;
  position: sticky;
  grid-row: 1;
  top: 0;
  z-index: 100;
  height: ${({ rowHeight }) => getHeaderRowHeight(rowHeight)}px;
`

export const HeaderCell = styled(Cell)<{
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

export const ViewMoreToggle = styled("div", { shouldForwardProp: prop => prop !== "height" })<{ height: number }>`
  position: absolute;
  right: 0;
  top: 0;
  height: ${({ height }) => height}px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  padding-right: ${({ theme }) => theme.space.small}px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 1) 46%);
  border-radius: ${({ theme }) => theme.borderRadius}px;

  > * {
    pointer-events: none;
  }
`

const animateIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
`

export const ViewMorePopup = styled.div<{ top: number; left: number }>`
  position: fixed;
  padding: ${({ theme }) => theme.space.content}px;
  font-family: ${({ theme }) => theme.font.family.code};
  max-height: 50vh;
  max-width: 50vw;
  word-wrap: break-word;
  word-break: break-all;
  hyphens: auto;
  overflow: auto;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => theme.shadows.popup};
  animation: ${animateIn} 0.15s ease forwards;

  ${customScrollbar}

  ${({ left }) =>
    window.innerWidth - left > 0.5 * window.innerWidth ? `left: ${left}` : `right: ${window.innerWidth - left}`}px;
  ${({ top }) =>
    window.innerHeight - top > 0.5 * window.innerHeight ? `top: ${top}` : `bottom: ${window.innerHeight - top}`}px;
`
