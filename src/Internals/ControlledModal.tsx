import * as React from "react"
import styled from "../utils/styled"

import Card, { Props as CardProps } from "../Card/Card"
import Overlay from "../Internals/Overlay"

export interface Props {
  id?: string
  className?: string
  contentClassName?: string
  children: CardProps["children"]
  onClose?: () => void
  title?: CardProps["title"]
  action?: CardProps["action"]
}

const Content = styled(Card)(({ theme }) => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: theme.zIndex.modal,
}))

const ControlledModal: React.SFC<Props> = (props: Props) => (
  <>
    <Overlay id={props.id} className={props.className} onClick={props.onClose} />
    <Content className={props.contentClassName} title={props.title} action={props.action}>
      {props.children}
    </Content>
  </>
)

export default ControlledModal
