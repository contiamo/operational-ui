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

const Content = styled(Card)(({ theme }: { theme?: OperationalStyleConstants }) => ({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: theme.zIndex.modal,
}))

const Modal: React.SFC<Props> = (props: Props) => (
  <>
    <Overlay id={props.id} className={props.className} onClick={props.onClose} />
    <Content className={props.contentClassName} title={props.title} action={props.action}>
      {props.children}
    </Content>
  </>
)

export default Modal
