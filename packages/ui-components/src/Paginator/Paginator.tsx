import * as React from "react"
import * as Icon from "react-feather"
import glamorous from "glamorous"

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

const Control = glamorous.li(
  {
    listStyle: "none"
  },
  ({ disabled = false, theme }: { disabled?: boolean; theme?: Theme }) => ({
    cursor: disabled ? "not-allowed" : "pointer"
  })
)

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

  return (
    <Control onClick={handler} disabled={isDisabled}>
      {children}
    </Control>
  )
}

const PageLink = glamorous.li(
  {
    listStyle: "none",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none"
  },
  ({ active = false, theme }: { active?: boolean; theme?: Theme }) => ({
    color: active ? theme.colors.palette.success : ""
  })
)

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

  return range(skip + 1, maxVisible + skip).map(pageNumber => (
    <PageLink
      key={pageNumber}
      onClick={() => {
        onChange(pageNumber)
      }}
      active={pageNumber === selected}
    >
      {pageNumber}
    </PageLink>
  ))
}

const Container = glamorous.ul(
  {
    display: "flex",
    padding: "0"
  },
  ({ disabled }: { disabled?: boolean; theme?: Theme }): {} => ({
    pointerEvents: disabled ? "none" : "all",
    opacity: disabled ? 0.4 : 1
  })
)

const Paginator: React.SFC<Props> = ({ pageCount, maxVisible = 5, selected = 1, onChange = () => {} }: Props) => {
  const controlProps = { pageCount, selected, onChange }
  const hasEnoughPages = pageCount > maxVisible
  maxVisible = hasEnoughPages ? maxVisible : pageCount
  return (
    <Container>
      {hasEnoughPages ? (
        <PaginatorControl type="first" {...controlProps}>
          <Icon.ChevronsLeft size="17" />
        </PaginatorControl>
      ) : null}
      <PaginatorControl type="previous" {...controlProps}>
        <Icon.ChevronLeft size="17" />
      </PaginatorControl>
      {createPagesFragment({ pageCount, maxVisible, selected, onChange })}
      <PaginatorControl type="next" {...controlProps}>
        <Icon.ChevronRight size="17" />
      </PaginatorControl>
      {hasEnoughPages ? (
        <PaginatorControl type="last" {...controlProps}>
          <Icon.ChevronsRight size="17" />
        </PaginatorControl>
      ) : null}
    </Container>
  )
}

export default Paginator
