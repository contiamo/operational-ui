import * as React from "react"
import styled from "react-emotion"
import { WithTheme, Css, CssStatic } from "../types"

export interface Props {
  id?: string
  className?: string
  /** Content class name */

  contentClassName?: string
  /** Children */

  children: React.ReactNode
  onClose?: () => void
}

const Container = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    label: "modal",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: theme.deprecated.baseZIndex + 100,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, .6)",
  }),
)

const Content = styled("div")(
  ({ theme }: WithTheme): CssStatic => ({
    backgroundColor: theme.deprecated.colors.white,
    padding: theme.deprecated.spacing,
    boxShadow: theme.deprecated.shadows.popup,
  }),
)

class Modal extends React.Component<Props, {}> {
  contentNode: any

  render() {
    return (
      <Container
        id={this.props.id}
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
        >
          {this.props.children}
        </Content>
      </Container>
    )
  }
}

export default Modal
