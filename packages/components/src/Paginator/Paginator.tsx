import * as React from "react"
import * as Icon from "react-feather"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import { Css, CssStatic } from "../types"
import { Button } from "../"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */

  css?: Css
  className?: string
  /** Disable the component */

  disabled?: boolean
  /** Function to be executed after changing page */

  onChange?: (page: number) => void
  /** Index of the current selected page
   * @default 1
   */

  page?: number
  /** Total number of items */

  itemCount: number
  /** Number of items per page */

  itemsPerPage: number
}

const PaginatorSpan = styled("div")(
  ({ theme }: { theme?: OperationalStyleConstants }): CssStatic => ({
    fontFamily: theme.font.family.main,
    fontSize: theme.font.size.small,
    padding: `0 ${theme.space.content}px`,
    display: "inline-flex",
    color: theme.color.text.lighter,
    "& span": {
      color: theme.color.text.dark,
      paddingRight: 3,
    },
  }),
)

interface ControlProps {
  children: any
  onChange?: (page: number) => void
  page: number
  itemCount: number
  itemsPerPage: number
  type: "first" | "previous" | "next" | "last"
}

const NavigationButton = styled(Button)(({ theme }: { theme?: OperationalStyleConstants }) => ({
  width: "56px",
  marginRight: "2px",
  padding: `0 ${theme.space.base}px`,
}))

const PaginatorControl = ({ children, itemCount, itemsPerPage, page, onChange, type }: ControlProps) => {
  const handleFirst = (): void => {
    onChange && onChange(1)
  }

  const handlePrevious = (): void => {
    onChange && onChange(page - 1)
  }

  const handleNext = (): void => {
    onChange && onChange(page + 1)
  }

  const handleLast = (): void => {
    onChange && onChange(Math.ceil(itemCount / itemsPerPage))
  }

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
    <NavigationButton condensed onClick={handler}>
      {children}
    </NavigationButton>
  )
}

const getRange = ({ page, itemCount, itemsPerPage }: Props) => {
  const start = 1 + (page - 1) * itemsPerPage
  const end = Math.min(itemCount, page * itemsPerPage)
  return `${start}-${end}`
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

const Paginator = ({ itemCount, page = 1, itemsPerPage, onChange, id, css, className }: Props) => {
  const controlProps = {
    itemCount,
    itemsPerPage,
    page,
    onChange,
  }
  const displayFirst = page !== 1
  const displayLast = itemsPerPage * page < itemCount
  return (
    <Container id={id} css={css} className={className}>
      {displayFirst && (
        <PaginatorControl type="first" {...controlProps}>
          first
        </PaginatorControl>
      )}
      {displayFirst && (
        <PaginatorControl type="previous" {...controlProps}>
          <Icon.ChevronsLeft size="11" /> prev
        </PaginatorControl>
      )}
      <PaginatorSpan key={page}>
        <span>{getRange({ page, itemCount, itemsPerPage })}</span> of {itemCount}
      </PaginatorSpan>
      {displayLast && (
        <PaginatorControl type="next" {...controlProps}>
          next<Icon.ChevronsRight size="11" />
        </PaginatorControl>
      )}
      {displayLast && (
        <PaginatorControl type="last" {...controlProps}>
          last
        </PaginatorControl>
      )}
    </Container>
  )
}

export default Paginator
