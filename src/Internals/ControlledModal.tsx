import * as React from "react"
import { keyframes } from "react-emotion"
import Card, { CardProps } from "../Card/Card"
import Overlay from "../Internals/Overlay"
import styled from "../utils/styled"

export interface Props {
  id?: string
  className?: string
  contentClassName?: string
  children: CardProps["children"]
  onClose?: () => void
  title?: CardProps["title"]
  action?: CardProps["action"]
}

const fromTop = keyframes`
  0% {
    transform: translate(-50%, -10px)
  }
  100% {
    transform: translate(-50%, 0)
  }
`

const Container = styled(Card)(({ theme }) => ({
  position: "absolute",
  top: theme.space.element,
  left: "50%",
  transform: "translate(-50%, 0)",
  animation: `${fromTop} 0.2s`,
  minWidth: 600,
  minHeight: 200,
  zIndex: theme.zIndex.modal,
  display: "flex",
  flexDirection: "column",
}))

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  /**
   * Moved the min-height from the container to be driven by
   * the content. Accounting for the padding of the Card Content
   * which is what is restricting the dynamic growth.
   */
  minHeight: 120,
})

const ControlledModal: React.SFC<Props> = (props: Props) => (
  <>
    <Overlay id={props.id} className={props.className} onClick={props.onClose} />
    <Container className={props.contentClassName} title={props.title} action={props.action}>
      <Content>{props.children}</Content>
    </Container>
  </>
)

export default ControlledModal
