import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface Props {
  id?: string
  css?: {}
  className?: string
  contentCss?: {}
  contentClassName?: string
  children: React.ReactNode
  onClose?: () => void
}

const Container = glamorous.div(({ theme }: { theme: Theme }): {} => ({
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
  backgroundColor: "rgba(0, 0, 0, .6)"
}))

const Content = glamorous.div(({ theme }: { theme: Theme }): {} => ({
  backgroundColor: theme.colors.white,
  padding: theme.spacing,
  boxShadow: theme.shadows.popup
}))

class Modal extends React.Component<Props, {}> {
  contentNode: any
  render() {
    const { props } = this
    return (
      <Container
        id={props.id}
        css={props.css}
        className={props.className}
        onClick={ev => {
          if (this.contentNode && !this.contentNode.contains(ev.target)) {
            props.onClose && props.onClose()
          }
        }}
      >
        <Content
          innerRef={contentNode => {
            this.contentNode = contentNode
          }}
          className={props.contentClassName}
          css={props.contentCss}
        >
          {props.children}
        </Content>
      </Container>
    )
  }
}

export default Modal
