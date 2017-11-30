import * as marked_ from "marked"
import * as React from "react"
import glamorous from "glamorous"
import { Link } from "react-router-dom"
import { Box, BarChart2, Grid } from "react-feather"

import { SideNavigation, SideNavigationHeader, SideNavigationItem, Icon } from "contiamo-ui-components"
import { Theme } from "contiamo-ui-theme"

const marked = typeof marked_ === "function" ? marked_ : (marked_ as any).default

export interface IProps {
  css?: any
  className?: string
  markdownContent?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  "& h2": {
    ...theme.typography.heading1
  },
  "& h3": {
    ...theme.typography.heading2
  },
  "& p, & li": {
    ...theme.typography.body
  },
  "& ul": {
    paddingLeft: theme.spacing * 1.25
  }
}))

const StaticContent = ({ css, className, markdownContent, children }: IProps) =>
  markdownContent ? (
    <Container css={css} className={className} dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
  ) : (
    <Container css={css} className={className}>
      {children}
    </Container>
  )

export default StaticContent
