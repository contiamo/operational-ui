import * as React from "react"
import styled from "react-emotion"

import { OperationalStyleConstants } from "../utils/constants"
import Icon from "../Icon/Icon"
import Spinner from "../Spinner/Spinner"

export type Status = "waiting" | "running" | "success" | "failure"

export interface Props {
  /** Progress items */
  items: {
    /** Progress item status */
    status: Status
    /** Progress item title */
    title: string
    /** Progress item error, if applicable */
    error?: string
  }[]
}

const makeIconColor = (status: Status, theme: OperationalStyleConstants) => {
  switch (status) {
    case "success":
      return theme.color.success
    case "failure":
      return theme.color.error
    case "waiting":
      return theme.color.text.light
    case "running":
      return theme.color.text.dark
  }
}

const makeTextColor = (status: Status, theme: OperationalStyleConstants) => {
  switch (status) {
    case "success":
      return theme.color.text.default
    case "failure":
      return theme.color.text.default
    case "running":
      return theme.color.text.lighter
    case "waiting":
      return theme.color.text.lightest
  }
}

const Container = styled("div")`
  display: block;
`

const Item = styled("div")`
  padding: 6px 0;
`

const Body = styled("div")`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${({ theme, status }: { theme?: OperationalStyleConstants; status: Status }) => `
    color: ${makeTextColor(status, theme)};
    font-size: ${theme.font.size.body}px;
    & svg {
      color: ${makeIconColor(status, theme)};
      opacity: ${status === "waiting" ? 0 : 1};
    }
  `};
`

const Error = styled("p")`
  margin: 4px 0;
  padding-left: 26px;
  ${({ theme }: { theme?: OperationalStyleConstants }) => `
    font-size: ${theme.font.size.fineprint}px;
    color: ${theme.color.error};
  `};
`

const ProgressPanelIcon: React.SFC<{ status: Status }> = props => {
  switch (props.status) {
    case "success":
      return <Icon left name="Yes" />
    case "failure":
      return <Icon left name="No" />
    case "waiting":
      return <Icon left name="No" />
    case "running":
      return <Spinner left />
  }
}

const ProgressPanel: React.SFC<Props> = props => (
  <Container>
    {props.items.map(({ status, title, error }, index) => (
      <Item key={index}>
        <Body status={status}>
          <ProgressPanelIcon status={status} />
          {title}
        </Body>
        {error && <Error>{error}</Error>}
      </Item>
    ))}
  </Container>
)

export default ProgressPanel
