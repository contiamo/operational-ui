import * as React from "react"
import * as Icon from "react-feather"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import ButtonGroup from "./ButtonGroup"
import Button from "./Button"

export interface Props {
  id?: string | number
  css?: any
  className?: string
  activeColor?: string
  disabled?: boolean
  onChange: (page: number) => void
  maxVisible?: number
  page?: number
  pageCount: number
}

interface ControlProps {
  children: any
  onChange: (page: number) => void
  page: number
  pageCount: number
  type: "first" | "previous" | "next" | "last"
}

const PaginatorControl = ({ children, onChange, pageCount, page, type }: ControlProps) => {
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

  return (
    <Button condensed onClick={handler} disabled={isDisabled}>
      {children}
    </Button>
  )
}

const createPagesFragment = ({ activeColor, maxVisible, onChange, page, pageCount }: Props) => {
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

  const buttonCss: {} = { ":focus": { outline: "0", boxShadow: "none" } }

  const fragment = range(start, end).map((pageNumber, i) => (
    <Button
      css={buttonCss}
      condensed
      key={pageNumber}
      onClick={() => {
        onChange(pageNumber)
      }}
      color={pageNumber === page && activeColor}
    >
      {pageNumber}
    </Button>
  ))

  const renderUpperSeparator = () =>
    remainingPages >= maxVisible && hasEnoughPages && pageCount - adjustedMaxVisible > 1
      ? [
          <Button
            css={buttonCss}
            condensed
            key="upper"
            onClick={() => {
              onChange(page + maxVisible)
            }}
          >
            ...
          </Button>,
          <Button
            css={buttonCss}
            condensed
            key={pageCount}
            onClick={() => {
              onChange(pageCount)
            }}
          >
            {pageCount}
          </Button>
        ]
      : []

  return [...fragment, ...renderUpperSeparator()]
}

const Container = glamorous.div({
  label: "paginator",
  "& [role=button]": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 25
  },
  "& .co_bgrp": {
    display: "flex",
    userSelect: "none"
  }
})

const Paginator = ({
  activeColor = "info",
  maxVisible = 3,
  onChange = () => {},
  pageCount,
  page = 1,
  id,
  css,
  className
}: Props) => {
  const controlProps = { pageCount, page, onChange }
  return (
    <Container key={id} css={css} className={className}>
      <ButtonGroup className="co_bgrp">
        <PaginatorControl type="first" {...controlProps}>
          <Icon.ChevronsLeft size="11" />
        </PaginatorControl>
        <PaginatorControl type="previous" {...controlProps}>
          <Icon.ChevronLeft size="11" />
        </PaginatorControl>
        {createPagesFragment({ activeColor, pageCount, maxVisible, page, onChange })}
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
