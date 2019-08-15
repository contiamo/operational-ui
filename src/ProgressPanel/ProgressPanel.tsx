import * as React from "react"
import { DefaultProps } from "../types"
import styled from "../utils/styled"

import Spinner from "../Spinner/Spinner"
import constants, { OperationalStyleConstants } from "../utils/constants"
import { YesIcon, NoIcon, EmptyCircleIcon } from "../Icon"

export type Status = "waiting" | "todo" | "running" | "success" | "failure" | "done" | "failed"

export interface ProgressPanelProps extends DefaultProps {
  /** Progress items */
  items: Array<{
    /** Progress item status */
    status: Status
    /** Progress item title */
    title: string
    /** Progress item error, if applicable */
    error?: string
  }>
}

const getVariation = (status: Status, theme: OperationalStyleConstants = constants) => {
  switch (status) {
    case "success":
    case "done":
      return {
        iconColor: theme.color.success,
        textColor: theme.color.text.default,
        icon: <YesIcon left />,
      }
    case "failure":
    case "failed":
      return {
        iconColor: theme.color.error,
        textColor: theme.color.text.default,
        icon: <NoIcon left />,
      }
    case "waiting":
    case "todo":
      return {
        iconColor: theme.color.text.lightest,
        textColor: theme.color.text.lighter,
        icon: <EmptyCircleIcon left />,
      }
    case "running":
      return {
        iconColor: theme.color.text.dark,
        textColor: theme.color.text.lightest,
        icon: <Spinner left />,
      }
  }
}

const Container = styled("div")`
  display: block;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => `${theme.space.big}px`};
  }
`

const Item = styled("div")`
  padding: 6px 0;
`

const Body = styled.div<{ status: Status }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${({ theme, status }) => `
    color: ${getVariation(status, theme).textColor};
    font-size: ${theme.font.size.body}px;
    & svg {
      color: ${getVariation(status, theme).iconColor};
    }
  `};
`

const Error = styled("p")`
  margin: 4px 0;
  padding-left: 26px;
  ${({ theme }) => `
    font-size: ${theme.font.size.fineprint}px;
    color: ${theme.color.error};
  `};
`

const ProgressPanel: React.SFC<ProgressPanelProps> = ({ items, ...props }) => (
  <Container {...props}>
    {items.map(({ status, title, error }, index) => (
      <Item key={index}>
        <Body status={status}>
          {getVariation(status).icon}
          {title}
        </Body>
        {error && <Error>{error}</Error>}
      </Item>
    ))}
  </Container>
)

export default ProgressPanel
