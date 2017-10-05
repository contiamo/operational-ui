import * as React from "react"
import * as Icon from "react-feather"
import glamorous from "glamorous"

import ButtonGroup from "../ButtonGroup/ButtonGroup"
import Button, { Props as ButtonProps } from "../Button/Button"

const CondensedButton: React.SFC<ButtonProps> = (props: ButtonProps) => <Button condensed {...props} />

interface Props {
  pageCount: number
  maxVisible?: number
  onChange: (page: number) => void
  page?: number
  disabled?: boolean
  theme?: Theme
}

interface ControlProps {
  type: "first" | "previous" | "next" | "last"
  pageCount: number
  page: number
  onChange: (page: number) => void
  children: any
}

const PaginatorControl = ({ type, pageCount, page, onChange, children }: ControlProps) => {
  const handleFirst = (): void => {
    if (page > 1) {
      onChange(1)
    }
  }
  const handlePrevious = (): void => {
    if (page > 1) {
      onChange(page - 1)
    }
  }
  const handleNext = (): void => {
    if (page < pageCount) {
      onChange(page + 1)
    }
  }
  const handleLast = (): void => {
    if (page < pageCount) {
      onChange(pageCount)
    }
  }

  const isDisabled = type === "previous" || type === "first" ? page === 1 : page === pageCount

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

const createPagesFragment = ({ pageCount, maxVisible, page, onChange }: Props) => {
  let skip
  if (page > maxVisible - 1 && page < pageCount) {
    skip = page - maxVisible + 1
  } else if (page === pageCount) {
    skip = page - maxVisible
  } else {
    skip = 0
  }

  // Creates an array of numbers (positive/negative) progressing from `start` up to `end`
  const range = (start: number, end: number, acc: number[] = []): number[] =>
    start > end ? acc : range(start + 1, end, [...acc, start])

  const hasEnoughPages = pageCount > maxVisible
  const adjustedMaxVisible = hasEnoughPages ? maxVisible : pageCount
  const remainingPages = pageCount - page

  const isCloseToEnd = remainingPages < adjustedMaxVisible
  const start = (isCloseToEnd ? pageCount - adjustedMaxVisible : skip + 1) || 1
  const end = isCloseToEnd ? pageCount : adjustedMaxVisible + skip

  const fragment = range(start, end).map((pageNumber, i) => (
    <CondensedButton
      key={pageNumber}
      onClick={() => {
        onChange(pageNumber)
      }}
      color={pageNumber === page && "success"}
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

const Container = glamorous.div({
  "& [role=button]": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 25
  }
})

const Paginator: React.SFC<Props> = ({ pageCount, maxVisible = 5, page = 1, onChange = () => {} }: Props) => {
  const controlProps = { pageCount, page, onChange }
  return (
    <Container>
      <ButtonGroup style={{ display: "flex", userSelect: "none" }}>
        <PaginatorControl type="first" {...controlProps}>
          <Icon.ChevronsLeft size="11" />
        </PaginatorControl>
        <PaginatorControl type="previous" {...controlProps}>
          <Icon.ChevronLeft size="11" />
        </PaginatorControl>
        {createPagesFragment({ pageCount, maxVisible, page, onChange })}
        <PaginatorControl type="next" {...controlProps}>
          <Icon.ChevronRight size="11" />
        </PaginatorControl>
        <PaginatorControl type="last" {...controlProps}>
          <Icon.ChevronsRight size="11" />
        </PaginatorControl>
      </ButtonGroup>
    </Container>
  )
}

export default Paginator
