import * as React from "react"
import Button, { ButtonProps } from "../Button/Button"
import styled from "../utils/styled"
import ControlledModal from "./ControlledModal"

export interface ConfirmBodyProps<T> {
  setConfirmState: (state?: Partial<T>) => void
  confirmState: T
}

export interface ConfirmOptions<T> {
  title: React.ReactNode
  body: React.ReactNode | React.ComponentType<ConfirmBodyProps<T>>
  fullSize?: boolean
  cancelButton?: React.ReactElement<ButtonProps> | ((confirmState: T) => React.ReactElement<ButtonProps>)
  actionButton?: React.ReactElement<ButtonProps> | ((confirmState: T) => React.ReactElement<ButtonProps>)
  onConfirm?: (confirmState: T) => void
  onCancel?: (confirmState: T) => void
  state?: T
}

export interface State<T> {
  options: Partial<ConfirmOptions<T>>
}

export interface Props {
  children: (confirm: <T>(options: ConfirmOptions<T>) => void) => React.ReactNode
}

const actionsBarSize = 36

const Actions = styled("div")`
  margin-top: ${({ theme }) => theme.space.element}px;
  align-self: flex-end;
  height: ${actionsBarSize}px;
`

const ControlledModalContent = styled("div")<{ fullSize: boolean }>(
  ({ fullSize }) =>
    fullSize
      ? {
          height: `calc(100% - ${actionsBarSize}px)`,
          overflow: "auto",
        }
      : {},
)

export class Confirm<T> extends React.Component<Props, Readonly<State<T>>> {
  public readonly state: State<T> = {
    options: {},
  }

  private openConfirm(options: ConfirmOptions<T>) {
    this.setState({ options })
  }

  private closeConfirm = () => {
    this.setState({ options: {} })
  }

  private onCancelClick = () => {
    const { onCancel, state } = this.state.options

    if (onCancel) {
      onCancel(state as T)
    }

    this.closeConfirm()
  }

  private onActionClick = () => {
    const { onConfirm, state } = this.state.options

    if (onConfirm) {
      onConfirm(state as T)
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
    const { actionButton, fullSize, title, cancelButton, state, body: Body } = this.state.options
    const isOpen = Boolean(Body)

    return (
      <>
        {this.props.children(this.openConfirm.bind(this))}
        {isOpen && (
          <ControlledModal fullSize={fullSize} title={title} onClose={this.closeConfirm}>
            <ControlledModalContent fullSize={Boolean(fullSize)}>
              {typeof Body === "function" && state ? (
                <Body setConfirmState={this.setConfirmState} confirmState={state} />
              ) : (
                Body
              )}
            </ControlledModalContent>
            <Actions>
              {React.cloneElement(
                typeof cancelButton === "function" ? cancelButton(state as T) : cancelButton || <Button>Cancel</Button>,
                {
                  onClick: this.onCancelClick,
                },
              )}
              {React.cloneElement(
                typeof actionButton === "function"
                  ? actionButton(state as T)
                  : actionButton || <Button color="success">Confirm</Button>,
                {
                  onClick: this.onActionClick,
                },
              )}
            </Actions>
          </ControlledModal>
        )}
      </>
    )
  }
}

export default Confirm
