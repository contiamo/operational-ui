import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  className?: string
  css?: {}
  children?: React.ReactNode
}

const Container = glamorous.div({
  label: "breadcrumbs",
  "& a": {
    textDecoration: "none",
    color: "inherit"
  }
})

const Breadcrumbs = glamorous.div(({ theme }) => ({}))

const Divider = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  margin: "0 6px",
  color: theme.colors.black
}))

export default (props: Props) => (
  <Container className={props.className} css={props.css}>
    {(() => {
      /* This IIFE adds the divider elements containing slashes between children, e.g:
       * <Breadcrumb>1</Breadcrumb> <Breadcrumb>2</Breadcrumb> -> <span>1</span> <span>/</span> <span>2</span> 
       */
      const newChildren: React.ReactNode[] = []
      const childrenCount = React.Children.count(props.children)
      React.Children.forEach(props.children, (child: React.ReactNode, index: number) => {
        newChildren.push(child)
        if (index < childrenCount - 1) {
          newChildren.push(<Divider key={"breadcrumbdivider-" + index}>/</Divider>)
        }
      })
      return newChildren
    })()}
  </Container>
)
