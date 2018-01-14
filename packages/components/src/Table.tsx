import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  css?: {}
  className?: string
  children?: React.ReactNode
  columns: string[]
  rows: (string[])[]
}

const Container = glamorous.table(({ theme }: { theme: Theme }): {} => ({
  label: "table",
  border: 0,
  borderCollapse: "collapse",
  textAlign: "left",
  backgroundColor: "white",
  "& th": {
    border: "1px solid",
    ...theme.typography.body,
    fontWeight: 600
  },
  "& td": {
    border: "1px solid",
    ...theme.typography.body
  },
  "& td, & th": {
    borderColor: theme.colors.gray20,
    padding: `${theme.spacing / 2}px ${theme.spacing}px`
  }
}))

export default (props: IProps) => (
  <Container css={props.css} className={props.className}>
    <thead>
      <tr>{props.columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
    </thead>
    <tbody>
      {props.rows.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
    </tbody>
  </Container>
)
