import * as React from "react"

import ControlledModal from "./ControlledModal"

export interface ModalOptions {
  title: React.ReactNode
  body: React.ReactNode | ((close: () => void) => React.ReactNode)
}

export interface State {
  options: Partial<ModalOptions>
}

export interface Props {
  children: (modal: (options: ModalOptions) => void) => React.ReactNode
}

export class Modal extends React.Component<Props, Readonly<State>> {
  public readonly state: State = {
    options: {},
  }

  public openModal = (options: ModalOptions) => {
    this.setState({ options })
  }

  public closeModal = () => {
    this.setState({ options: {} })
  }

  public render() {
    const isOpen = Boolean(this.state.options.body)

    return (
      <>
        {typeof this.props.children === "function" ? this.props.children(this.openModal) : this.props.children}
        {isOpen && (
          <ControlledModal title={this.state.options.title} onClose={this.closeModal}>
            {typeof this.state.options.body === "function"
              ? this.state.options.body(this.closeModal)
              : this.state.options.body}
          </ControlledModal>
        )}
      </>
    )
  }
}

export default Modal
