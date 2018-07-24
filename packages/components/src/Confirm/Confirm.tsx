import * as React from "react"
import styled from "react-emotion"
import { Props as ButtonProps } from "../Button/Button"
import Modal from "../Modal/Modal"

const Actions = styled("div")({
  paddingTop: 20,
  float: "right",
})

export interface ConfirmOptions {
  title: React.ReactNode
  body: React.ReactNode
  cancelButton?: React.ReactElement<ButtonProps>
  actionButton?: React.ReactElement<ButtonProps>
  onConfirm?: () => void
  onCancel?: () => void
}

export interface State {
  options?: ConfirmOptions
}

export interface Props {
  children: (confirm: (options: ConfirmOptions) => void) => React.ReactNode
}

export class Confirm extends React.Component<Props, Readonly<State>> {
  readonly state: State = {
    options: undefined,
  }

  openConfirm = (options: ConfirmOptions) => {
    this.setState({ options })
  }

  closeConfirm = () => {
    this.setState({ options: undefined })
  }

  onCancelClick = () => {
    this.state.options.onCancel && this.state.options.onCancel()
    this.closeConfirm()
  }

  onActionClick = () => {
    this.state.options.onConfirm && this.state.options.onConfirm()
    this.closeConfirm()
  }

  render() {
    const isOpen = Boolean(this.state.options)

    return (
      <>
        {this.props.children(this.openConfirm)}
        {isOpen && (
          <Modal title={this.state.options.title} onClose={this.closeConfirm.bind(this)}>
            {this.state.options.body}
            <Actions>
              {React.cloneElement(this.state.options.cancelButton, { onClick: this.onCancelClick })}
              {React.cloneElement(this.state.options.actionButton, { onClick: this.onActionClick })}
            </Actions>
          </Modal>
        )}
      </>
    )
  }
}

export default Confirm
