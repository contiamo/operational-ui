import * as React from "react"
import glamorous from "glamorous"

import { Theme } from "contiamo-ui-theme"

export interface IProps {
  css?: any
  className?: string
  props?: IPropsSet[]
}

export interface IPropsSet {
  name: string | React.ReactElement<any>
  description?: string
  defaultValue: string | React.ReactElement<any>
  type?: string
  optional?: boolean
}

const Table = glamorous.table(({ theme }: { theme: Theme }): any => ({
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
    borderColor: theme.colors.palette.grey20,
    padding: theme.spacing
  },
  "& tr:nth-child(even)": {
    backgroundColor: "#F8F8F8"
  }
}))

const PropsTable: React.SFC<IProps> = ({ css, className, props }: IProps) => (
  <Table css={css} className={className}>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Default</th>
        <th>Type</th>
        <th>Optional?</th>
      </tr>
    </thead>
    <tbody>
      {/* I do [...props].map below to make sure we're ACTUALLY working with an array. */}
      {props ? (
        [...props].map(({ name, description, defaultValue, type, optional }, index) => (
          <tr key={index}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{defaultValue}</td>
            <td>{type}</td>
            <td>{optional ? "✅" : "🚫"}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>There seem to be no props. 😿</td>
        </tr>
      )}
    </tbody>
  </Table>
)

export default PropsTable
