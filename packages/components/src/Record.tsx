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
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  backgroundColor: theme.colors.background,
  borderRadius: theme.borderRadius
}))

const HeaderContainer = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.heading1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: theme.spacing * 3
}))

const Record = (props: Props) => (
  <Container css={props.css} className={props.className}>
    <HeaderContainer>
      {props.title}
      {props.controls ? props.controls : null}
    </HeaderContainer>
    {props.children}
  </Container>
)

export default Record
