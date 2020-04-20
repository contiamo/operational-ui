import * as React from "react"
import isString from "lodash/isString"

import { CellGrid, CellTruncator, GhostCell, dataTableActionContainerSize } from "./DataTable.styled"
import useWindowSize from "../useWindowSize"
import constants from "../utils/constants"

export interface CellContentProps {
  cell: React.ReactNode
  open: (content: string) => (e: React.MouseEvent<Element, MouseEvent>) => void
  close: () => void
}

const stringifyBooleanAndNullAndArray = (value: any) => {
  // We compare booleans like this and without typeof for perf
  return value === true || value === false || value === null || Array.isArray(value) ? String(value) : value
}

const CellContent: React.FC<CellContentProps> = ({ cell, open, close }) => {
  const $cell = React.useRef<HTMLDivElement>(null)
  const $ghostCell = React.useRef<HTMLDivElement>(null)
  const [isTextOverflowing, setIsTextOverflowing] = React.useState(false)
  const { width } = useWindowSize()

  React.useLayoutEffect(() => {
    if (!$cell.current) {
      return
    }

    if (!$ghostCell.current) {
      return
    }

    if (!cell) {
      return
    }

    if (!isString(cell)) {
      return
    }

    setIsTextOverflowing(
      $ghostCell.current.getBoundingClientRect().width >
        $cell.current.getBoundingClientRect().width - constants.space.content * 2 - dataTableActionContainerSize,
    )
  }, [width])

  const value = React.useMemo(
    () => (typeof cell === "string" ? cell.replace(/\n/g, " ") : stringifyBooleanAndNullAndArray(cell)),
    [cell],
  )

  return (
    <CellGrid ref={$cell} canTruncate={isString(value)}>
      {isString(value) && isTextOverflowing ? (
        <CellTruncator onMouseEnter={open(value)} onMouseLeave={close}>
          {value}
        </CellTruncator>
      ) : (
        value
      )}
      <GhostCell ref={$ghostCell}>{value}</GhostCell>
    </CellGrid>
  )
}

export default CellContent
