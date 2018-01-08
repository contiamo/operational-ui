import * as React from "react"
import glamorous from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  className?: string
  css?: {}
  children?: React.ReactNode
}

const Container = glamorous.div({})

const Breadcrumbs = glamorous.div(({ theme }) => ({}))

const Divider = glamorous.span(({ theme }: { theme: Theme }): {} => ({
  display: "inline-block",
  margin: "0 6px",
  color: theme.colors.black
}))

export default (props: IProps) => (
  <Container className={props.className} css={props.css}>
    {(() => {
      const newChildren: React.ReactNode[] = []
      const childrenCount = React.Children.count(props.children)
      React.Children.forEach(props.children, (child: React.ReactNode, index: number) => {
        newChildren.push(child)
        if (index < childrenCount - 1) {
          newChildren.push(<Divider key={index}>/</Divider>)
        }
      })
      return newChildren
    })()}
  </Container>
)
