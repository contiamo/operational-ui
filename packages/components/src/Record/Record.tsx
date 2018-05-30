import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import { Button } from "../"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** Record title */
  title: string
  controls?: React.ReactNode
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  label: "record",
  position: "relative",
  padding: `${theme.spacing / 2}px ${theme.spacing}px ${theme.spacing}px`,
  backgroundColor: theme.colors.background,
  borderRadius: theme.borderRadius,
}))

const HeaderContainer = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.heading1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing / 2,
  height: theme.spacing * 2,
}))

const ControlContainer = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  "& > *:last-child": {
    marginRight: 0,
  },
}))

const Content = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  opacity: 0.8,
  ...theme.typography.body,
}))

const Record = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <HeaderContainer>
      {props.title}
      {props.controls ? <ControlContainer>{props.controls}</ControlContainer> : null}
    </HeaderContainer>
    <Content>{props.children}</Content>
  </Container>
)

export default Record
