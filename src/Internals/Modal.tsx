import React, { useCallback, useState } from "react"
import ControlledModal from "./ControlledModal"

export interface ModalOptions {
  fullSize?: boolean
  title: React.ReactNode
  body: React.ReactNode | ((close: () => void) => React.ReactNode)
}

export type State = Partial<ModalOptions>

export interface Props {
  children: (modal: (options: ModalOptions) => void) => React.ReactNode
}

export const Modal = ({ children }: Props) => {
  const [options, setOptions] = useState<State>({})

  const openModal = useCallback((newoptions: ModalOptions) => {
    setOptions(newoptions)
  }, [])

  const closeModal = useCallback(() => {
    setOptions({})
  }, [])

  return (
    <>
      {children(openModal)}
      {Boolean(options.body) && (
        <ControlledModal fullSize={options.fullSize} title={options.title} onClose={closeModal}>
          {typeof options.body === "function" ? options.body(closeModal) : options.body}
        </ControlledModal>
      )}
    </>
  )
}

export default Modal
