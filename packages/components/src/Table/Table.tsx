import * as React from "react"
import styled, { css } from "react-emotion"
import { operational } from "@operational/theme"

export interface Props {
  /** Table columns headings */
  columns: string[]
  /** Table rows as an array of cells */
  rows: ((string | React.ReactNode)[])[]
  /** Called on row click */
  onRowClick?: (row: (string | React.ReactNode)[], index: number) => void
  /**
   * Text to display on right on row hover
   */
  rowActionName?: string
  /**
   * This will not work anymore!
   * @deprecated
   */
  __experimentalColumnCss?: any
  /**
   * Add actions on the end of each row
   */
  __experimentalRowActions?: React.ReactNode[]
}

const Container = styled("table")({
  width: "100%",
  backgroundColor: "white",
  textAlign: "left",
  borderCollapse: "collapse",
  fontSize: 13,
  fontFamily: operational.fontFamily,
})

const Tr = styled("tr")(({ hover }: { hover?: boolean }) => ({
  height: 50,
  ":hover": hover && {
    backgroundColor: "#F6F6F6",
    cursor: "pointer",
  },
}))

const Th = styled("th")({
  verticalAlign: "bottom",
  borderBottom: "1px solid #e8e8e8",
  color: "#909090",
  paddingBottom: 5,
  "&:first-child": {
    paddingLeft: 12,
  },
})

const Td = styled("td")({
  verticalAlign: "center",
  borderBottom: "1px solid #e8e8e8",
  color: "#545454",
  "&:first-child": {
    paddingLeft: 12,
  },
})

const Action = styled(Td)({
  textAlign: "right",
  paddingRight: 10,
  color: "transparent",
  "tr:hover &, :hover": { color: "#1499CE" },
})

const Actions = styled(Td)({
  textAlign: "right",
  paddingRight: 10,
  opacity: 0,
  "tr:hover &, :hover": { opacity: 1 },
})

const EmptyView = styled("div")({
  color: "#545454",
  height: 50,
  lineHeight: "50px",
  textAlign: "center",
})

const Table: React.SFC<Props> = ({ rows, columns, onRowClick, rowActionName, __experimentalRowActions, ...props }) => {
  return (
    <>
      <Container {...props}>
        <thead>
          <Tr>
            {columns.map((title, i) => <Th key={i}>{title}</Th>)}
            {Boolean(__experimentalRowActions || rowActionName) && <Th />}
          </Tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <Tr hover={Boolean(onRowClick)} key={i} onClick={() => onRowClick(row, i)}>
              {row.map((data, j) => <Td key={j}>{data}</Td>)}
              {rowActionName && <Action>{rowActionName}</Action>}
              {__experimentalRowActions && <Actions>{__experimentalRowActions[i]}</Actions>}
            </Tr>
          ))}
        </tbody>
      </Container>
      {rows.length < 1 && <EmptyView>There are no records available</EmptyView>}
    </>
  )
}

export default Table
