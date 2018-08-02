import * as React from "react"
import styled from "../utils/styled"

import Button, { ButtonProps } from "../Button/Button"
import ControlledModal from "./ControlledModal"

const Actions = styled("div")({
  alignSelf: "flex-end",
})

export interface ConfirmBodyProps<T> {
  setConfirmState: (state?: Pick<T, keyof T>) => void
  confirmState: T
}

export interface ConfirmOptions<T> {
  title: React.ReactNode
  body: React.ReactNode | React.ComponentType<ConfirmBodyProps<T>>
  cancelButton?: React.ReactElement<ButtonProps>
  actionButton?: React.ReactElement<ButtonProps>
  onConfirm?: (confirmState?: T) => void
  onCancel?: (confirmState?: T) => void
  state?: T
}

export interface State<T> {
  options: Partial<ConfirmOptions<T>>
}

export interface Props {
  children: (confirm: <U>(options: ConfirmOptions<U>) => void) => React.ReactNode
}

export class Confirm<T> extends React.Component<Props, Readonly<State<T>>> {
  constructor(props: Props) {
    super(props)
    this.state = {
      options: {},
    }
    this.openConfirm = function<U>(options: ConfirmOptions<U>) {
      this.setState(prevState => ({ options: { ...prevState.options, options } }))
    }
  }

  private openConfirm: <U>(options: ConfirmOptions<U>) => void

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

  private setConfirmState: ConfirmBodyProps<T>["setConfirmState"] = state => {
    this.setState(prevState => ({
      options: {
        ...prevState.options,
        // No spreading here due to https://github.com/Microsoft/TypeScript/issues/10727
        state: Object.assign({}, prevState.options.state, state),
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
              {typeof this.state.options.body === "function" && this.state.options.state
                ? React.createElement(this.state.options.body, {
                    setConfirmState: this.setConfirmState,
                    confirmState: this.state.options.state,
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

const test = (
  <Confirm>
    {confirm => (
      <Button
        onClick={() =>
          confirm({
            title: "coucou",
            state: {
              apeijgaeg: false,
            },
            body: ({ confirmState }) => <Button>{confirmState.apeijgaeg}</Button>,
          })
        }
      />
    )}
  </Confirm>
)
