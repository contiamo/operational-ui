import * as React from "react"
import styled from "../utils/styled"

import Button, { ButtonProps } from "../Button/Button"
import ControlledModal from "./ControlledModal"

const Actions = styled("div")({
  alignSelf: "flex-end",
})

export interface ConfirmOptions<T = {}> {
  title: React.ReactNode
  body: React.ReactNode | React.ComponentType<{ setConfirmState: (state?: Pick<T, keyof T>) => void; state?: T }>
  cancelButton?: React.ReactElement<ButtonProps>
  actionButton?: React.ReactElement<ButtonProps>
  onConfirm?: (confirmState?: T) => void
  onCancel?: (confirmState?: T) => void
  state?: T
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

  private openConfirm = (options: ConfirmOptions) => {
    this.setState({ options })
  }

  private closeConfirm = () => {
    this.setState({ options: {} })
  }

  private onCancelClick = () => {
    if (this.state.options.onCancel) {
      this.state.options.onCancel(this.state.options.state)
    }
    this.closeConfirm()
  }

  private onActionClick = () => {
    if (this.state.options.onConfirm) {
      this.state.options.onConfirm(this.state.options.state)
    }
    this.closeConfirm()
  }

  private setConfirmState = (state: any) => {
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        state: {
          ...prevState.options.state,
          ...state,
        },
      },
    }))
  }

  public render() {
    const isOpen = Boolean(this.state.options.body)

    return (
      <>
        {this.props.children(this.openConfirm)}
        {isOpen && (
          <ControlledModal title={this.state.options.title} onClose={this.closeConfirm.bind(this)}>
            <div>
              {typeof this.state.options.body === "function"
                ? React.createElement(this.state.options.body, {
                    setConfirmState: this.setConfirmState,
                    state: this.state.options.state,
                  })
                : this.state.options.body}
            </div>
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
