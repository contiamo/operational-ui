import * as React from "react"
import styled from "../utils/styled"

import Button, { ButtonProps } from "../Button/Button"
import ControlledModal from "./ControlledModal"

const Actions = styled("div")(({ theme }) => ({
  position: "absolute",
  textAlign: "right",
  bottom: theme.space.element,
  right: theme.space.element,
}))

export interface ConfirmOptions {
  title: React.ReactNode
  body: React.ReactNode
  cancelButton?: React.ReactElement<ButtonProps>
  actionButton?: React.ReactElement<ButtonProps>
  onConfirm?: () => void
  onCancel?: () => void
}

export interface State {
  options: Partial<ConfirmOptions>
}

export interface Props {
  children: (confirm: (options: ConfirmOptions) => void) => React.ReactNode
}

export class Confirm extends React.Component<Props, Readonly<State>> {
  public readonly state: State = {
    options: {},
  }

  public openConfirm = (options: ConfirmOptions) => {
    this.setState({ options })
  }

  public closeConfirm = () => {
    this.setState({ options: {} })
  }

  public onCancelClick = () => {
    if (this.state.options.onCancel) {
      this.state.options.onCancel()
    }
    this.closeConfirm()
  }

  public onActionClick = () => {
    if (this.state.options.onConfirm) {
      this.state.options.onConfirm()
    }
    this.closeConfirm()
  }

  public render() {
    const isOpen = Boolean(this.state.options.body)

    return (
      <>
        {this.props.children(this.openConfirm)}
        {isOpen && (
          <ControlledModal title={this.state.options.title} onClose={this.closeConfirm.bind(this)}>
            {this.state.options.body}
            <Actions>
              {React.cloneElement(this.state.options.cancelButton || <Button>Cancel</Button>, {
                onClick: this.onCancelClick,
              })}
              {React.cloneElement(this.state.options.actionButton || <Button color="success">Confirm</Button>, {
                onClick: this.onActionClick,
              })}
            </Actions>
          </ControlledModal>
        )}
      </>
    )
  }
}

export default Confirm
