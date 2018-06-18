import * as React from "react"
import glamorous, { Div } from "glamorous"
import { Theme } from "@operational/theme"

import { Card, Icon, Button, CardHeader, OperationalUI } from "@operational/components"

export const DocsLink = glamorous.a(
  ({ theme }: { theme: Theme }): {} => ({
    ...theme.typography.small,
    color: theme.colors.gray,
    marginLeft: (theme.spacing * 3) / 4,
  }),
)

const AnchorLink = glamorous.h2(
  ({ theme }: { theme: Theme }): {} => ({
    ...theme.typography.heading1,
    cursor: "pointer",
    "& svg": {
      opacity: 0,
      color: theme.colors.info,
      marginLeft: theme.spacing / 2,
      width: (theme.spacing * 3) / 4,
      height: (theme.spacing * 3) / 4,
    },
    ":hover svg": {
      opacity: 1,
    },
  }),
)

export const Section = (props: { title: string; docsUrl: string; snippetUrl: string; children: React.ReactNode }) => {
  const slug = props.title.toLowerCase().replace(/ /g, "-")
  return (
    <Card id={slug}>
      <CardHeader
        action={
          <div>
            <DocsLink href={props.snippetUrl}>View code</DocsLink>
            <DocsLink href={props.docsUrl}>Docs</DocsLink>
          </div>
        }
      >
        <AnchorLink
          onClick={() => {
            ;(history as any).pushState(null, null, `#${slug}`)
          }}
        >
          {props.title}
          <Icon name="Link" />
        </AnchorLink>
      </CardHeader>
      <Div
        css={{
          "& > *": {
            marginRight: 6,
            marginBottom: 6,
          },
        }}
      >
        {props.children}
      </Div>
    </Card>
  )
}

export const Subsection = glamorous.div(
  ({ theme }: { theme: Theme }): {} => ({
    margin: "30px 0",
    "& > *": {
      marginRight: theme.spacing,
    },
  }),
)

export { default as Animation } from "./Animation"
export { default as Hero } from "./Hero"
export { default as Logo } from "./Logo"
export { default as StaticContent } from "./StaticContent"
export { default as Footer } from "./Footer"
