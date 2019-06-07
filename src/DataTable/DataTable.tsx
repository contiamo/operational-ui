import * as React from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"

import Message from "../Internals/Message/Message"
import { truncate } from "../utils/truncate"
import { Cell, Container, DataWrapper, HeaderCell, HeaderRow, HeadersContainer, Row } from "./DataTable.styled"
import { defaultRowHeight, getRowHeight } from "./DataTable.util"

export interface DataTableProps<Columns, Rows> {
  /* The columns of our table. They are an array of header layers. */
  columns: Columns

  /** A collection of rows for the table */
  rows: Rows

  /** How high is each row (in pixels)? */
  rowHeight?: "regular" | "compact" | number

  /** Shall we include a footer? */
  footer?: React.ReactNode

  /** How much shall we restrict the height? */
  height?: number

  /** How much shall we restrict the width? Default: `unlimited` */
  width?: string

  /** How wide is each cell? Default `1fr` */
  cellWidth?: string

  /** Max characters in cell */
  maxCharactersInCell?: number

  /** A classname for all your custom CSS ~hacks~ needs */
  className?: string
}

export function DataTable<Columns extends any[][], Rows extends any[][]>({
  columns,
  rows,
  rowHeight: initialRowHeight = defaultRowHeight,
  footer = null,
  height = 500,
  width = "100%",
  cellWidth = "1fr",
  maxCharactersInCell = 30,
  className,
}: DataTableProps<Columns, Rows>) {
  if (rows.length && rows[0].length !== columns.length) {
    return (
      <Message color="error">
        Invalid data: `rows` have different cardinality ({rows[0].length}) than `columns` ({columns.length}). Please
        check both props and try again.
      </Message>
    )
  }

  const rowHeight = React.useMemo(() => getRowHeight(initialRowHeight), [initialRowHeight])

  const Table = React.useMemo(
    () =>
      React.memo(({ children, ...rest }) => (
        <>
          <HeadersContainer
            {...rest}
            numColumns={columns.length}
            numHeaders={columns[0].length}
            columnWidth={cellWidth}
            rowHeight={initialRowHeight}
          >
            {columns.map((headerRow, rowIndex) => (
              <HeaderRow
                data-cy="operational-ui__DataTable-row-header"
                rowHeight={initialRowHeight}
                key={`op-column-header-${rowIndex}`}
              >
                {headerRow.map((cell, cellIndex) => (
                  <HeaderCell
                    rowIndex={cellIndex}
                    cell={rowIndex + 1}
                    rowHeight={initialRowHeight}
                    key={`op-column-header-cell-${rowIndex}-${cellIndex}`}
                    height={rowHeight}
                  >
                    {truncate(maxCharactersInCell)(cell)}
                  </HeaderCell>
                ))}
              </HeaderRow>
            ))}
          </HeadersContainer>
          <DataWrapper numHeaders={columns[0].length} rowHeight={initialRowHeight}>
            {children}
          </DataWrapper>
        </>
      )),
    [columns, rows, rowHeight],
  )

  const numCells = React.useMemo(() => rows[0].length, [rows])
  const VirtualRow: React.FC<ListChildComponentProps> = React.useMemo(
    () =>
      React.memo(({ style, index }) => (
        <Row
          data-cy="operational-ui__DataTable-row"
          key={`op-row-${index}`}
          style={{ ...style, height: rowHeight }}
          cellWidth={cellWidth}
          numCells={numCells}
        >
          {rows[index] &&
            rows[index].map((cell, cellIndex) => (
              <Cell
                rowIndex={index}
                isEvenRow={index % 2 === 0}
                key={`op-row-${index}-cell-${cellIndex}`}
                cell={cellIndex + 1}
                height={rowHeight}
              >
                {truncate(maxCharactersInCell)(cell)}
              </Cell>
            ))}
        </Row>
      )),
    [rows, rowHeight],
  )

  return (
    <Container width={width} className={className}>
      <FixedSizeList
        itemCount={rows.length}
        itemSize={rowHeight}
        height={height}
        width={width}
        innerElementType={Table}
        /** can't use data-cy or any other prop because of react-window */
        className="operational-ui__DataTable--virtual-scroller"
        style={{ willChange: undefined }}
      >
        {VirtualRow}
      </FixedSizeList>
      {footer}
    </Container>
  )
}

export default React.memo(DataTable)
