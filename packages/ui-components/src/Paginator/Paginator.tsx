import * as React from "react"
import glamorous from "glamorous"
import Icon from "../Icon/Icon"
import { darken } from "contiamo-ui-utils"

type ControlProps = {
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

  const isDisabled = (type === "previous" || type === "first")
    ? !!(selected === 1)
    : !!(selected === pageCount)

  const handler = (() => {
    switch (type) {
    case "previous":
      return handlePrevious
    case "first":
      return handleFirst
    case "next":
      return handleNext
    default:
      return handleLast
    }
  })()

  return (
    <li
      onClick={handler}
      className={`control ${type} ${isDisabled ? "disabled" : ""}`}
    >
      {children}
    </li>
  )
}

type ViewProps = {
  pageCount: number
  maxVisible: number
  selected: number
  onChange: (selected: number) => void
}

const createPagesFragment = ({ pageCount, maxVisible, selected, onChange }: ViewProps) => {
  const skip = (() => {
    if (selected > maxVisible - 1 && selected < pageCount) {
      return selected - maxVisible + 1
    } else if (selected === pageCount) {
      return selected - maxVisible
    } else {
      return 0
    }
  })()

  return (
    Array(maxVisible).fill(null).map((_, i) => skip + i + 1).map(pageNumber => (
      <li
        key={pageNumber}
        className={`page ${pageNumber === selected ? "active" : ""}`}
        onClick={() => { onChange(pageNumber) }}
      >
        {pageNumber}
      </li>
    ))
  )
}

type Props = {
  pageCount: number
  maxVisible?: number
  onChange: (selected: number) => void
  selected?: number
}

const Ul = glamorous.ul(({ theme }: {theme: Theme}): any => ({
  display: "flex",
  padding: "0",
  "& li": {
    listStyle: "none",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none"
  },
  "& li.page.active": {
    color: darken(theme.colors.secondary)(5),
    borderRadius: "50%"
  },
  "& li.control": {
    color: theme.colors.primary
  },
  "& li.disabled": {
    cursor: "not-allowed"
  }
}))

const Paginator: React.SFC<Props> = ({ pageCount, maxVisible = 5, selected = 1, onChange }: Props) => {
  const controlProps = { pageCount, selected, onChange }
  return (
    <Ul>
      <PaginatorControl type="first" { ...controlProps } >
        <Icon name="ChevronsLeft" sizeOverride={17} />
      </PaginatorControl>
      <PaginatorControl type="previous" { ...controlProps } >
        <Icon name="ChevronLeft" sizeOverride={17} />
      </PaginatorControl>
      {createPagesFragment({ pageCount, maxVisible, selected, onChange })}
      <PaginatorControl type="next" { ...controlProps } >
        <Icon name="ChevronRight" sizeOverride={17} />
      </PaginatorControl>
      <PaginatorControl type="last" { ...controlProps } >
        <Icon name="ChevronsRight" sizeOverride={17} />
      </PaginatorControl>
    </Ul>
  )
}

export default Paginator