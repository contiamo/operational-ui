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

  /** Index of the current selected page */
  page?: number

  /** Total number of items */
  itemCount: number

  /** Number of items per page */
  itemsPerPage: number
}

const ItemSummary = styled("div")(
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
  width: 56,
  marginRight: 2,
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

  switch (type) {
    case "previous":
      return (
        <NavigationButton condensed onClick={handlePrevious}>
          {children}
        </NavigationButton>
      )

    case "first":
      return (
        <NavigationButton condensed onClick={handleFirst}>
          {children}
        </NavigationButton>
      )

    case "next":
      return (
        <NavigationButton condensed onClick={handleNext}>
          {children}
        </NavigationButton>
      )

    case "last":
      return (
        <NavigationButton condensed onClick={handleLast}>
          {children}
        </NavigationButton>
      )

    default:
      throw new Error(
        "No handler specified for NavigationButton in Paginator component\nPlease refer to the docs: http://operational-ui.js.org/docs/#paginator",
      )
  }
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

const Paginator: React.SFC<Props> = props => {
  const controlProps = {
    itemCount: props.itemCount,
    itemsPerPage: props.itemsPerPage,
    page: props.page,
    onChange: props.onChange,
  }
  const shouldDisplayFirst = props.page !== 1
  const shouldDisplayLast = props.itemsPerPage * props.page < props.itemCount
  return (
    <Container id={props.id} css={props.css} className={props.className}>
      {shouldDisplayFirst && (
        <PaginatorControl type="first" {...controlProps}>
          first
        </PaginatorControl>
      )}
      {shouldDisplayFirst && (
        <PaginatorControl type="previous" {...controlProps}>
          <Icon.ChevronsLeft size="11" /> prev
        </PaginatorControl>
      )}
      <ItemSummary key={props.page}>
        <span>{getRange({ page: props.page, itemCount: props.itemCount, itemsPerPage: props.itemsPerPage })}</span> of{" "}
        {props.itemCount}
      </ItemSummary>
      {shouldDisplayLast && (
        <PaginatorControl type="next" {...controlProps}>
          next<Icon.ChevronsRight size="11" />
        </PaginatorControl>
      )}
      {shouldDisplayLast && (
        <PaginatorControl type="last" {...controlProps}>
          last
        </PaginatorControl>
      )}
    </Container>
  )
}

Paginator.defaultProps = {
  page: 1,
}

export default Paginator
