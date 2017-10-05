import * as React from "react"
import * as Icon from "react-feather"
import glamorous from "glamorous"

import ButtonGroup from "../ButtonGroup/ButtonGroup"
import Button, { Props as ButtonProps } from "../Button/Button"

const CondensedButton: React.SFC<ButtonProps> = (props: ButtonProps) => <Button condensed {...props} />

interface Props {
  pageCount: number
  maxVisible?: number
  onChange: (selected: number) => void
  selected?: number
  disabled?: boolean
  theme?: Theme
}

interface ControlProps {
  type: "first" | "previous" | "next" | "last"
  pageCount: number
  selected: number
  onChange: (selected: number) => void
  children: any
}

const PaginatorControl = ({ type, pageCount, selected, onChange, children }: ControlProps) => {
  const handleFirst = (): void => {
    if (selected > 1) {
      onChange(1)
    }
  }
  const handlePrevious = (): void => {
    if (selected > 1) {
      onChange(selected - 1)
    }
  }
  const handleNext = (): void => {
    if (selected < pageCount) {
      onChange(selected + 1)
    }
  }
  const handleLast = (): void => {
    if (selected < pageCount) {
      onChange(pageCount)
    }
  }

  const isDisabled = type === "previous" || type === "first" ? selected === 1 : selected === pageCount

  let handler
  switch (type) {
    case "previous":
      handler = handlePrevious
      break
    case "first":
      handler = handleFirst
      break
    case "next":
      handler = handleNext
      break
    default:
      handler = handleLast
  }

  return <CondensedButton onClick={handler}>{children}</CondensedButton>
}

const createPagesFragment = ({ pageCount, maxVisible, selected, onChange }: Props) => {
  let skip
  if (selected > maxVisible - 1 && selected < pageCount) {
    skip = selected - maxVisible + 1
  } else if (selected === pageCount) {
    skip = selected - maxVisible
  } else {
    skip = 0
  }

  // Creates an array of numbers (positive/negative) progressing from `start` up to `end`
  const range = (start: number, end: number, acc: number[] = []): number[] =>
    start > end ? acc : range(start + 1, end, [...acc, start])

  const hasEnoughPages = pageCount > maxVisible
  const adjustedMaxVisible = hasEnoughPages ? maxVisible : pageCount
  const remainingPages = pageCount - selected

  const cond = pageCount - selected < adjustedMaxVisible
  const start = (cond ? pageCount - adjustedMaxVisible : skip + 1) || 1
  const end = cond ? pageCount : adjustedMaxVisible + skip

  const fragment = range(start, end).map((pageNumber, i) => (
    <CondensedButton
      key={pageNumber}
      onClick={() => {
        onChange(pageNumber)
      }}
      color={pageNumber === selected && "success"}
    >
      {pageNumber}
    </CondensedButton>
  ))

  const renderUpperSeparator = () =>
    remainingPages >= maxVisible && hasEnoughPages && pageCount - adjustedMaxVisible > 1
      ? [
          <CondensedButton key="upper">...</CondensedButton>,
          <CondensedButton
            key={pageCount}
            onClick={() => {
              onChange(pageCount)
            }}
          >
            {pageCount}
          </CondensedButton>
        ]
      : []

  return [...fragment, ...renderUpperSeparator()]
}

const Paginator: React.SFC<Props> = ({ pageCount, maxVisible = 5, selected = 1, onChange = () => {} }: Props) => {
  const controlProps = { pageCount, selected, onChange }
  return (
    <ButtonGroup style={{ userSelect: "none" }}>
      <PaginatorControl type="first" {...controlProps}>
        <Icon.ChevronsLeft size="10" />
      </PaginatorControl>
      <PaginatorControl type="previous" {...controlProps}>
        <Icon.ChevronLeft size="10" />
      </PaginatorControl>
      {createPagesFragment({ pageCount, maxVisible, selected, onChange })}
      <PaginatorControl type="next" {...controlProps}>
        <Icon.ChevronRight size="10" />
      </PaginatorControl>
      <PaginatorControl type="last" {...controlProps}>
        <Icon.ChevronsRight size="10" />
      </PaginatorControl>
    </ButtonGroup>
  )
}

export default Paginator
