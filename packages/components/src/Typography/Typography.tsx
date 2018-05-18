import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

const Title: GlamorousComponent<{}, {}> = glamorous.h1(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.title,
  margin: `${theme.spacing}px 0`,
  label: "titletype",
}))

const Heading1: GlamorousComponent<{}, {}> = glamorous.h1(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.heading1,
  margin: `${theme.spacing / 2}px 0`,
  label: "heading1type",
}))

const Heading2: GlamorousComponent<{}, {}> = glamorous.h2(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.heading2,
  margin: `${theme.spacing / 2}px 0`,
  label: "heading2type",
}))

const Body: GlamorousComponent<{}, {}> = glamorous.p(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.body,
  margin: `${theme.spacing / 4}px 0`,
  label: "bodytype",
}))

const Small: GlamorousComponent<{}, {}> = glamorous.p(({ theme }: WithTheme): CssStatic => ({
  ...theme.typography.small,
  margin: `${theme.spacing / 4}px 0`,
  label: "smalltype",
}))

export { Title, Heading1, Heading2, Body, Small }
