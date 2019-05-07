import * as React from "react"
import IconJSX from "../Icon/Icon"
import styled from "../utils/styled"

export interface DataTableProps<T> {
  editMode: boolean
  onAddClick: () => void
  rows: Array<{
    isHeading?: boolean
    isDisabled?: boolean
    cells: T
  }>
}

const Container = styled("div")<{ isEditMode: boolean }>`
  width: fit-content;
  box-shadow: ${({ isEditMode, theme }) => (isEditMode ? "0 0 1px 1px inset " + theme.color.border.invisible : "none")};
`

const Table = styled("table")`
  border-collapse: collapse;
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
  :first-child {
    background-color: ${theme.color.background.light};
    color: ${theme.color.text.light};
  }

    background-color: ${theme.color.background.lightest};
    color: ${theme.color.text.light};
  `
      : ""}
`

const Cell = styled("td")`
  border: 1px solid ${({ theme }) => theme.color.border.default};
  padding: 0;
`

const Value = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space.medium}px ${({ theme }) => theme.space.content}px;
`

const EditButton = styled(Cell)`
  text-align: center;
  vertical-align: middle;
  background-color: ${({ theme }) => theme.color.background.lightest};
  width: 150px;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.color.background.light};
  }
`

export function DataTable<T extends P[], P = any>({ rows, editMode, onAddClick }: DataTableProps<T>) {
  return (
    <Container isEditMode={editMode}>
      <Table>
        {rows.map(({ isHeading, isDisabled, cells }, rowIndex) => (
          <Row isDisabled={isDisabled} isHeading={isHeading} key={rowIndex}>
            {cells.map((cellValue, cellIndex) => (
              <Cell key={rowIndex * cellIndex}>
                <Value>{cellValue}</Value>
              </Cell>
            ))}
            {editMode && rowIndex === 0 && (
              <EditButton onClick={onAddClick} rowSpan={3}>
                <IconJSX color="primary" name="Add" />
              </EditButton>
            )}
          </Row>
        ))}
      </Table>
    </Container>
  )
}

export default DataTable
