import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"

import Button, { Props as ButtonProps } from "../Button/Button"
import Modal from "../Modal/Modal"

export interface ModalOptions {
  title: React.ReactNode
  body: React.ReactNode | ((close: () => void) => React.ReactNode)
}

export interface State {
  options?: ModalOptions
}

export interface Props {
  children: (modal: (options: ModalOptions) => void) => React.ReactNode
}

export class SmartModal extends React.Component<Props, Readonly<State>> {
  readonly state: State = {
    options: undefined,
  }

  openModal = (options: ModalOptions) => {
    this.setState({ options })
  }

  closeModal = () => {
    this.setState({ options: undefined })
  }

  render() {
    const isOpen = Boolean(this.state.options)

    return (
      <>
        {typeof this.props.children === "function" ? this.props.children(this.openModal) : this.props.children}
        {isOpen && (
          <Modal title={this.state.options.title} onClose={this.closeModal.bind(this)}>
            {typeof this.state.options.body === "function"
              ? this.state.options.body(this.closeModal)
              : this.state.options.body}
          </Modal>
        )}
      </>
    )
  }
}

export default SmartModal
