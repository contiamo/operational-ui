import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  columns: string[]
  rows: ((string | React.ReactNode)[])[]
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "table",
  width: "100%",
  position: "relative",
  backgroundColor: "white"
}))

const TableElement = glamorous.table(({ theme }: { theme: Theme }): {} => ({
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "left",
  tableLayout: "auto",
  "& th": {
    ...theme.typography.body,
    opacity: 0.4
  },
  "& tr": {
    borderTop: "1px solid",
    borderBottom: "1px solid"
  },
  "& tr:first-child": {
    borderTop: 0
  },
  "& tbody tr:last-child": {
    borderBottom: 0
  },
  "& td": {
    padding: `${theme.spacing * 4 / 3}px ${theme.spacing}px`,
    ...theme.typography.body
  },
  "& td, & th, & tr": {
    borderColor: theme.colors.separator,
    padding: `${theme.spacing / 2}px ${theme.spacing}px`
  }
}))

const EmptyView = glamorous.tfoot(({ theme }: { theme: Theme }): {} => ({
  padding: `${theme.spacing * 2 / 3}px ${theme.spacing}px`,
  display: "block",
  width: "100%",
  top: theme.spacing,
  textAlign: "center",
  backgroundColor: theme.colors.background,
  ...theme.typography.body
}))

const Table = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <TableElement>
      <thead>
        <tr>{props.columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
      </tbody>
    </TableElement>
    {props.rows.length === 0 ? <EmptyView>There are no records available</EmptyView> : null}
  </Container>
)

export default Table
