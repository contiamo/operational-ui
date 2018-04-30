import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"
import Button from "./Button"

export interface Props {
  css?: {}
  className?: string
  title: string
  controls?: React.ReactNode
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "record",
  position: "relative",
  padding: `${theme.spacing / 2}px ${theme.spacing}px ${theme.spacing}px`,
  backgroundColor: theme.colors.background,
  borderRadius: theme.borderRadius,
}))

const HeaderContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.heading1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing / 2,
  height: theme.spacing * 2,
}))

const ControlContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  "& > *:last-child": {
    marginRight: 0,
  },
}))

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
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
