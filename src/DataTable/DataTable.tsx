import * as React from "react"
import IconJSX from "../Icon/Icon"
import { setAlpha } from "../utils"
import styled from "../utils/styled"

export interface DataTableProps<T> {
  /** A collection of rows for the table */
  rows: Array<{
    isHeading?: boolean
    isDisabled?: boolean
    cells: T
  }>

  /** How much shall we restrict the height? */
  height?: number

  /** Shall we add columns? */
  onAddColumn?: () => void

  /** Shall we remove columns? */
  onRemoveColumn?: (columnIndex: number) => void

  /** Are we viewing a subset? */
  pageSize?: number

  /** Fetch more */
  onFetch?: () => void
}

const Container = styled("div")`
  width: fit-content;
  box-shadow: ${({ theme }) => "0 0 1px 1px inset " + theme.color.border.invisible};
`

const TableBody = styled("tbody", { shouldForwardProp: prop => prop !== "height" })<{ height?: number }>`
  height: ${({ height }) => height + "px" || "auto"};
  overflow: auto;
`

const Table = styled("table")`
  border-collapse: collapse;
  table-layout: fixed;
  border-spacing: 0;
`

const Row = styled("tr")<{
  isDisabled: DataTableProps<unknown>["rows"][-1]["isDisabled"]
  isHeading: DataTableProps<unknown>["rows"][-1]["isHeading"]
}>`
  opacity: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 0.4 : 1)};

  /* Heading styles */
  ${({ isHeading, theme }) =>
    isHeading
      ? `
    background-color: ${theme.color.background.gentle};
    color: ${theme.color.text.dark};
  `
      : ""}
`

const deleteButtonTag = "button"

const Cell = styled<"td" | "th">("td")<{ as: "td" | "th"; isHeading: boolean }>`
  position: relative;
  border: 1px solid;
  border-top-color: ${({ theme }) => theme.color.border.medium};
  border-bottom-color: ${({ theme }) => theme.color.border.medium};
  border-left-color: ${({ theme }) => theme.color.border.lightest};
  border-right-color: ${({ theme }) => theme.color.border.lightest};
  font-family: ${({ theme, isHeading }) => (isHeading ? theme.font.family.main : theme.font.family.code)};
  font-weight: 400;
  padding: 0;
  height: 36px;
  color: ${({ theme, isHeading }) => (!isHeading ? theme.color.text.default : theme.color.text.dark)};

  :hover ${deleteButtonTag} {
    display: flex;
  }
`

const DeleteButton = styled(deleteButtonTag)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  padding-right: ${({ theme }) => theme.space.content}px;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => setAlpha(0.04)(theme.color.primary)};
  cursor: pointer;
  display: none;
`

const Value = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10px ${({ theme }) => theme.space.content}px;
`

const dataToRow = ({ onRemoveColumn }: Partial<DataTableProps<any>>) => (
  { isHeading, isDisabled, cells }: DataTableProps<any[]>["rows"][-1],
  rowIndex: number,
) => (
  <Row isDisabled={isDisabled} isHeading={isHeading} key={rowIndex}>
    {cells.map((cellValue, cellIndex) => (
      <Cell isHeading={Boolean(isHeading)} as={isHeading ? "th" : "td"} key={rowIndex * cellIndex}>
        <Value>{cellValue}</Value>
        {Boolean(onRemoveColumn) && rowIndex === 0 && isHeading && (
          <DeleteButton
            onClick={() => {
              if (onRemoveColumn) {
                onRemoveColumn(cellIndex)
              }
            }}
          >
            <IconJSX aria-label="Remove Column" name="No" color="primary" />
          </DeleteButton>
        )}
      </Cell>
    ))}
  </Row>
)

export function DataTable<T extends P[], P = any>({ rows, height, onRemoveColumn }: DataTableProps<T>) {
  const headers = rows.filter(row => row.isHeading)
  const regularRows = rows.filter(row => !row.isHeading)

  return (
    <Container>
      <Table>
        <thead>{headers.map(dataToRow({ onRemoveColumn }))}</thead>
        <TableBody height={height}>{regularRows.map(dataToRow({ onRemoveColumn }))}</TableBody>
      </Table>
    </Container>
  )
}

export default DataTable
