import * as React from "react"

import Button from "../Button/Button"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

export interface PaginatorProps extends DefaultProps {
  /** Function to be executed after changing page */
  onChange?: (page: PaginatorProps["page"]) => void
  /** Index of the current selected page */
  page: number
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
  color: theme.color.text.lightest,
  minWidth: 120,
  justifyContent: "center",
  "& span": {
    color: theme.color.text.dark,
    padding: `0 ${theme.space.base}px`,
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

const NavigationButton = styled(Button)(({ type, theme }) => ({
  width: 96,
  height: 24,
  lineHeight: "24px",
  marginRight: type === "previous" ? theme.space.big : theme.space.small,
  padding: 0,
  "& svg": {
    verticalAlign: "middle",
    marginTop: 1,
  },
  "& span": {
    padding: `0 ${theme.space.base}px`,
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

const getRange = ({ page, itemCount, itemsPerPage }: PaginatorProps) => {
  const start = 1 + (page - 1) * itemsPerPage
  const end = Math.min(itemCount, page * itemsPerPage)
  return `${start}-${end}`
}

const Container = styled("div")(({ theme }) => ({
  label: "paginator",
  marginTop: theme.space.element,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const Paginator: React.SFC<PaginatorProps> = ({ itemCount, itemsPerPage, page, onChange, ...props }) => {
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
      <div>
        <PaginatorControl type="first" {...controlProps} isDisabled={isFirstDisabled}>
          First
        </PaginatorControl>
        <PaginatorControl type="previous" {...controlProps} isDisabled={isFirstDisabled}>
          Prev
        </PaginatorControl>
        <PaginatorControl type="next" {...controlProps} isDisabled={isLastDisabled}>
          Next
        </PaginatorControl>
        <PaginatorControl type="last" {...controlProps} isDisabled={isLastDisabled}>
          Last
        </PaginatorControl>
      </div>
      <PaginatorSpan key={page}>
        Showing <span>{getRange({ page, itemCount, itemsPerPage })}</span> of <span>{itemCount}</span>
      </PaginatorSpan>
    </Container>
  )
}

export default Paginator
