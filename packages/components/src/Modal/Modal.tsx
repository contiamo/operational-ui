import * as React from "react"
import styled from "react-emotion"
import { WithTheme, Css, CssStatic } from "../types"
import Overlay from "../Internals/Overlay"

export interface Props {
  id?: string
  className?: string
  /** Content class name */

  contentClassName?: string
  /** Children */

  children: React.ReactNode
  onClose?: () => void
}

const Container = styled(Overlay)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

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
