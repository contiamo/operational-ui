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

export const useModal = () => {
  const [options, setOptions] = useState<State>({})

  const openModal = useCallback((newOptions: ModalOptions) => {
    setOptions(newOptions)
  }, [])

  const closeModal = useCallback(() => {
    setOptions({})
  }, [])

  const Placeholder: React.FC<{}> = useCallback(
    () =>
      Boolean(options.body) ? (
        <ControlledModal fullSize={options.fullSize} title={options.title} onClose={closeModal}>
          {typeof options.body === "function" ? options.body(closeModal) : options.body}
        </ControlledModal>
      ) : null,
    [],
  )

  return [openModal, Placeholder] as const
}

// Can we delete this?
export const Modal = ({ children }: Props) => {
  const [open, Placeholder] = useModal()
  return (
    <>
      {children(open)}
      {<Placeholder />}
    </>
  )
}

export default Modal
