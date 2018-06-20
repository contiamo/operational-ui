import * as React from "react"
import * as Icon from "react-feather"
import styled from "react-emotion"
import { OperationalStyleConstants } from "@operational/theme"
import { Css, CssStatic } from "../types"
import Button from "../Button/Button"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Function to be executed after changing page */
  onChange?: (page: number) => void
  /** Index of the current selected page */
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
    minWidth: 120,
    justifyContent: "center",
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
  isDisabled: boolean
  itemCount: number
  itemsPerPage: number
  type: "first" | "previous" | "next" | "last"
}

const NavigationButton = styled(Button)(({ theme }: { theme?: OperationalStyleConstants }) => ({
  width: 56,
  marginRight: 3,
  padding: 0,
  "& svg": {
    verticalAlign: "middle",
  },
  "& span": {
    padding: "0 3px",
  },
}))

const PaginatorControl = ({ children, itemCount, itemsPerPage, page, onChange, type, isDisabled }: ControlProps) => {
  const pageChanges = {
    first: 1,
    previous: page - 1,
    next: page + 1,
    last: Math.ceil(itemCount / itemsPerPage),
  }

  const clickHandler = (): void => {
    onChange && onChange(pageChanges[type])
  }

  return (
    <NavigationButton disabled={isDisabled} condensed onClick={clickHandler}>
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

const Paginator: React.SFC<Props> = props => {
  const controlProps = {
    itemCount: props.itemCount,
    itemsPerPage: props.itemsPerPage,
    page: props.page,
    onChange: props.onChange,
  }
  const isFirstDisabled = props.page === 1
  const isLastDisabled = props.itemsPerPage * props.page >= props.itemCount
  return (
    <Container id={props.id} css={props.css} className={props.className}>
      <PaginatorControl type="first" {...controlProps} isDisabled={isFirstDisabled}>
        first
      </PaginatorControl>
      <PaginatorControl type="previous" {...controlProps} isDisabled={isFirstDisabled}>
        <Icon.ChevronsLeft size="11" />
        <span>prev</span>
      </PaginatorControl>
      <PaginatorSpan key={props.page}>
        <span>{getRange({ page: props.page, itemCount: props.itemCount, itemsPerPage: props.itemsPerPage })}</span> of{" "}
        {props.itemCount}
      </PaginatorSpan>
      <PaginatorControl type="next" {...controlProps} isDisabled={isLastDisabled}>
        <span>next</span>
        <Icon.ChevronsRight size="11" />
      </PaginatorControl>
      <PaginatorControl type="last" {...controlProps} isDisabled={isLastDisabled}>
        last
      </PaginatorControl>
    </Container>
  )
}

Paginator.defaultProps = {
  page: 1,
}

export default Paginator
