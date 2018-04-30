import * as React from "react"
import glamorous, { Div } from "glamorous"
import { Theme } from "@operational/theme"

import { Card, Icon, Button, CardHeader, OperationalUI } from "@operational/components"

export const DocsLink = glamorous.a(({ theme }: { theme: Theme }): {} => ({
  ...theme.typography.small,
  color: theme.colors.gray,
}))

export const Section = (props: { title: string; docsUrl: string; children: React.ReactNode }) => (
  <Card css={{ margin: "24px 0" }} id={props.title.toLowerCase()}>
    <CardHeader>
      {props.title}
      <DocsLink href={props.docsUrl}>Docs</DocsLink>
    </CardHeader>
    <glamorous.Div
      css={{
        "& > *": {
          marginRight: 6,
          marginBottom: 6,
        },
      }}
    >
      {props.children}
    </glamorous.Div>
  </Card>
)

export const Subsection = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  margin: "30px 0",
  "& > *": {
    marginRight: theme.spacing,
  },
}))

export { default as Animation } from "./Animation"
export { default as Hero } from "./Hero"
export { default as Logo } from "./Logo"
export { default as StaticContent } from "./StaticContent"
export { default as Footer } from "./Footer"
