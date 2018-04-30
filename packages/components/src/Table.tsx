import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  columns: string[]
  rows: ((string | React.ReactNode)[])[]
  onRowClick?: (row: (string | React.ReactNode)[], index: number) => void
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "table",
  width: "100%",
  position: "relative",
  backgroundColor: "white",
}))

const TableElement = glamorous.table(({ theme }: { theme: Theme }): {} => ({
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
  tableLayout: "auto",
  "& th, & td": {
    ...theme.typography.body,
  },
  "& tr": {
    borderTop: "1px solid",
    borderBottom: "1px solid",
    borderColor: theme.colors.separator,
  },
  "& tr:first-child": {
    borderTop: 0,
  },
  "& tbody tr:last-child": {
    borderBottom: 0,
  },
  "& td": {
    padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  },
  "& th": {
    padding: `${theme.spacing / 4}px ${theme.spacing}px`,
    opacity: 0.4,
  },
}))

const TableBodyRow = glamorous.tr(({ theme, isClickable }: { theme: Theme; isClickable: boolean }): {} => ({
  ":hover": {
    backgroundColor: isClickable ? theme.colors.lighterBackground : "transparent",
  },
}))

const EmptyView = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  padding: `${theme.spacing * 2 / 3}px ${theme.spacing}px`,
  display: "block",
  width: "100%",
  top: theme.spacing,
  textAlign: "center",
  backgroundColor: theme.colors.background,
  ...theme.typography.body,
}))

const Table = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <TableElement>
      <thead>
        <tr>{props.columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => (
          <TableBodyRow
            isClickable={Boolean(props.onRowClick)}
            key={index}
            onClick={() => {
              if (props.onRowClick) {
                props.onRowClick(row, index)
              }
            }}
          >
            {row.map((cell, index) => <td key={index}>{cell}</td>)}
          </TableBodyRow>
        ))}
      </tbody>
    </TableElement>
    {props.rows.length === 0 ? <EmptyView>There are no records available</EmptyView> : null}
  </Container>
)

export default Table
