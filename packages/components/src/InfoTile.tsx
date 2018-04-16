import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"

export interface Props {
  id?: string
  css?: any
  className?: string
  label?: string
  children: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  label: "infotile",
  borderRadius: theme.borderRadius,
  minWidth: 100,
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  width: "fit-content",
  marginRight: theme.spacing,
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  backgroundColor: theme.colors.lighterBackground
}))

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.heading2
}))

const Label = glamorous.small(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.small,
  opacity: 0.6
}))

const InfoTile = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    <Label>{props.label}</Label>
    <Content>{props.children}</Content>
  </Container>
)

export default InfoTile
