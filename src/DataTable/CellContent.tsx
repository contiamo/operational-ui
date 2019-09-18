import * as React from "react"
import isString from "lodash/isString"
import noop from "lodash/noop"

import { CellGrid, CellTruncator, ViewMoreToggle } from "./DataTable.styled"
import { DotMenuHorizontalIcon } from "../Icon"

export interface CellContentProps {
  cell: React.ReactNode
  open: (content: string) => (e: React.MouseEvent<Element, MouseEvent>) => void
}

const stringifyIfNeeded = (value: any) => {
  // We compare booleans like this and without typeof for perf
  return value === true || value === false ? String(value) : value
}

const CellContent: React.FC<CellContentProps> = ({ cell, open }: any) => {
  const glyphSize = 8 // it's an opinionated UI library don't @ me
  const $cell = React.useRef<HTMLDivElement | null>(null)
  const [isTextProbablyOverflowing, setIsTextProbablyOverflowing] = React.useState(false)

  React.useLayoutEffect(() => {
    const currentCell = $cell.current
    if (currentCell) {
      if (cell.length * glyphSize > currentCell.getBoundingClientRect().width) {
        setIsTextProbablyOverflowing(true)
      } else {
        setIsTextProbablyOverflowing(false)
      }
    }
  }, [])

  return (
    <CellGrid ref={$cell} canTruncate={isString(cell)}>
      {isString(cell) ? <CellTruncator>{stringifyIfNeeded(cell)}</CellTruncator> : stringifyIfNeeded(cell)}
      {isString(cell) && isTextProbablyOverflowing ? (
        <ViewMoreToggle onClick={open(cell)}>
          <DotMenuHorizontalIcon
            color="color.text.lighter"
            size={20}
            onClick={noop} // for the hover/focus effect
          />
        </ViewMoreToggle>
      ) : (
        <div />
      )}
    </CellGrid>
  )
}

export default CellContent
