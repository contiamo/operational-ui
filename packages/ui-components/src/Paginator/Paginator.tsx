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
    cursor: disabled ? "not-allowed" : "pointer",
    color: disabled ? theme.colors.palette.grey50 : "default"
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
    userSelect: "none"
  },
  ({ active = false, theme, hidePointer = false }: { active?: boolean; theme?: Theme; hidePointer?: boolean }) => ({
    color: active ? theme.colors.palette.success : "",
    cursor: hidePointer ? "default" : "pointer"
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

  const hasEnoughPages = pageCount > maxVisible
  const adjustedMaxVisible = hasEnoughPages ? maxVisible : pageCount

  const cond = pageCount - selected < adjustedMaxVisible
  const start = cond ? pageCount - adjustedMaxVisible + 1 : skip + 1
  const end = cond ? pageCount : adjustedMaxVisible + skip

  const fragment = range(start, end).map((pageNumber, i) => (
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

  const lowerSeparator = [
    <PageLink
      key={1}
      onClick={() => {
        onChange(1)
      }}
    >
      1
    </PageLink>,
    start === 2 ? null : (
      <PageLink key="lower" hidePointer>
        ...
      </PageLink>
    )
  ]

  const upperSeparator = [
    <PageLink key="upper" hidePointer>
      ...
    </PageLink>,
    <PageLink
      key={pageCount}
      onClick={() => {
        onChange(pageCount)
      }}
    >
      {pageCount}
    </PageLink>
  ]

  return [
    ...(selected >= maxVisible && hasEnoughPages ? lowerSeparator : []),
    ...fragment,
    ...(pageCount - selected >= maxVisible && hasEnoughPages ? upperSeparator : [])
  ]
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
  return (
    <Container>
      <PaginatorControl type="previous" {...controlProps}>
        <Icon.ChevronLeft size="17" />
      </PaginatorControl>
      {createPagesFragment({ pageCount, maxVisible, selected, onChange })}
      <PaginatorControl type="next" {...controlProps}>
        <Icon.ChevronRight size="17" />
      </PaginatorControl>
    </Container>
  )
}

export default Paginator
