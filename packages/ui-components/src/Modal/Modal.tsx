import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "../theme"

export interface IProps {
  css?: any
  className?: string
  childClassName?: string
  children: React.ReactNode
  onClose?: () => void
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: theme.baseZIndex + 100,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, .6)"
}))

const Content = glamorous.div(({ theme }: { theme: Theme }): any => ({
  backgroundColor: theme.colors.palette.white,
  padding: theme.spacing,
  boxShadow: "0 3px 7px rgba(0, 0, 0, .3)"
}))

class Modal extends React.Component<IProps, {}> {
  contentNode: any
  render() {
    const { css, className, childClassName, children, onClose } = this.props
    return (
      <Container
        css={css}
        className={className}
        onClick={ev => {
          if (this.contentNode && !this.contentNode.contains(ev.target)) {
            onClose && onClose()
          }
        }}
      >
        <Content
          innerRef={contentNode => {
            this.contentNode = contentNode
          }}
          className={childClassName}
        >
          {children}
        </Content>
      </Container>
    )
  }
}

export default Modal
