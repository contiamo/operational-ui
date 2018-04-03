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
  },
  "& tfoot": {
    height: 2 * theme.spacing,
    position: "relative"
  }
}))

const EmptyViewTFoot = glamorous.tfoot(({ theme }: { theme: Theme }): {} => ({
  width: "100%",
  height: 2 * theme.spacing,
  position: "relative"
}))

const EmptyView = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  width: "100%",
  position: "absolute",
  top: theme.spacing,
  left: "50%",
  transform: "translate3d(-50%, -50%, 0)",
  ...theme.typography.body
}))

const Table = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <thead>
      <tr>{props.columns.map((column, index) => <th key={index}>{column}</th>)}</tr>
    </thead>
    <tbody>
      {props.rows.map((row, index) => <tr key={index}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
    </tbody>
    {props.rows.length === 0 ? (
      <EmptyViewTFoot>
        <EmptyView>This table is empty</EmptyView>
      </EmptyViewTFoot>
    ) : null}
  </Container>
)

export default Table
