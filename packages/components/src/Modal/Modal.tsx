import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

import Overlay from "../Internals/Overlay"
import Card, { Props as CardProps } from "../Card/Card"

export interface Props {
  id?: string
  className?: string
  /** Content class name */
  contentClassName?: string
  /** Children */
  children: CardProps["children"]
  onClose?: () => void
  /** Title */
  title?: CardProps["title"]
  /** Action(s) to appear in top-right */
  action?: CardProps["action"]
}

const Container = styled(Overlay)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
})

const Content = styled(Card)(({ theme }: { theme?: OperationalStyleConstants }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  minHeight: 150,
  zIndex: theme.zIndex.confirm + 1,
}))

class Modal extends React.Component<Props, {}> {
  contentNode: HTMLElement

  handleClick = (event: MouseEvent) => {
    if (this.contentNode && !this.contentNode.contains(event.target as HTMLElement)) {
      this.props.onClose && this.props.onClose()
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.handleClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClick)
  }

  render() {
    return (
      <Container id={this.props.id} className={this.props.className}>
        <Content
          innerRef={card => {
            this.contentNode = card && card.containerNode
          }}
          className={this.props.contentClassName}
          title={this.props.title}
          action={this.props.action}
        >
          {this.props.children}
        </Content>
      </Container>
    )
  }
}

export default Modal
