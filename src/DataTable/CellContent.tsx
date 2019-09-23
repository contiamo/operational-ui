import * as React from "react"
import isString from "lodash/isString"
import noop from "lodash/noop"

import { CellGrid, CellTruncator, ViewMoreToggle, GhostCell, dataTableActionContainerSize } from "./DataTable.styled"
import { DotMenuHorizontalIcon } from "../Icon"
import useWindowSize from "../useWindowSize"
import constants from "../utils/constants"

export interface CellContentProps {
  cell: React.ReactNode
  open: (content: string) => (e: React.MouseEvent<Element, MouseEvent>) => void
  close: () => void
}

const stringifyIfNeeded = (value: any) => {
  // We compare booleans like this and without typeof for perf
  return value === true || value === false ? String(value) : value
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

  return (
    <CellGrid ref={$cell} canTruncate={isString(cell)}>
      {isString(cell) ? <CellTruncator>{stringifyIfNeeded(cell)}</CellTruncator> : stringifyIfNeeded(cell)}
      {isString(cell) && <GhostCell ref={$ghostCell}>{stringifyIfNeeded(cell)}</GhostCell>}
      {isString(cell) && isTextOverflowing ? (
        <ViewMoreToggle>
          <DotMenuHorizontalIcon
            color="color.text.lighter"
            size={20}
            onClick={noop} // for the hover/focus effect
            onMouseEnter={open(cell)}
            onMouseLeave={close}
          />
        </ViewMoreToggle>
      ) : (
        <div /> // We need an empty element for CSS Grid to place things correctly
      )}
    </CellGrid>
  )
}

export default CellContent
