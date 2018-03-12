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
  minWidth: 320,
  borderCollapse: "collapse",
  border: "1px solid",
  borderColor: theme.colors.separator,
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
    padding: `${theme.spacing * 2 / 3}px ${theme.spacing * 4 / 3}px`,
    ...theme.typography.body
  },
  "& td, & th, & tr": {
    borderColor: theme.colors.separator,
    padding: `${theme.spacing / 2}px ${theme.spacing}px`
  }
}))

const Table = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <thead>
      <tr>{props.columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
    </thead>
    <tbody>
      {props.rows.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
    </tbody>
  </Container>
)

export default Table
