import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { Button } from "../"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  className?: string
  /** Record title */

  title: string
  controls?: React.ReactNode
  children?: React.ReactNode
}

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "record",
    position: "relative",
    padding: `${theme.deprecated.spacing / 2}px ${theme.deprecated.spacing}px ${theme.deprecated.spacing}px`,
    backgroundColor: theme.deprecated.colors.background,
    borderRadius: theme.deprecated.borderRadius,
  }),
)

const HeaderContainer = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    ...theme.deprecated.typography.heading1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.deprecated.spacing / 2,
    height: theme.deprecated.spacing * 2,
  }),
)

const ControlContainer = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    "& > *:last-child": {
      marginRight: 0,
    },
  }),
)

const Content = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    opacity: 0.8,
    ...theme.deprecated.typography.body,
  }),
)

const Record = (props: Props) => (
  <Container className={props.className}>
    <HeaderContainer>
      {props.title}
      {props.controls ? <ControlContainer>{props.controls}</ControlContainer> : null}
    </HeaderContainer>
    <Content>{props.children}</Content>
  </Container>
)

export default Record
