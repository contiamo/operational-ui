import * as React from "react"
import styled, { css } from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"

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

interface CompProps {
  theme?: OperationalStyleConstants
}

const Container = styled("table")(({ theme }: CompProps) => ({
  width: "100%",
  backgroundColor: theme.color.white,
  textAlign: "left",
  borderCollapse: "collapse",
  fontSize: theme.font.size.small,
  fontFamily: theme.font.family.main,
}))

const Tr = styled("tr")(({ hover, theme }: { hover?: boolean } & CompProps) => ({
  height: 50,
  ":hover": hover && {
    backgroundColor: theme.color.background.lighter,
    cursor: "pointer",
  },
}))

const Th = styled("th")(({ theme }: CompProps) => ({
  verticalAlign: "bottom",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.lightest,
  paddingBottom: theme.space.base,
  "&:first-child": {
    paddingLeft: theme.space.small,
  },
}))

const Td = styled("td")(({ theme }: CompProps) => ({
  verticalAlign: "center",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.default,
  "&:first-child": {
    paddingLeft: theme.space.small,
  },
}))

const Action = styled(Td)(({ theme }: CompProps) => ({
  textAlign: "right",
  paddingRight: theme.space.content,
  color: "transparent",
  "tr:hover &, :hover": { color: theme.color.text.action },
}))

const Actions = styled(Td)(({ theme }: CompProps) => ({
  textAlign: "right",
  paddingRight: theme.space.small,
  opacity: 0,
  "tr:hover &, :hover": { opacity: 1 },
}))

const EmptyView = styled("div")(({ theme }: CompProps) => ({
  color: theme.color.text.default || "red",
  height: 50,
  lineHeight: "50px",
  textAlign: "center",
}))

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
