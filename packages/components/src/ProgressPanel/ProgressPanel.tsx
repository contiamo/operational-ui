import * as React from "react"
import styled from "react-emotion"

import { OperationalStyleConstants } from "../utils/constants"
import Icon from "../Icon/Icon"
import Spinner from "../Spinner/Spinner"

export type Status = "waiting" | "todo" | "running" | "success" | "failure" | "done" | "failed"

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

const getVariation = (status: Status, theme: OperationalStyleConstants = { color: { text: {} } } as any) => {
  switch (status) {
    case "success":
    case "done":
      return {
        iconColor: theme.color.success,
        textColor: theme.color.text.default,
        Icon: <Icon left name="Yes" />,
      }
    case "failure":
    case "failed":
      return {
        iconColor: theme.color.error,
        textColor: theme.color.text.default,
        Icon: <Icon left name="No" />,
      }
    case "waiting":
    case "todo":
      return {
        iconColor: theme.color.text.lightest,
        textColor: theme.color.text.lighter,
        Icon: <Icon left name="EmptyCircle" />,
      }
    case "running":
      return {
        iconColor: theme.color.text.dark,
        textColor: theme.color.text.lightest,
        Icon: <Spinner left />,
      }
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
  ${({ theme }: { theme?: OperationalStyleConstants }) => `
    font-size: ${theme.font.size.fineprint}px;
    color: ${theme.color.error};
  `};
`

const ProgressPanel: React.SFC<Props> = props => (
  <Container>
    {props.items.map(({ status, title, error }, index) => (
      <Item key={index}>
        <Body status={status}>
          {getVariation(status).Icon}
          {title}
        </Body>
        {error && <Error>{error}</Error>}
      </Item>
    ))}
  </Container>
)

export default ProgressPanel
