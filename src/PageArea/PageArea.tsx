import * as React from "react"
import styled from "../utils/styled"

import Confirm, { ConfirmOptions } from "../Internals/Confirm"
import Modal, { ModalOptions } from "../Internals/Modal"

export interface ModalConfirmContext {
  modal: (modalOptions: ModalOptions) => void
  confirm: (confirmOptions: ConfirmOptions) => void
}

export interface PageAreaProps {
  /** Name of the area */
  name?: "main" | "side"
  /** Your content */
  children?: React.ReactNode | ((modalConfirmContext: ModalConfirmContext) => React.ReactNode)
}

const StyledPageArea = styled("div")(({ name }: PageAreaProps) => ({
  gridArea: name,
  position: "relative",
}))

export const PageArea: React.SFC<PageAreaProps> = props => {
  return (
    <StyledPageArea name={props.name}>
      <Modal>
        {modal => (
          <Confirm>
            {confirm => {
              const modalConfirmContext: ModalConfirmContext = { modal, confirm }
              const children =
                typeof props.children === "function" ? props.children(modalConfirmContext) : props.children

              return children
            }}
          </Confirm>
        )}
      </Modal>
    </StyledPageArea>
  )
}

export default PageArea
