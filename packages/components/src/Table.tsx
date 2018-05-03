import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  css?: {}
  className?: string
  children?: React.ReactNode
  columns: string[]
  rows: ((string | React.ReactNode)[])[]
  __experimentalColumnCss?: {}[]
  __experimentalRowActions?: React.ReactNode[]
  onRowClick?: (row: (string | React.ReactNode)[], index: number) => void
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "table",
  width: "100%",
  position: "relative",
  backgroundColor: "white",
}))

const TableElement = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  width: "100%",
  textAlign: "left",
  "& tr:first-child": {
    borderTop: 0,
  },
  "& tbody tr:last-child": {
    borderBottom: 0,
  },
  "& td": {},
  "& th": {
    opacity: 0.4,
  },
}))

const TableBody = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "block",
}))

const TableBodyRow = glamorous.div(({ theme, isClickable }: { theme: Theme; isClickable: boolean }): {} => ({
  ...isClickable ? { cursor: "pointer" } : {},
  position: "relative",
  display: "flex",
  borderTop: "1px solid",
  borderColor: theme.colors.separator,
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  ":hover": {
    backgroundColor: isClickable ? theme.colors.lighterBackground : "transparent",
    "& .opui-row-actions-container": {
      display: "block",
    },
  },
}))

const TableHead = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  display: "flex",
  opacity: 0.4,
  padding: `${theme.spacing / 4}px ${theme.spacing}px`,
}))

const TableHeadCell = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.body,
  flex: 1,
}))

const TableCell = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.body,
  flex: 1,
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

const RowActionsContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  width: "fit-content",
  position: "absolute",
  top: "50%",
  right: theme.spacing / 2,
  transform: "translate3d(0, -50%, 0)",
  display: "none",
}))

const Table = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <TableElement>
      <TableHead>
        {props.columns.map((column, index) => (
          <TableHeadCell key={index} css={props.__experimentalColumnCss && props.__experimentalColumnCss[index]}>
            {column}
          </TableHeadCell>
        ))}
      </TableHead>
      <TableBody>
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
            {row.map((cell, index) => (
              <TableCell key={index} css={props.__experimentalColumnCss && props.__experimentalColumnCss[index]}>
                {cell}
              </TableCell>
            ))}
            {props.__experimentalRowActions &&
              props.__experimentalRowActions[index] && (
                <RowActionsContainer className="opui-row-actions-container">
                  {props.__experimentalRowActions[index]}
                </RowActionsContainer>
              )}
          </TableBodyRow>
        ))}
      </TableBody>
    </TableElement>
    {props.rows.length === 0 ? <EmptyView>There are no records available</EmptyView> : null}
  </Container>
)

export default Table
