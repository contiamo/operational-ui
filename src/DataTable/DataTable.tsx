import * as React from "react"
import { FixedSizeList, ListChildComponentProps } from "react-window"

import Message from "../Internals/Message/Message"
import styled from "../utils/styled"
import { truncate } from "../utils/truncate"

export interface DataTableProps<T, P> {
  columns: T[][]

  /** A collection of rows for the table */
  rows: P[][]

  /** Maximum character length in cells before truncation. Default `40`. */
  maxCharactersInCell?: number

  /** How high is each row? Default `30px` */
  rowHeight?: number

  /** Shall we include a footer? */
  footer?: React.ReactNode

  /** How much shall we restrict the height? */
  height?: number

  /** How wide is each cell? Default `1fr` */
  cellWidth?: string
}

const Container = styled("div")`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.border.medium};
`

const HeadersContainer = styled("div")`
  border-bottom: 1px solid ${({ theme }) => theme.color.border.gentle};
`

const Row = styled("div")<{ numCells: number; cellWidth: string; isHeading?: boolean; isEven?: boolean }>`
  display: grid;
  grid-template-columns: repeat(${({ numCells, cellWidth }) => `${numCells}, ${cellWidth}`});
  background-color: ${({ theme, isHeading, isEven }) =>
    isHeading ? theme.color.background.gentle : isEven ? theme.color.background.almostWhite : theme.color.white};
`

const Cell = styled("div")<{ height: number; isHeading?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  box-shadow: 0 0 0 0.5px
    ${({ theme, isHeading }) => (isHeading ? theme.color.border.gentle : theme.color.border.medium)};
  height: ${({ height }) => height}px;
  font-family: ${({ theme }) => theme.font.family.code};
  font-weight: ${({ theme, isHeading }) => (isHeading ? theme.font.weight.bold : theme.font.weight.regular)};
  padding: ${({ theme }) => theme.space.content}px;
  color: ${({ theme, isHeading }) => (!isHeading ? theme.color.text.default : theme.color.text.dark)};
`

/**
 * @todo
 * - [ ] handle keys
 * - [ ] add tests
 */

const defaultProps = {
  rowHeight: 30,
  footer: null,
  height: 500,
  cellWidth: "1fr",
  maxCharactersInCell: 40,
}

export function DataTable<P, T>({
  columns,
  rows,
  rowHeight = defaultProps.rowHeight,
  footer = defaultProps.footer,
  height = defaultProps.height,
  cellWidth = defaultProps.cellWidth,
  maxCharactersInCell = defaultProps.maxCharactersInCell,
}: DataTableProps<T, P>) {
  if (rows.length && rows[0].length !== columns[0].length) {
    return (
      <Message color="error">
        Invalid data: `rows` have different cardinality than `columns`. Please check both props and try again.
      </Message>
    )
  }

  const numCells = React.useMemo(() => columns[0].length, [columns])
  const VirtualRow: React.FC<ListChildComponentProps> = React.useMemo(
    () =>
      React.memo(({ style, index }) => (
        <Row isEven={index % 2 === 0} style={{ ...style, height: rowHeight }} cellWidth={cellWidth} numCells={numCells}>
          {rows[index].map(cell => (
            <Cell height={rowHeight}>{truncate(maxCharactersInCell)(cell)}</Cell>
          ))}
        </Row>
      )),
    [rows],
  )

  return (
    <Container>
      <HeadersContainer>
        {columns.map(headerRow => (
          <Row isHeading numCells={numCells} cellWidth={cellWidth}>
            {headerRow.map(cell => (
              <Cell height={rowHeight} isHeading>
                {cell}
              </Cell>
            ))}
          </Row>
        ))}
      </HeadersContainer>
      <FixedSizeList
        style={{ overflow: "overlay" }}
        itemCount={rows.length}
        itemSize={rowHeight}
        height={height || 500}
        width="100%"
      >
        {VirtualRow}
      </FixedSizeList>
      {footer}
    </Container>
  )
}

// @ts-ignore this only exists for styleguidist/ts-docgen
DataTable.defaultProps = defaultProps

export default React.memo(DataTable)
