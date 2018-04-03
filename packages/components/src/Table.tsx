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

const Container = glamorous.table(({ theme }: { theme: Theme }): {} => ({
  label: "table",
  width: "100%",
  minWidth: 320,
  borderCollapse: "collapse",
  position: "relative",
  tableLayout: "auto",
  textAlign: "left",
  backgroundColor: "white",
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
  padding: `${theme.spacing * 1 / 3}px ${theme.spacing}px`,
  display: "block",
  width: "100%",
  top: theme.spacing,
  backgroundColor: theme.colors.background,
  ...theme.typography.body
}))

const Table = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <thead>
      <tr>{props.columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
    </thead>
    {props.rows.length === 0 ? (
      <EmptyView>
        <tr>
          <glamorous.Td colSpan={9999}>There are no records available</glamorous.Td>
        </tr>
      </EmptyView>
    ) : null}
    <tbody>
      {props.rows.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
    </tbody>
  </Container>
)

export default Table
