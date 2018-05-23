import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"
import { readableTextColor, darken } from "@operational/utils"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  css?: Css
  className?: string
  id?: string
  /** The label of the tile */
  label?: string
  children: React.ReactNode
}

const Container = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  label: "infotile",
  borderRadius: theme.borderRadius,
  width: 120,
  position: "relative",
  marginRight: theme.spacing,
  padding: `${theme.spacing / 2}px ${theme.spacing}px`,
  backgroundColor: theme.colors.lighterBackground,
}))

const Content = glamorous.div(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.heading1,
}))

const Label = glamorous.small(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.small,
  opacity: 0.8,
}))

const Tile = (props: Props) => (
  <Container id={props.id} css={props.css} className={props.className}>
    <Label>{props.label}</Label>
    <Content>{props.children}</Content>
  </Container>
)

export default Tile
