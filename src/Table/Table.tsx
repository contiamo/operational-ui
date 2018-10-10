import * as React from "react"
import ActionMenu, { ActionMenuProps } from "../ActionMenu/ActionMenu"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface TableProps extends DefaultProps {
  /** Table columns headings */
  columns: React.ReactNode[]
  /** Table rows as an array of cells */
  rows: Array<Array<string | React.ReactNode>>
  /** Called on row click */
  onRowClick?: (row: Array<string | React.ReactNode>, index: number) => void
  /**
   * Text to display on right on row hover
   */
  rowActionName?: string
  /**
   * Add actions on the end of each row
   */
  rowActions?: Array<ActionMenuProps["items"]>
}

const Container = styled("table")(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.color.white,
  textAlign: "left",
  borderCollapse: "collapse",
  fontSize: theme.font.size.small,
  fontFamily: theme.font.family.main,
}))

const Tr = styled("tr")<{ hover?: boolean }>(({ hover, theme }) => ({
  height: 50,
  ...(hover
    ? {
        ":hover": {
          backgroundColor: theme.color.background.lighter,
          cursor: "pointer",
        },
      }
    : {}),
}))

const Th = styled("th")(({ theme }) => ({
  verticalAlign: "bottom",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.lightest,
  paddingBottom: theme.space.base,
  "&:first-child": {
    paddingLeft: theme.space.small,
  },
}))

const Td = styled("td")(({ theme }) => ({
  verticalAlign: "middle",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.default,
  "&:first-child": {
    paddingLeft: theme.space.small,
  },
}))

const Action = styled(Td)(({ theme }) => ({
  textAlign: "right",
  paddingRight: theme.space.content,
  color: "transparent",
  "tr:hover &, :hover": {
    color: theme.color.text.action,
  },
}))

const Actions = styled(Td)(({ theme }) => ({
  textAlign: "right",
  paddingRight: theme.space.small,

  /**
   * We use opacity here instead of display: none; or
   * visibility: hidden; because both mess with
   * the box model of the Td while opacity does not.
   */
  opacity: 0,
  "tr:hover &, :hover": {
    opacity: 1,
  },
}))

const InlineActionMenu = styled(ActionMenu)`
  display: inline-flex;
`

const EmptyView = styled(Td)(({ theme }) => ({
  color: theme.color.text.default,
  height: 50,
  lineHeight: "50px",
  textAlign: "center",
}))

const Table: React.SFC<TableProps> = ({ rows, columns, onRowClick, rowActionName, rowActions, ...props }) => {
  return (
    <Container {...props}>
      <thead>
        <Tr>
          {columns.map((title, i) => (
            <Th key={i}>{title}</Th>
          ))}
          {Boolean(rowActions || rowActionName) && <Th />}
        </Tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((row, i) => (
            <Tr
              hover={Boolean(onRowClick)}
              key={i}
              onClick={() => {
                if (onRowClick) {
                  onRowClick(row, i)
                }
              }}
            >
              {row.map((data, j) => (
                <Td key={j}>{data}</Td>
              ))}
              {rowActionName && <Action>{rowActionName}</Action>}
              {rowActions && (
                <Actions
                  onClick={(ev: React.SyntheticEvent<Node>) => {
                    // Table row click should not trigger if this action menu is manipulated
                    ev.stopPropagation()
                  }}
                >
                  <InlineActionMenu items={rowActions[i]} />
                </Actions>
              )}
            </Tr>
          ))
        ) : (
          <Tr>
            <EmptyView colSpan={columns.length}>There are no records available</EmptyView>
          </Tr>
        )}
      </tbody>
    </Container>
  )
}

export default Table
