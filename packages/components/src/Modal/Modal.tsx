import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  /** `css` prop as expected in a glamorous component */
  css?: Css
  className?: string
  /** `css` prop for the content inside the backdrop */
  contentCss?: Css
  /** Content class name */
  contentClassName?: string
  /** Children */
  children: React.ReactNode
  onClose?: () => void
}

const Container = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    label: "modal",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: theme.baseZIndex + 100,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .6)",
  }),
)

const Content = glamorous.div(
  ({ theme }: WithTheme): CssStatic => ({
    backgroundColor: theme.colors.white,
    padding: theme.spacing,
    boxShadow: theme.shadows.popup,
  }),
)

class Modal extends React.Component<Props, {}> {
  contentNode: any
  render() {
    return (
      <Container
        id={this.props.id}
        css={this.props.css}
        className={this.props.className}
        onClick={ev => {
          if (this.contentNode && !this.contentNode.contains(ev.target)) {
            this.props.onClose && this.props.onClose()
          }
        }}
      >
        <Content
          innerRef={contentNode => {
            this.contentNode = contentNode
          }}
          className={this.props.contentClassName}
          css={this.props.contentCss}
        >
          {this.props.children}
        </Content>
      </Container>
    )
  }
}

export default Modal
