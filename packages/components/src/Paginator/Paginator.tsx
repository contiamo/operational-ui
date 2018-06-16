import * as React from "react"
import * as Icon from "react-feather"
import styled from "react-emotion"
import { OperationalStyleConstants, Theme } from "@operational/theme"
import { Css, CssStatic } from "../types"
export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  /** Disable the component */

  disabled?: boolean
  /** Function to be executed after changing page */

  onChange?: (page: number) => void
  maxVisible?: number
  /** Index of the current selected page */

  page?: number
  /** Total number of pages */

  pageCount: number
}
const PaginatorSpan = styled("div")(
  ({
    theme,
    isActive,
    isDisabled,
  }: {
    theme?: OperationalStyleConstants & { deprecated: Theme }
    isActive?: boolean
    isDisabled?: boolean
  }): CssStatic => ({
    ...theme.deprecated.typography.body,
    padding: theme.deprecated.spacing / 4,
    borderRadius: 2,
    height: theme.deprecated.spacing * 1.5,
    display: "inline-flex",
    cursor: "pointer",
    userSelect: "none",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    color: isActive ? theme.deprecated.colors.info : theme.deprecated.colors.text,
    ":hover": {
      backgroundColor: theme.deprecated.colors.background,
    },
  }),
)
interface ControlProps {
  children: any
  onChange?: (page: number) => void
  page: number
  pageCount: number
  type: "first" | "previous" | "next" | "last"
}

const PaginatorControl = ({ children, onChange, pageCount, page, type }: ControlProps) => {
  const handleFirst = (): void => {
    if (page > 1) {
      onChange && onChange(1)
    }
  }

  const handlePrevious = (): void => {
    if (page > 1) {
      onChange && onChange(page - 1)
    }
  }

  const handleNext = (): void => {
    if (page < pageCount) {
      onChange && onChange(page + 1)
    }
  }

  const handleLast = (): void => {
    if (page < pageCount) {
      onChange && onChange(pageCount)
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
    <PaginatorSpan onClick={handler} isDisabled={isDisabled}>
      {children}
    </PaginatorSpan>
  )
}

const createPagesFragment = ({ maxVisible, onChange, page, pageCount }: Props) => {
  let skip

  if (page > maxVisible - 1 && page < pageCount) {
    skip = page - maxVisible + 1
  } else if (page === pageCount) {
    skip = page - maxVisible
  } else {
    skip = 0
  } // Creates an array of numbers (positive/negative) progressing from `start` up to `end`

  const range = (start: number, end: number, acc: number[] = []): number[] =>
    start > end ? acc : range(start + 1, end, [...acc, start])

  const hasEnoughPages = pageCount > maxVisible
  const adjustedMaxVisible = hasEnoughPages ? maxVisible : pageCount
  const remainingPages = pageCount - page
  const isCloseToEnd = remainingPages < adjustedMaxVisible
  const start = (isCloseToEnd ? pageCount - adjustedMaxVisible : skip + 1) || 1
  const end = isCloseToEnd ? pageCount : adjustedMaxVisible + skip
  const fragment = range(start, end).map((pageNumber, i) => (
    <PaginatorSpan
      key={pageNumber}
      onClick={() => {
        onChange && onChange(pageNumber)
      }}
      isActive={pageNumber === page}
    >
      {pageNumber}
    </PaginatorSpan>
  ))

  const renderUpperSeparator = () =>
    remainingPages >= maxVisible && hasEnoughPages && pageCount - adjustedMaxVisible > 1
      ? [
          <PaginatorSpan
            key="upper"
            onClick={() => {
              onChange(page + maxVisible)
            }}
          >
            ...
          </PaginatorSpan>,
          <PaginatorSpan
            key={pageCount}
            onClick={() => {
              onChange && onChange(pageCount)
            }}
          >
            {pageCount}
          </PaginatorSpan>,
        ]
      : []

  return [...fragment, ...renderUpperSeparator()]
}

const Container = styled("div")({
  label: "paginator",
  "& [role=button]": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 25,
  },
})

const Paginator = ({ maxVisible = 3, onChange = () => {}, pageCount, page = 1, id, css, className }: Props) => {
  const controlProps = {
    pageCount,
    page,
    onChange,
  }
  return (
    <Container id={id} css={css} className={className}>
      <PaginatorControl type="first" {...controlProps}>
        <Icon.ChevronsLeft size="11" />
      </PaginatorControl>
      <PaginatorControl type="previous" {...controlProps}>
        <Icon.ChevronLeft size="11" />
      </PaginatorControl>
      {createPagesFragment({
        pageCount,
        maxVisible,
        page,
        onChange,
      })}
      <PaginatorControl type="next" {...controlProps}>
        <Icon.ChevronRight size="11" />
      </PaginatorControl>
      <PaginatorControl type="last" {...controlProps}>
        <Icon.ChevronsRight size="11" />
      </PaginatorControl>
    </Container>
  )
}

export default Paginator
