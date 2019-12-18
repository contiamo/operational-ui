import * as React from "react"
import {
  Droppable,
  Draggable,
  DragDropContext,
  ResponderProvided,
  DropResult,
  DraggableProps,
} from "react-beautiful-dnd"

import ActionMenu, { ActionMenuProps } from "../ActionMenu/ActionMenu"
import { DefaultProps } from "../types"
import Small from "../Typography/Small"
import styled from "../utils/styled"
import { IconComponentType, ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from "../Icon"
import { useUniqueId } from "../useUniqueId"
import { lighten } from "../utils"

export interface TableProps<T> extends DefaultProps {
  data: T[]
  /** Table columns headings */
  columns: Array<Column<T> | Extract<keyof T, string>>
  /** Called on row click */
  onRowClick?: (dataEntry: T, index: number) => void
  /** Label to show on row hover */
  rowActionName?: string
  /**
   * Add actions on the end of each row
   */
  rowActions?: (dataEntry: T) => ActionMenuProps["items"] | React.ReactNode
  /** Icon name for row */
  icon?: (dataEntry: T) => IconComponentType
  /** Icon color for row */
  iconColor?: (dataEntry: T) => string
  /** Remove the header? */
  headless?: boolean
  /** Fixed Layout for performance */
  fixedLayout?: boolean
  /** On reorder rows, */
  onReorder?: (result: DropResult, provided: ResponderProvided) => void
  /* The index of an active row */
  activeRowIndices?: number[]
  /* Compact style rows */
  condensed?: boolean
}

export interface Column<T> {
  heading: React.ReactNode
  cell: (dataEntry: T, index: number) => React.ReactNode
  sortOrder?: "asc" | "desc"
  onSortClick?: (order: "asc" | "desc") => void
  width?: number
}

const CondensedActionMenu = styled(ActionMenu)<{ condensed?: boolean }>`
  ${({ condensed }) =>
    condensed
      ? `& div {
          margin-bottom: 0;
          height: 33px;
        }`
      : ""}
`

const Container = styled.table<{ fixedLayout: TableProps<any>["fixedLayout"] }>(({ theme, fixedLayout }) => ({
  width: "100%",
  backgroundColor: theme.color.white,
  textAlign: "left",
  borderCollapse: "collapse",
  fontSize: theme.font.size.small,
  fontFamily: theme.font.family.main,
  tableLayout: fixedLayout ? "fixed" : "initial",
}))

const Tr = styled.tr<{
  active: boolean
  isDragging?: boolean
  draggable?: boolean
  clickable?: boolean
  condensed?: boolean
}>(({ isDragging, theme, active, draggable, clickable, condensed }) => ({
  height: condensed ? 36 : 50,
  display: isDragging ? "table" : "table-row",
  tableLayout: "fixed",
  backgroundColor: active ? lighten(theme.color.primary, 54) : theme.color.white,
  ...(draggable || clickable
    ? {
        ":hover": {
          backgroundColor: active ? lighten(theme.color.primary, 52) : lighten(theme.color.primary, 54),
          cursor: clickable ? "pointer" : draggable ? "move" : "default",
        },
      }
    : {}),
  ":focus": {
    outline: "none",
    backgroundColor: lighten(theme.color.primary, 52),
  },
  ".no-focus &:focus": {
    backgroundColor: active ? lighten(theme.color.primary, 54) : theme.color.white,
  },
}))

const Thead = styled.thead`
  tr {
    height: initial;
  }
`

const Th = styled.th<{ sortable?: boolean }>(({ theme, sortable }) => ({
  position: "relative",
  borderBottom: `1px solid ${theme.color.separators.default}`,
  color: theme.color.text.dark,
  paddingBottom: theme.space.base,
  "&:first-of-type": {
    paddingLeft: theme.space.small,
  },
  paddingRight: theme.space.small,
  ...(sortable
    ? {
        ":hover": {
          cursor: "pointer",
          color: theme.color.text.light,
          svg: {
            cursor: "pointer",
            fill: theme.color.text.light,
          },
        },
      }
    : {}),
}))

const ThContent = styled.span<{ sorted?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: ${props => props.theme.space.medium}px;
  ${props => props.sorted && `color: ${props.theme.color.text.light};`};
`

const Td = styled.td<{ cellWidth?: Column<any>["width"]; coloredBorders: boolean }>(
  ({ theme, cellWidth, coloredBorders }) => ({
    verticalAlign: "middle",
    borderBottom: "1px solid",
    color: theme.color.text.default,
    borderTop: "1px solid",
    borderColor: coloredBorders ? theme.color.primary : theme.color.border.medium,
    hyphens: "auto",
    "&:first-of-type": {
      paddingLeft: theme.space.small,
    },
    paddingRight: theme.space.small,
    ...(cellWidth
      ? {
          width: cellWidth,
          wordBreak: "break-all",
          wordWrap: "break-word",
        }
      : {}),
  }),
)

const Actions = styled(Td)(({ theme }) => ({
  textAlign: "right",
  paddingRight: theme.space.small,

  /**
   * We use opacity here instead of display: none; or
   * visibility: hidden; because both mess with
   * the box model of the Td while opacity does not.
   */
  opacity: 0,
  "tr:hover &, :hover, tr:focus &, :focus-within, &:focus": {
    opacity: 1,
  },

  "& > div": {
    display: "inline-flex",
  },
}))

const CellIcon = styled(Td)<{ condensed?: boolean }>`
  width: ${({ condensed }) => (condensed ? 28 : 42)}px;
  padding: ${({ theme }) => theme.space.base}px;
  color: ${({ theme }) => theme.color.text.lightest};
`

const ActionLabel = styled(Small)`
  color: ${props => props.theme.color.primary};
  margin: 0;
  display: block;
`

const EmptyView = styled(Td)<{ condensed?: boolean }>`
  color: ${({ theme }) => theme.color.text.default};
  height: ${({ condensed }) => (condensed ? 36 : 50)}px;
  line-height: ${({ condensed }) => (condensed ? 36 : 50)}px;
  text-align: center;
`

function Table<T>({
  data = [],
  columns,
  onRowClick,
  rowActionName,
  rowActions,
  icon,
  iconColor,
  headless,
  fixedLayout,
  onReorder,
  activeRowIndices,
  condensed,
  ...props
}: TableProps<T>) {
  const uid = useUniqueId()
  const standardizedColumns: Array<Column<T>> = columns.map(column => {
    if (typeof column === "string") {
      return {
        heading: column,
        cell: (dataEntry: T) => dataEntry[column],
      }
    } else {
      return column
    }
  })

  const hasIcons = Boolean(data[0] && icon && icon(data[0]))

  const handleKeyDownOnRow = React.useCallback(
    (entry, index) => (e: React.KeyboardEvent<HTMLTableRowElement>) => {
      if (!onRowClick) {
        return
      }
      switch (e.key) {
        case "Enter":
          onRowClick(entry, index)
      }
    },
    [onRowClick],
  )

  /**
   * This exists so we don't have to extract <Tr /> further
   * down, which relies on its closure.
   */
  const PseudoDraggable = React.useMemo(() => {
    if (onReorder) {
      return Draggable
    }

    return (((props: DraggableProps) => <>{props.children({} as any, {} as any)}</>) as unknown) as typeof Draggable
  }, [onReorder])

  return (
    <DragDropContext onDragEnd={onReorder || (() => {})}>
      <Container fixedLayout={fixedLayout || Boolean(onReorder)} {...props}>
        {!headless && (
          <Thead>
            <Tr active={false /* It's a heading */}>
              {hasIcons && <Th key="-1" />}
              {standardizedColumns.map((column, columnIndex) => (
                <Th
                  key={columnIndex}
                  sortable={Boolean(column.onSortClick)}
                  onClick={() => column.onSortClick && column.onSortClick(column.sortOrder === "desc" ? "asc" : "desc")}
                >
                  <ThContent sorted={Boolean(column.sortOrder)}>
                    {column.heading}
                    {column.onSortClick && !column.sortOrder && (
                      <ChevronUpDownIcon right size={10} color="color.border.disabled" />
                    )}
                    {column.sortOrder &&
                      (column.sortOrder === "desc" ? (
                        <ChevronUpIcon right size={10} color="primary" />
                      ) : (
                        <ChevronDownIcon right size={10} color="primary" />
                      ))}
                  </ThContent>
                </Th>
              ))}
              {Boolean(rowActions || (onRowClick && rowActionName)) && <Th key="infinity" />}
            </Tr>
          </Thead>
        )}
        <Droppable droppableId={uid}>
          {droppableProvided => (
            <tbody ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}>
              {data.length ? (
                data.map((dataEntry, dataEntryIndex) => {
                  /*
                   Because of how border-collapse works, we need a different border color for this TD
                   and the subsequent TD if the current row is "active"
                  */
                  const shouldTdHaveColoredBorders = activeRowIndices
                    ? activeRowIndices.includes(dataEntryIndex) || activeRowIndices.includes(dataEntryIndex + 1)
                    : false

                  const rowAction = (() => {
                    if (!rowActions) {
                      return null
                    }
                    const dataEntryRowActions = rowActions(dataEntry)
                    return (
                      <Actions coloredBorders={shouldTdHaveColoredBorders}>
                        {Array.isArray(dataEntryRowActions) ? (
                          <CondensedActionMenu
                            items={dataEntryRowActions as ActionMenuProps["items"]}
                            condensed={condensed}
                          />
                        ) : (
                          dataEntryRowActions
                        )}
                      </Actions>
                    )
                  })()
                  return (
                    <PseudoDraggable key={dataEntryIndex} draggableId={String(dataEntryIndex)} index={dataEntryIndex}>
                      {(provided, snapshot) => (
                        <Tr
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          active={activeRowIndices ? activeRowIndices.includes(dataEntryIndex) : false}
                          ref={provided.innerRef}
                          isDragging={Boolean(snapshot.isDragging)}
                          onKeyDown={handleKeyDownOnRow(dataEntry, dataEntryIndex)}
                          tabIndex={onRowClick ? 0 : undefined}
                          role={onRowClick ? "button" : undefined}
                          draggable={Boolean(onReorder)}
                          clickable={Boolean(onRowClick)}
                          key={dataEntryIndex}
                          onClick={() => {
                            if (onRowClick) {
                              onRowClick(dataEntry, dataEntryIndex)
                            }
                          }}
                          condensed={condensed}
                        >
                          {hasIcons && (
                            <CellIcon coloredBorders={shouldTdHaveColoredBorders}>
                              {/** Because has `hasIcon`, it is guaranteed that the `icon` function exists */}
                              {React.createElement(icon!(dataEntry), { color: iconColor && iconColor(dataEntry) })}
                            </CellIcon>
                          )}
                          {standardizedColumns.map((column, columnIndex) => (
                            <Td coloredBorders={shouldTdHaveColoredBorders} cellWidth={column.width} key={columnIndex}>
                              {column.cell(dataEntry, dataEntryIndex)}
                            </Td>
                          ))}
                          {rowAction}
                          {onRowClick && rowActionName && (
                            <Actions coloredBorders={shouldTdHaveColoredBorders}>
                              <ActionLabel>{rowActionName}</ActionLabel>
                            </Actions>
                          )}
                        </Tr>
                      )}
                    </PseudoDraggable>
                  )
                })
              ) : (
                <Tr active={false /* It's empty */}>
                  <EmptyView coloredBorders={false} colSpan={columns.length} condensed={condensed}>
                    There are no records available
                  </EmptyView>
                </Tr>
              )}
            </tbody>
          )}
        </Droppable>
      </Container>
    </DragDropContext>
  )
}

export default Table
