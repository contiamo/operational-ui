import * as React from "react"

import Button from "../Button/Button"
import Icon from "../Icon/Icon"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface PaginatorProps extends DefaultProps {
  /** Function to be executed after changing page */
  onChange?: (page: PaginatorProps["page"]) => void
  /** Index of the current selected page */
  page?: number
  /** Total number of items */
  itemCount: number
  /** Number of items per page */
  itemsPerPage: number
}

const PaginatorSpan = styled("div")(({ theme }) => ({
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
}))

interface ControlProps {
  children: any
  onChange?: PaginatorProps["onChange"]
  page: number
  isDisabled: boolean
  itemCount: number
  itemsPerPage: number
  type: "first" | "previous" | "next" | "last"
}

const NavigationButton = styled(Button)<Partial<ControlProps>>(({ type }) => ({
  width: type === "next" || type === "previous" ? 70 : 56,
  marginRight: 3,
  padding: 0,
  "& svg": {
    verticalAlign: "middle",
    marginTop: 1,
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
    if (onChange) {
      onChange(pageChanges[type])
    }
  }

  return (
    <NavigationButton type={type} disabled={isDisabled} condensed onClick={clickHandler}>
      {children}
    </NavigationButton>
  )
}

const getRange = ({ itemCount, itemsPerPage, page }: PaginatorProps & { page: number }) => {
  const start = 1 + (page - 1) * itemsPerPage
  const end = Math.min(itemCount, page * itemsPerPage)
  return `${start}-${end}`
}

const Container = styled("div")(({ theme }) => ({
  label: "paginator",
  marginTop: theme.space.element,
  display: "flex",
  alignItems: "center",
}))

const Paginator: React.SFC<PaginatorProps> = ({ itemCount, itemsPerPage, page: explicitPage, onChange, ...props }) => {
  const page: number = explicitPage || 1

  if (!explicitPage) {
    /**
     * @todo remove this in v12.
     */
    console.warn(`[operational-ui]: Deprecation Warning
-------------------------------------

<Paginator />'s page prop is now _mandatory_, meaning in the next major
release, your code (if TypeScript) will not compile. Please add an explicit
\`page\` prop to your Paginator if you'd like to stay up to date.

Issue: https://github.com/contiamo/operational-ui/pull/820`)
  }

  const controlProps = {
    itemCount,
    itemsPerPage,
    page,
    onChange,
  }

  const isFirstDisabled = page === 1
  const isLastDisabled = itemsPerPage * page >= itemCount
  return (
    <Container {...props}>
      <PaginatorControl type="first" {...controlProps} isDisabled={isFirstDisabled}>
        first
      </PaginatorControl>
      <PaginatorControl type="previous" {...controlProps} isDisabled={isFirstDisabled}>
        <Icon name="ChevronLeft" size={11} />
        <span>prev</span>
      </PaginatorControl>
      <PaginatorSpan key={page}>
        <span>{getRange({ page, itemCount, itemsPerPage })}</span> of {itemCount}
      </PaginatorSpan>
      <PaginatorControl type="next" {...controlProps} isDisabled={isLastDisabled}>
        <span>next</span>
        <Icon name="ChevronRight" size={11} />
      </PaginatorControl>
      <PaginatorControl type="last" {...controlProps} isDisabled={isLastDisabled}>
        last
      </PaginatorControl>
    </Container>
  )
}

export default Paginator
